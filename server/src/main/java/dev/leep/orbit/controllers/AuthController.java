package dev.leep.orbit.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.leep.orbit.controllers.dtos.CreateUserRequestDTO;
import dev.leep.orbit.controllers.dtos.EventDTO;
import dev.leep.orbit.controllers.dtos.LoginRequestDTO;
import dev.leep.orbit.controllers.dtos.UserDTO;
import dev.leep.orbit.services.TokenService;
import dev.leep.orbit.services.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private UserService userService;

  @Autowired
  private TokenService tokenService;

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> registerUser(@RequestBody @Valid CreateUserRequestDTO request) {
    var user = this.userService.createUser(request);
    var userDTO = new UserDTO(
        user.getId(),
        user.getName(),
        user.getUsername(),
        user.getEmail(),
        new ArrayList<EventDTO>(),
        user.getInvitedEvents().stream()
            .map(event -> {
              var eventOwner = this.userService.findById(event.getOwnerId()).get();
              return new EventDTO.InvitedEvent(
                  event.getId(),
                  event.getName(),
                  event.getDescription(),
                  event.getLocation(),
                  event.getDate(),
                  event.getTime(),
                  new EventDTO.OwnerOnEvent(eventOwner.getUsername()));
            }).toList());

    var token = this.tokenService.generateToken(userDTO);

    return ResponseEntity.status(HttpStatus.CREATED)
        .body(new AuthResponse(token, userDTO));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> loginUser(@RequestBody @Valid LoginRequestDTO request) {
    var authResponse = this.userService.login(request);
    return ResponseEntity.ok(authResponse);
  }

  public record AuthResponse(String token, UserDTO user) {
  }

}

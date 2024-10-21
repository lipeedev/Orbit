package dev.leep.orbit.controllers;

import dev.leep.orbit.controllers.dtos.AddGuestRequestDTO;
import dev.leep.orbit.controllers.dtos.CreateEventRequestDTO;
import dev.leep.orbit.controllers.dtos.EventDTO;
import dev.leep.orbit.controllers.dtos.UserDTO;
import dev.leep.orbit.exceptions.AuthException;
import dev.leep.orbit.exceptions.NotFoundException;
import dev.leep.orbit.repositories.UserRepository;
import dev.leep.orbit.services.EventService;
import dev.leep.orbit.services.TokenService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/events")
public class EventController {

  @Autowired
  private EventService eventService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TokenService tokenService;

  @GetMapping
  public ResponseEntity<List<EventDTO>> getAllEvents() {
    var events = this.eventService.findAll().stream()
        .filter(event -> event.is_public()).toList();
    return ResponseEntity.ok(events);
  }

  @PostMapping
  public ResponseEntity<EventDTO> createEvent(@RequestBody @Valid CreateEventRequestDTO request,
      @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {

    var token = authorizationHeader.replace("Bearer ", "");
    var emailFromTokenValidated = this.tokenService.validateToken(token);

    var eventOwner = this.userRepository.findById(request.owner_id())
        .orElseThrow(() -> new NotFoundException("User not found"));

    var isSameEmailOnBodyAndToken = emailFromTokenValidated.equals(eventOwner.getEmail());

    if (!isSameEmailOnBodyAndToken) {
      throw new AuthException("Invalid credentials");
    }

    var event = this.eventService.createEvent(request);

    var eventDTO = new EventDTO(
        event.getId(),
        event.getName(),
        event.getDescription(),
        event.getLocation(),
        event.getDate(),
        event.getTime(),
        event.getCapacity(),
        event.getPassword(),
        event.getIsPublic(),
        event.getGuests().stream().map(_guest -> new UserDTO.Guest(_guest.getUsername())).toList(),
        new EventDTO.OwnerOnEvent(
            eventOwner.getUsername()));

    return ResponseEntity.status(HttpStatus.CREATED).body(eventDTO);
  }

  @GetMapping("/{eventId}/guests")
  public ResponseEntity<List<UserDTO.Guest>> listEventGuests(@PathVariable UUID eventId,
      @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {

    var token = authorizationHeader.replace("Bearer ", "");
    var emailFromTokenValidated = this.tokenService.validateToken(token);

    var loggedUsername = this.userRepository.findByEmail(emailFromTokenValidated)
        .orElseThrow(() -> new NotFoundException("user not found"));
    var event = this.eventService.findById(eventId);

    if (!event.owner().username().equals(loggedUsername.getUsername())) {
      throw new AuthException("Invalid credentials");
    }

    var guests = this.eventService.listGuestsByEventId(eventId);
    return ResponseEntity.ok(guests);
  }

  @PostMapping("/{eventId}/guests")
  public ResponseEntity<EventDTO> addGuestOnEvent(@PathVariable UUID eventId,
      @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader,
      @RequestBody @Valid AddGuestRequestDTO body) {

    var token = authorizationHeader.replace("Bearer ", "");
    var emailFromTokenValidated = this.tokenService.validateToken(token);

    var eventWithNewGuest = this.eventService.addGuest(eventId, emailFromTokenValidated, body.password());

    return ResponseEntity.status(HttpStatus.CREATED).body(eventWithNewGuest);

  }

}

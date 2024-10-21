package dev.leep.orbit.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.leep.orbit.controllers.AuthController.AuthResponse;
import dev.leep.orbit.controllers.dtos.CreateUserRequestDTO;
import dev.leep.orbit.controllers.dtos.EventDTO;
import dev.leep.orbit.controllers.dtos.LoginRequestDTO;
import dev.leep.orbit.controllers.dtos.UserDTO;
import dev.leep.orbit.entities.User;
import dev.leep.orbit.exceptions.AlreadyExistsException;
import dev.leep.orbit.exceptions.AuthException;
import dev.leep.orbit.exceptions.NotFoundException;
import dev.leep.orbit.repositories.EventRepository;
import dev.leep.orbit.repositories.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private TokenService tokenService;

  @Autowired
  private EventRepository eventRepository;

  public Optional<User> findById(UUID id) {
    return this.userRepository.findById(id);
  }

  public User createUser(CreateUserRequestDTO request) {
    var emailAlreadyExists = this.userRepository.findByEmail(request.email());
    var usernameAlreadyExists = this.userRepository.findByUsername(request.username());

    if (emailAlreadyExists.isPresent() || usernameAlreadyExists.isPresent()) {
      throw new AlreadyExistsException("this user already exists");
    }

    var user = new User();
    user.setName(request.name());
    user.setEmail(request.email());
    user.setUsername(request.username());
    user.setPassword(passwordEncoder.encode(request.password()));

    this.userRepository.save(user);
    return user;
  }

  public AuthResponse login(LoginRequestDTO request) {
    var user = this.userRepository.findByEmail(request.email())
        .orElseThrow(() -> new NotFoundException("User not found"));

    if (passwordEncoder.matches(request.password(), user.getPassword())) {
      var userEvents = this.eventRepository.findAll().stream().filter(
          event -> event.getOwnerId().equals(user.getId())).toList();

      var userDTO = new UserDTO(
          user.getId(),
          user.getName(),
          user.getUsername(),
          user.getEmail(),
          userEvents.stream().map(event -> new EventDTO(
              event.getId(),
              event.getName(),
              event.getDescription(),
              event.getLocation(),
              event.getDate(),
              event.getTime(),
              event.getCapacity(),
              event.getPassword(),
              event.getIsPublic(),
              event.getGuests().stream().map(guest -> new UserDTO.Guest(guest.getUsername())).toList(),
              new EventDTO.OwnerOnEvent(user.getUsername()))).toList(),
          user.getInvitedEvents().stream()
              .map(event -> {
                var eventOwner = this.userRepository.findById(event.getOwnerId()).get();
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
      return new AuthResponse(token, userDTO);
    }

    throw new AuthException("Invalid credentials");

  }

}

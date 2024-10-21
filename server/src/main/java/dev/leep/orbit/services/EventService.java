package dev.leep.orbit.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.leep.orbit.controllers.dtos.CreateEventRequestDTO;
import dev.leep.orbit.controllers.dtos.EventDTO;
import dev.leep.orbit.controllers.dtos.UserDTO;
import dev.leep.orbit.entities.Event;
import dev.leep.orbit.exceptions.AlreadyExistsException;
import dev.leep.orbit.exceptions.NotFoundException;
import dev.leep.orbit.exceptions.AuthException;
import dev.leep.orbit.repositories.EventRepository;
import dev.leep.orbit.repositories.UserRepository;

@Service
public class EventService {

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private UserRepository userRepository;

  public EventDTO findById(UUID id) {
    var event = this.eventRepository.findById(id).orElseThrow(() -> new NotFoundException("event not found"));
    var owner = this.userRepository.findById(event.getOwnerId()).get();

    return new EventDTO(
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
            owner.getUsername()));

  }

  public List<EventDTO> findAll() {
    var events = this.eventRepository.findAll();

    var eventsDTO = events.stream().map(
        event -> {
          var owner = this.userRepository.findById(event.getOwnerId()).get();

          return new EventDTO(
              event.getId(),
              event.getName(),
              event.getDescription(),
              event.getLocation(),
              event.getDate(),
              event.getTime(),
              event.getCapacity(),
              null,
              event.getIsPublic(),
              event.getGuests().stream().map(_guest -> new UserDTO.Guest(_guest.getUsername())).toList(),
              new EventDTO.OwnerOnEvent(
                  owner.getUsername()));
        }).toList();

    return eventsDTO;
  }

  public List<UserDTO.Guest> listGuestsByEventId(UUID eventId) {
    var event = this.eventRepository.findById(eventId).orElseThrow(
        () -> new NotFoundException("event not found"));

    var guestsDTO = event.getGuests().stream().map(
        guest -> new UserDTO.Guest(guest.getUsername())).toList();

    return guestsDTO;
  }

  public Event createEvent(CreateEventRequestDTO request) {
    var alreadyExists = this.eventRepository.findByName(request.name().toLowerCase());

    if (alreadyExists.isPresent()) {
      throw new AlreadyExistsException("this event already exists");
    }

    var user = this.userRepository.findById(request.owner_id()).orElseThrow(
        () -> new NotFoundException("user not found"));

    var event = new Event();

    event.setName(request.name());
    event.setDescription(request.description());
    event.setDate(request.date());
    event.setTime(request.time());
    event.setLocation(request.location());
    event.setCapacity(request.capacity());
    event.setPassword(request.password());
    event.setIsPublic(request.is_public());
    event.setOwnerId(user.getId());

    event = this.eventRepository.save(event);
    return event;
  }

  public EventDTO addGuest(UUID eventId, String userEmail, String requestPassword) {
    var event = this.eventRepository.findById(eventId)
        .orElseThrow(() -> new NotFoundException("event not found"));

    var guest = this.userRepository.findByEmail(userEmail)
        .orElseThrow(() -> new NotFoundException("user not found"));

    if (guest.getId().equals(event.getOwnerId())) {
      throw new AlreadyExistsException("this user is already on this event");
    }

    var eventOwner = this.userRepository.findById(event.getOwnerId()).get();

    if (event.getPassword() != null && requestPassword == null) {
      throw new AuthException("invalid credentials");
    }

    if (event.getPassword() != null && requestPassword != null) {
      if (event.getPassword().equals(requestPassword)) {
        event.addGuest(guest);
        this.eventRepository.save(event);
      } else {
        throw new AuthException("invalid credentials");
      }
    }

    event.addGuest(guest);
    this.eventRepository.save(event);

    return new EventDTO(
        event.getId(),
        event.getName(),
        event.getDescription(),
        event.getLocation(),
        event.getDate(),
        event.getTime(),
        event.getCapacity(),
        null,
        event.getIsPublic(),
        event.getGuests().stream().map(_guest -> new UserDTO.Guest(_guest.getUsername())).toList(),
        new EventDTO.OwnerOnEvent(eventOwner.getUsername()));
  }
}

package dev.leep.orbit.controllers.dtos;

import java.util.List;
import java.util.UUID;

public record UserDTO(
    UUID id,
    String name,
    String username,
    String email,
    List<EventDTO> events,
    List<EventDTO.InvitedEvent> invited_events) {

  public static record Guest(String username) {
  }
}

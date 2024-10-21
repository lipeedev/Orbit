package dev.leep.orbit.controllers.dtos;

import java.time.LocalDate;
import java.util.UUID;
import java.util.List;

public record EventDTO(
    UUID id,
    String name,
    String description,
    String location,
    LocalDate date,
    String time,
    int capacity,
    String password,
    Boolean is_public,
    List<UserDTO.Guest> guests,
    OwnerOnEvent owner) {

  public static record OwnerOnEvent(
      String username) {
  }

  public static record InvitedEvent(
      UUID id,
      String name,
      String description,
      String location,
      LocalDate date,
      String time,
      OwnerOnEvent owner) {
  }

}

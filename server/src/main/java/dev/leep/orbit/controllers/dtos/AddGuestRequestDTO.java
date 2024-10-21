package dev.leep.orbit.controllers.dtos;

import jakarta.validation.constraints.Size;

public record AddGuestRequestDTO(
    @Size(min = 6, message = "password must have minimum 6 characters") String password) {
}

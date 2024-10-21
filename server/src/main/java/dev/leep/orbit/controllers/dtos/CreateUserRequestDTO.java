package dev.leep.orbit.controllers.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateUserRequestDTO(
    @NotBlank(message = "name is required") String name,
    @NotBlank(message = "username is required") String username,
    @NotBlank(message = "email is required") @Email(message = "email must be valid") String email,
    @NotBlank(message = "password is required") String password) {
}

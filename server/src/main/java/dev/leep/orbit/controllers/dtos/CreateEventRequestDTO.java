package dev.leep.orbit.controllers.dtos;

import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateEventRequestDTO(
    @NotBlank(message = "name is required") String name,

    @NotBlank(message = "description is required") @Size(max = 35, message = "the maximum size description is 35") String description,

    @NotNull(message = "date is required") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate date,

    @NotBlank(message = "time is required") @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", message = "time must be in the format HH:mm") String time,

    @NotBlank(message = "location is required") String location,

    @NotNull(message = "capacity is required") @Min(value = 1, message = "capacity minimum value is 1") @Max(value = 1000, message = "capacity maximum value is 1000") Integer capacity,

    @NotNull(message = "owner_id is required") UUID owner_id,

    @NotNull(message = "is_public is required") Boolean is_public,

    @Size(min = 6, message = "password must have minimum 6 characters") String password

) {
}

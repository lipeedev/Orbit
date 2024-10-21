package dev.leep.orbit.repositories;

import dev.leep.orbit.entities.Event;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, UUID> {
  Optional<Event> findByName(String name);
}

package dev.leep.orbit.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "events", uniqueConstraints = { @UniqueConstraint(columnNames = { "name" }) })
public class Event implements Serializable {
  private static final long serialVersionUID = 1L;

  @Id
  @Column(name = "event_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  @Column(name = "name", unique = true)
  private String name;

  private String time;
  private String description;
  private String location;
  private int capacity;
  private LocalDate date;
  private String password;

  @Column(name = "is_public")
  private Boolean isPublic;

  @Column(name = "owner_id")
  private UUID ownerId;

  @ManyToMany
  @JoinTable(name = "event_guests", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
  private Set<User> guests;

  @PrePersist
  @PreUpdate
  private void normalizeName() {
    this.name = this.name.toLowerCase();
  }

  public Event() {
    this.guests = new HashSet<User>();
  }

  public UUID getId() {
    return id;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(final String password) {
    this.password = password;
  }

  public Boolean getIsPublic() {
    return this.isPublic;
  }

  public void setIsPublic(final Boolean isPublic) {
    this.isPublic = isPublic;
  }

  public String getName() {
    return name;
  }

  public void setName(final String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(final String description) {
    this.description = description;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(final String location) {
    this.location = location;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(final LocalDate date) {
    this.date = date;
  }

  public Set<User> getGuests() {
    return guests;
  }

  public void addGuest(final User guest) {
    this.guests.add(guest);
  }

  public void setGuests(final Set<User> guests) {
    this.guests = guests;
  }

  public String getTime() {
    return time;
  }

  public void setTime(final String time) {
    this.time = time;
  }

  public int getCapacity() {
    return capacity;
  }

  public void setCapacity(final int capacity) {
    this.capacity = capacity;
  }

  public UUID getOwnerId() {
    return ownerId;
  }

  public void setOwnerId(final UUID ownerId) {
    this.ownerId = ownerId;
  }

}

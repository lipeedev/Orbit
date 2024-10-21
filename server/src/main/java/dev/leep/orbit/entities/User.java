package dev.leep.orbit.entities;

import java.io.Serializable;
import java.util.UUID;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = { "email" }) })
public class User implements Serializable {
  private static final long serialVersionUID = 1L;

  @Id
  @Column(name = "user_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;
  private String name;
  @Column(unique = true)
  private String username;
  @Column(unique = true)
  private String email;
  private String password;

  @ManyToMany(mappedBy = "guests")
  private Set<Event> invitedEvents;

  public User() {
    this.invitedEvents = new HashSet<Event>();
  }

  public UUID getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Set<Event> getInvitedEvents() {
    return invitedEvents;
  }

  public void setInvitedEvents(Set<Event> invitedEvents) {
    this.invitedEvents = invitedEvents;
  }

  public void addInvitedEvent(Event event) {
    this.invitedEvents.add(event);
  }

  public void removeInvitedEvent(Event event) {
    this.invitedEvents.remove(event);
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

}

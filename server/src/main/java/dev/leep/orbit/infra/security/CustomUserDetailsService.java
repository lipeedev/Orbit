package dev.leep.orbit.infra.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import dev.leep.orbit.repositories.UserRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepository repository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var user = this.repository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
        new ArrayList<>());
  }
}

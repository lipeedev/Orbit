package dev.leep.orbit.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import dev.leep.orbit.controllers.dtos.UserDTO;
import dev.leep.orbit.exceptions.AuthException;

@Service
public class TokenService {
  @Value("${api.security.token.secret}")
  private String secret;

  public String generateToken(UserDTO user) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);

      String token = JWT.create()
          .withIssuer("orbit-api")
          .withSubject(user.email())
          .withExpiresAt(this.generateExpirationDate())
          .sign(algorithm);
      return token;
    } catch (JWTCreationException exception) {
      throw new AuthException("Error while authenticating");
    }
  }

  public String validateToken(String token) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      return JWT.require(algorithm)
          .withIssuer("orbit-api")
          .build()
          .verify(token)
          .getSubject();
    } catch (JWTVerificationException exception) {
      return null;
    }
  }

  private Instant generateExpirationDate() {
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
  }

}

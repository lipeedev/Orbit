package dev.leep.orbit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class OrbitApplication {

  public static void main(String[] args) {
    var dotenv = Dotenv.load();
    dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
    var activeProfile = dotenv.get("SPRING_PROFILES_ACTIVE", "dev");
    System.setProperty("spring.profiles.active", activeProfile);

    SpringApplication.run(OrbitApplication.class, args);
  }

}

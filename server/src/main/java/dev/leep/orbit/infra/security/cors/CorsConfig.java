package dev.leep.orbit.infra.security.cors;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins(System.getenv("CORS_ALLOWED_ORIGINS"))
        .allowedMethods("GET", "POST", "DELETE", "PUT");
  }
}

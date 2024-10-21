package dev.leep.orbit.infra;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import dev.leep.orbit.exceptions.AlreadyExistsException;
import dev.leep.orbit.exceptions.AuthException;
import dev.leep.orbit.exceptions.NotFoundException;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleException(Exception e) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException e,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {

    List<String> errors = new ArrayList<>();
    e.getBindingResult().getFieldErrors().forEach(error -> errors.add(error.getDefaultMessage()));
    e.getBindingResult().getGlobalErrors().forEach(error -> errors.add(error.getDefaultMessage()));
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(new ErrorResponse(String.join(", ", errors), HttpStatus.BAD_REQUEST));
  }

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException e,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(new ErrorResponse("invalid body data format, verify the fields.", HttpStatus.BAD_REQUEST));
  }

  @ExceptionHandler(AlreadyExistsException.class)
  public ResponseEntity<ErrorResponse> handleAlreadyExistsException(AlreadyExistsException e) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(new ErrorResponse(e.getMessage(), HttpStatus.CONFLICT));
  }

  @ExceptionHandler(AuthException.class)
  public ResponseEntity<ErrorResponse> handleAuthException(AuthException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(new ErrorResponse(e.getMessage(), HttpStatus.UNAUTHORIZED));
  }

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(new ErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND));
  }

  public record ErrorResponse(String error, HttpStatus status) {
  }
}

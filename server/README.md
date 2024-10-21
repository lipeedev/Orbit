# Orbit Backend

This is the backend part of the Orbit project, a web application designed to efficiently organize and manage events. The backend is built using Java Spring Boot and PostgreSQL.

## Features

- **Event Management**: Create, update, delete, and retrieve events.
- **User Management**: Create, update, delete, and retrieve users.
- **Guest Management**: Add/Remove guests to events.
- **Authentication**: User registration and login with JWT.

## Technologies Used

- **Framework**: Spring Boot
- **Database**: PostgreSQL
- **ORM**: Hibernate (JPA)
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Configure `.env` file:
   ```bash
    PORT=
    DB_USER=
    DB_PASSWORD=
    DB_URL=
    SPRING_PROFILES_ACTIVE=prod
    JWT_TOKEN_SECRET=
    CORS_ALLOWED_ORIGINS=
   ```
3. Run the application:
   ```bash
    ./mvnw spring-boot:run
    ```

## API Documentation

**Base URL (Dev)**: `http://localhost:8080/`

### Event Routes
 - **GET /events**: Get all events
 - **POST /events**: Create a new event
 - **GET /events/{id}/guests**: Get all guests of an event
 - **POST /events/{id}/guests**: Add a guest to an event

### Authentication Routes
 - **POST /auth/register**: Register a new user
 - **POST /auth/login**: Login a user

## Entity Relationship 

- **User**: _Represents a user of the application._
  - Fields: UUID id, String name, String username, String email, String password
  - Relationships: 
    - Many-to-Many with Event (invitedEvents): A user can be invited to many events.
    - One-to-Many with Event (owner): A user can own many events.

- **Event**: _Represents an event in the application._
    - Fields: UUID id, String name, String time, String description, String location, int capacity, LocalDate date, String password, Boolean isPublic, UUID ownerId
    - Relationships: 
      - Many-to-Many with User (guests): An event can have many guests.
      - Many-to-One with User (owner): An event is owned by one user.

## Contribution 

1. Fork the repository.
2. Create a new branch.
```
git checkout -b feature/branch-name
```

3. Make your changes and commit them.
```bash
git add .
git commit -m "feat: commit message"
```

4. Push to the branch.
```bash
git push origin feature/branch-name
```

5. Create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

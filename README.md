# Orbit

Orbit is a comprehensive web application designed to efficiently organize and manage events. 
With Orbit, all events orbit in a single location, providing a centralized and user-friendly experience.

## Features

- **Event Creation**: Create events with details such as name, description, date, time, and number of guests.
- **Guest Management**: Add and manage the guest list for each event.
- **Password-Protected Rooms**: Each event has a password-protected room, ensuring participant privacy.
- **Notifications**: Send notifications to guests about updates and reminders for the event.
- **Intuitive Interface**: User-friendly interface for both administrators and guests.
- **Responsive Design**: Mobile-friendly design for easy access on any device.

## Technologies Used

- **Frontend**: NextJS, TailwindCSS, Typescript
- **Backend**: Java, Spring Boot
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

- **orbit/**: Main project directory containing the overall README.
  - **server/**: Backend directory with its own README.
  - **web/**: Frontend directory with its own README.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lipeedev/orbit.git
```
2. Navigate to the `orbit` directory:
```bash
cd orbit
```

3. install backend dependencies:
```bash
cd server
./mvnw clean install
```
4. install frontend dependencies:
```bash
cd web
npm install
```
5. configure `.env` files in both `server` and `web` directories.
    - `server/.env`:
    ```bash
    PORT=
    DB_USER=
    DB_PASSWORD=
    DB_URL=
    SPRING_PROFILES_ACTIVE=prod
    JWT_TOKEN_SECRET=
    CORS_ALLOWED_ORIGINS=
    ```

    - `web/.env.local`:
    ```bash
    JWT_SECRET=e0280b2f-9a3e-4a92-bd42-2c154e1c703d
    API_URL=http://127.0.0.1:8080
    ```
6. Start the backend server:
```bash
cd server
./mvnw spring-boot:run
```
7. Start the frontend server in dev mode (in a separate terminal):
```bash
cd web
npm run dev
```
- The application should now be running on `http://localhost:3000`.

8. To build the frontend for production:
```bash
cd web
npm run build
```
- The production build will be located in the `web/out` directory.

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

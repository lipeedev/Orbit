# Orbit Frontend

This is the frontend part of the Orbit project, a web application designed to efficiently organize and manage events. The frontend is built using Next.js 14, TailwindCSS, and TypeScript.

## Features

- **Event Creation**: Users can create events with details such as name, description, date, time, and number of guests.
- **Guest Management**: Users can add and manage the guest list for each event.
- **Password-Protected Rooms**: Each event has a password-protected room, ensuring participant privacy.
- **Notifications**: Users can receive notifications about updates and reminders for the event.
- **Intuitive Interface**: A user-friendly interface for both administrators and guests.

## Technologies Used

- **Framework**: Next.js 14
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **API Communication**: Fetch API

## Installation

1. Navigate to the `web` directory:
   ```bash
   cd web
   ``` 
2. Install the dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   ```bash
   JWT_SECRET=
   APi_URL=
   ```
   and fill in the required variables.

4. Start the development server:
   ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Screenshots

- **Home Page**:
  - The home page displays a list of events that users can join.
![Home Page](https://example.com/image.png)

- **Event Creation**:
    - Users can create events with details such as name, description, date, time, and number of guests.
![Event Creation](https://example.com/image.png)

- **Profile Page**:
  - The profile page displays the user's information and events.
![Profile Page](https://example.com/image.png)


## Contribution 
1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License. See the LICENSE file for details.

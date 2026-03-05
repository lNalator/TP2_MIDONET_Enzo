How to launch the server:

1. Install dependencies: `npm install`
2. Start the server: `npm start` or `npm run dev` for development mode with auto-restart on changes.
   The server will be running on `http://localhost:3000`. You can test the endpoints using tools like Postman or curl.
   Endpoints:

- `GET /api/users?role=<role>`: Returns a list of all users with the specified role.
- `POST /api/users`: Creates a new user.
- `GET /api/users/:id`: Returns a specific user by ID.
- `PUT /api/users/:id`: Updates a specific user by ID.
- `DELETE /api/users/:id`: Deletes a specific user by ID.


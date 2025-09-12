# Auth Backend Application

## Overview
This project is a backend application for user authentication and management using Node.js, Express, and MongoDB. It provides functionalities for user registration, login, and protected route access.

## Features
- User registration
- User login
- JWT-based authentication
- Middleware for protecting routes

## Technologies Used
- Node.js
- Express
- MongoDB (using Mongoose)
- JSON Web Tokens (JWT)

## Project Structure
```
auth-backend-app
├── src
│   ├── app.js                # Entry point of the application
│   ├── config
│   │   └── db.js            # Database connection logic
│   ├── controllers
│   │   └── authController.js # Controller for authentication
│   ├── middleware
│   │   └── authMiddleware.js  # Middleware for authentication checks
│   ├── models
│   │   └── user.js           # User model definition
│   ├── routes
│   │   └── authRoutes.js     # Authentication routes
│   └── utils
│       └── token.js          # Utility functions for JWT
├── package.json               # NPM package configuration
├── .env                       # Environment variables
└── README.md                  # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd auth-backend-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your-localdb-connection-string>
   ```

4. Start the application:
   ```
   npm start
   ```

## Usage
- To register a new user, send a POST request to `/api/auth/register` with the required user information.
- To log in, send a POST request to `/api/auth/login` with the username and password.
- Access protected routes by including the JWT in the Authorization header.

## License
This project is licensed under the MIT License.
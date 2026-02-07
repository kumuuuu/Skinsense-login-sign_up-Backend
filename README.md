# Project Overview
Node.js and Express backend that provides user signup and signin endpoints backed by MongoDB.

# Problem Statement
Provide a backend service that can register users and authenticate logins with secure password storage.

# Solution Summary
- Exposes REST endpoints for signup and signin.
- Validates input and hashes passwords with bcrypt before storing.
- Persists user data in MongoDB using Mongoose models.
- Configures database connection via environment variables.

# Technical Architecture
- `server.js` initializes the Express app, loads `config/db.js` for MongoDB connection, and mounts `/user` routes.
- `config/db.js` loads environment variables and connects to MongoDB with Mongoose for `server.js`.
- `models/User.js` defines the user schema (name, email, password stored as a hash).
- `api/User.js` implements signup/signin logic, validation, and bcrypt hashing.
- `app.js` is a minimal entry point that connects to MongoDB directly (without `config/db.js`) and defines a root status endpoint.
- Only `server.js` mounts the `/user` routes; use it when you need signup/signin functionality.

# Key Features
- User signup with name/email/password validation.
- Password hashing and comparison using bcrypt.
- User signin with stored password verification.
- JSON responses for success and failure scenarios.
- MongoDB connectivity via `MONGODB_URI`.

# Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- dotenv
- nodemon

# Setup and Run Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   ```
   Example:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/skinsense
   ```
3. Run the full API server (signup/signin routes):
   ```bash
   node server.js
   ```
   The default start script runs `app.js` (root status endpoint only) via:
   ```bash
   npm start
   ```
   Update `package.json` if you want `npm start` to run `server.js`.

# Challenges Faced
- Implementing consistent input validation for signup and signin.
- Handling password hashing and comparison safely with bcrypt.

# Key Learnings
- Building Express route modules and wiring them into an app.
- Modeling data with Mongoose and managing MongoDB connections.
- Applying bcrypt for password security in authentication flows.

# Task Manager API

A secure and simple RESTful API for managing personal tasks.  
Built with **Node.js, Express, MongoDB, Mongoose, JWT, and bcrypt** (plain JavaScript).

---

## 🚀 Features
- User authentication with JWT (access + refresh tokens)
- Secure password hashing with bcrypt
- CRUD operations for personal tasks
- Each user manages their own tasks (no sharing)
- Task fields: title, description, status, priority, dueDate
- Automatic timestamps (createdAt, updatedAt)

---

## 🔑 Authentication Flow

This API uses **JWT-based authentication** with both **access tokens** and **refresh tokens**:

1. **Register/Login**
   - User registers or logs in with email + password.
   - Passwords are hashed with bcrypt before storage.
   - On login, the server issues:
     - **Access token** (short-lived, sent in headers for protected routes).
     - **Refresh token** (long-lived, stored securely in HTTP-only cookies).

2. **Protected Routes**
   - Middleware verifies the access token (`Authorization: Bearer <token>`).
   - If valid, `req.user` is populated with the user’s ID.

3. **Refresh Token**
   - If the access token expires, the client can request a new one using the refresh token.
   - Refresh token is verified against `REFRESH_TOKEN_SECRET`.
   - Tokens are cleared when the user logs out or deletes their account.

4. **Account Deletion**
   - Requires both a valid token and password confirmation.
   - Refresh token cookie is cleared securely (`httpOnly`, `secure`, `sameSite: strict`).

---

## 📘 API Endpoints

### Users
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login user
- `POST /api/auth/refresh` → Generates a new access token using refresh token on expiration
- `POST /api/auth/logout` → Logout user
- `POST /api/auth/update` → Update user details  
- `DELETE /api/auth/delete` → Delete user account (requires password + valid tokens)

### Tasks
- `POST /api/task/create` → Create new task (linked to logged-in user)  
- `GET /api/task/get` → Get all tasks for logged-in user  
- `PUT /api/task/:id` → Update a task (only if owned by logged-in user)  
- `DELETE /api/task/:id` → Delete a task (only if owned by logged-in user)

---

## 📂 Project Structure
- /controllers  -> Route handlers (users, tasks)
- /models       -> Mongoose schemas (User, Task)
- /routes       -> Auth Routes, Task Routes
- /middleware   -> Auth middleware (JWT verification), Custom error handler 
- server.js     -> Entry point

---

## ⚙️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/Raijin-cyber/TaskManager-backend-js.git
   cd TaskManager-backend-js
2. Install dependencies:
    ```bash
    npm install
3. Create .env file:
    ```bash
    MONGO_URI=your_mongodb_connection
    ACCESS_TOKEN_SECRET=your_access_secret
    REFRESH_TOKEN_SECRET=your_refresh_secret
    PORT=5000
4. Run the server:
    ```bash
    npm start

## ⚙️ License
    This project is licensed under the ISC License.
    You are free to use, copy, modify, and distribute this software with proper attribution.
    There is no warranty provided.
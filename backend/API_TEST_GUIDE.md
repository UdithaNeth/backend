# User Authentication System API Test Guide

## Overview
This User Authentication System provides JWT-based authentication with the following features:
- User registration with password hashing
- User login with JWT token generation
- Protected routes using JWT middleware
- Secure password handling with bcryptjs

## API Endpoints

### Base URL: `http://localhost:5000`

### 1. Welcome Route
```
GET /
```
Shows available endpoints and welcome message.

### 2. User Registration
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

### 3. User Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

### 4. Get User Profile (Protected)
```
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 5. Protected Route Example
```
GET /api/protected
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "This is a protected route",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Testing with cURL

### Register a new user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Access protected route (replace YOUR_TOKEN with actual token):
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test protected route:
```bash
curl -X GET http://localhost:5000/api/protected \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs with salt rounds of 12
2. **JWT Tokens**: Secure token generation with configurable expiration (default: 30 days)
3. **Input Validation**: Email format validation and required field checks
4. **Error Handling**: Comprehensive error handling with appropriate status codes
5. **Middleware Protection**: JWT verification middleware for protected routes

## Environment Variables

Make sure your `.env` file contains:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
PORT=5000
```

## File Structure
```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── errorHandler.js      # Error handling middleware
├── models/
│   └── User.js              # User model with password hashing
├── routes/
│   └── auth.js              # Authentication routes
├── index.js                 # Main application file
├── package.json
└── .env                     # Environment variables
```
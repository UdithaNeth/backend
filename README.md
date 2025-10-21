# User Authentication System

A comprehensive JWT-based user authentication system built with Node.js, Express.js, and MongoDB. This system provides secure user registration, login, and route protection.

## Features

- **User Registration & Login** - Secure user account creation and authentication
- **JWT Token Authentication** - Stateless authentication using JSON Web Tokens
- **Password Security** - bcryptjs hashing with salt rounds for secure password storage
- **Protected Routes** - Middleware-based route protection for secure endpoints
- **Input Validation** - Comprehensive validation for user inputs and email formats
- **Error Handling** - Robust error handling with appropriate HTTP status codes
- **MongoDB Integration** - Mongoose ODM for database operations and schema validation
- **API Documentation** - Complete Postman collection for testing all endpoints
- **Security Best Practices** - Environment variables, CORS, and secure headers

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Built-in Mongoose validators
- **Security**: CORS, Environment variables
- **Testing**: Postman collection included

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── errorHandler.js      # Global error handling middleware
├── models/
│   └── User.js              # User schema and model
├── routes/
│   └── auth.js              # Authentication routes (register, login, profile)
├── .env                     # Environment variables (not tracked in Git)
├── .gitignore              # Git ignore configuration
├── index.js                # Main application entry point
├── package.json            # Project dependencies and scripts
├── API_TEST_GUIDE.md       # API testing documentation
└── User_Authentication_API.postman_collection.json # Postman collection
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "User Authentication System/backend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_database
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
   JWT_EXPIRES_IN=30d
   ```

4. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Server will be running at**: `http://localhost:5000`

## API Endpoints

### Base URL: `http://localhost:5000`


 GET - `/` - Welcome message and API info  
 POST - `/api/auth/register` - Register new user  
 POST - `/api/auth/login` - Login user  
 GET - `/api/auth/profile` - Get user profile  
 GET - `/api/protected` - Example protected route  

### Authentication Flow

1. **Register**: `POST /api/auth/register`
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **Login**: `POST /api/auth/login`
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Access Protected Routes**: Include JWT token in Authorization header
   ```
   Authorization: Bearer <jwt_token>
   ```

## Testing

### Using Postman

1. **Import Collection**: Import `User_Authentication_API.postman_collection.json` into Postman
2. **Automatic Token Management**: The collection automatically saves JWT tokens after login/register
3. **Comprehensive Tests**: Built-in tests validate all response structures and status codes
4. **Error Scenarios**: Includes tests for invalid inputs and unauthorized access

### Manual Testing with cURL

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

**Access protected route:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

##  Security Features

### Password Security
- **bcryptjs hashing** with 12 salt rounds
- **Password validation** with minimum length requirements
- **No plaintext storage** - passwords are hashed before saving

### JWT Security
- **Configurable expiration** (default: 30 days)
- **Secret key protection** via environment variables
- **Token verification** middleware for protected routes

### Input Validation
- **Email format validation** using regex patterns
- **Required field validation** for all endpoints
- **Schema-level validation** using Mongoose validators

### Error Handling
- **No sensitive data exposure** in error messages
- **Appropriate HTTP status codes** (400, 401, 404, 500)
- **Comprehensive error middleware** for all routes

## Database Schema

### User Model
```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /email regex pattern/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
    // Automatically hashed before saving
  },
  timestamps: true // createdAt, updatedAt
}
```

## Configuration

### Environment Variables
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: Token expiration time (default: 30d)

### Scripts
- `npm start`: Run production server
- `npm run dev`: Run development server with auto-restart
- `npm test`: Run test suite (when implemented)

## Features Roadmap

- [ ] Password reset functionality
- [ ] Email verification for new accounts
- [ ] User roles and permissions
- [ ] Rate limiting for API endpoints
- [ ] Refresh token implementation
- [ ] Social media authentication (Google, Facebook)
- [ ] Two-factor authentication (2FA)
- [ ] User profile management
- [ ] Account deletion and data export


## Author

**UdithaNeth**
- GitHub: [@UdithaNeth](https://github.com/UdithaNeth)

## Support

If you encounter any issues or have questions:

1. Check the [API Test Guide](./backend/API_TEST_GUIDE.md) for detailed testing instructions
2. Import the Postman collection for interactive API testing
3. Review the error messages - they provide specific guidance
4. Ensure all environment variables are properly configured


**Happy Coding!** 


import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import { protect } from './middleware/auth.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to User Authentication API',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/profile (requires JWT token)',
      protected: 'GET /api/protected (requires JWT token)'
    }
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/protected', protect, (req, res) => {
  res.json({
    success: true,
    message: 'This is a protected route',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB Connected `);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});


import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB Connected `);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

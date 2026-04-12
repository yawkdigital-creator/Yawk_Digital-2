import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from root directory FIRST (before any other imports)
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Load .env BEFORE importing database.js
dotenv.config({ path: join(rootDir, '.env') });

// Now import after dotenv is loaded
import { connectDB } from './config/database.js';
import strategyCallRoutes from './routes/strategyCall.js';
import testimonialRoutes from './routes/testimonials.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configure CORS to allow all origins (for production)
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/strategy-call', strategyCallRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

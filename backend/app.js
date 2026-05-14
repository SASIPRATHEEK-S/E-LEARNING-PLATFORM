const express = require('express');
const cors = require('cors');
const connectDB = require('./databases/mongo');
const logger = require('./utils/logger');

// Connect to database
connectDB();

const app = express();

// Middleware
const cookieParser = require('cookie-parser');
// Allow frontend to send cookies for auth
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/quiz-attempts', require('./routes/quizAttempts'));
app.use('/api/ratings', require('./routes/ratings'));
app.use('/api/complaints', require('./routes/complaints'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'E-Learning Platform API' });
});

// Error handling middleware (basic)
app.use((err, req, res, next) => {
  logger(`Error: ${err.message}`);
  res.status(500).json({ message: 'Server Error' });
});

module.exports = app;
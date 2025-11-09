import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Import routes
import playersRoutes from './routes/players.js';
import reportsRoutes from './routes/reports.js';
import statsRoutes from './routes/stats.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/players', playersRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/stats', statsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Import routes
import playersRoutes from './routes/players';
import reportsRoutes from './routes/reports';
import statsRoutes from './routes/stats';

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
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
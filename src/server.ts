import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import waitlistApi from './api/waitlistApi.js';

const app = express();
const isDevelopment = process.env.NODE_ENV !== 'production';
const port = isDevelopment ? (process.env.PORT || 3000) : (process.env.PROD_PORT || 5001);

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/waitlist', waitlistApi);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: isDevelopment ? err.message : 'Internal server error'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
// Purpose: Main API routes configuration for the VEED Video Library Dashboard
import { Router } from 'express';
import videoRoutes from './videos';
import healthRoutes from './health';
import tagRoutes from './tags';

const router = Router();

// Mount route modules
router.use('/videos', videoRoutes);
router.use('/health', healthRoutes);
router.use('/tags', tagRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'VEED Video Library Dashboard API',
    version: '1.0.0',
    endpoints: {
      videos: '/api/videos',
      health: '/api/health'
    },
    documentation: 'See README.md for API documentation'
  });
});

export default router;

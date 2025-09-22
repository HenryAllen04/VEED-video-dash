// Purpose: Health check routes for the VEED Video Library Dashboard API
import { Router, Request, Response } from 'express';
import { ApiResponse } from '../models/Video';

const router = Router();

// GET /api/health - Health check endpoint
router.get('/', (req: Request, res: Response) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  };

  res.status(200).json({
    success: true,
    data: healthData,
    message: 'Service is running'
  } as ApiResponse<typeof healthData>);
});

// GET /api/health/detailed - Detailed health check
router.get('/detailed', (req: Request, res: Response) => {
  const detailedHealth = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    platform: process.platform,
    nodeVersion: process.version
  };

  res.status(200).json({
    success: true,
    data: detailedHealth,
    message: 'Detailed service health'
  } as ApiResponse<typeof detailedHealth>);
});

export default router;

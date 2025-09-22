// Purpose: Video-related API routes for the VEED Video Library Dashboard
import { Router } from 'express';
import { VideoController } from '../controllers/videoController';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();
const videoController = new VideoController();

// GET /api/videos - Get all videos with filtering, sorting, and pagination
router.get('/', asyncHandler(videoController.getVideos));

// GET /api/videos/stats - Get video statistics (must come before /:id route)
router.get('/stats', asyncHandler(videoController.getVideoStats));

// GET /api/videos/:id - Get single video by ID
router.get('/:id', asyncHandler(videoController.getVideoById));

// POST /api/videos - Create a new video
router.post('/', asyncHandler(videoController.createVideo));

// PUT /api/videos/:id - Update an existing video
router.put('/:id', asyncHandler(videoController.updateVideo));

// DELETE /api/videos/:id - Delete a video
router.delete('/:id', asyncHandler(videoController.deleteVideo));

export default router;

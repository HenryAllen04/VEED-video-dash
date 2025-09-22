// Purpose: Tag-related API routes for the VEED Video Library Dashboard
import { Router } from 'express';
import { VideoService } from '../services/videoService.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiResponse } from '../models/Video.js';

const router = Router();

// GET /api/tags - Get all available tags with counts
router.get('/', asyncHandler(async (req: any, res: any) => {
  try {
    const videoService = new VideoService();
    const allVideos = await videoService.getVideos({ 
      sort: 'created_at', 
      order: 'desc', 
      limit: 1000, 
      offset: 0 
    });
    const { videos } = allVideos;
    
    // Aggregate tags with counts
    const tagCounts = new Map<string, number>();
    
    videos.forEach(video => {
      video.tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase().trim();
        tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
      });
    });
    
    // Convert to array and sort by count (descending)
    const sortedTags = Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
    
    res.status(200).json({
      success: true,
      data: sortedTags
    } as ApiResponse<typeof sortedTags>);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch tags'
    } as ApiResponse<never>);
  }
}));

export default router;

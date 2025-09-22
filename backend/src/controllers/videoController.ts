// Purpose: HTTP request handlers for video-related endpoints in the VEED Video Library Dashboard
import { Request, Response } from 'express';
import { VideoService } from '../services/videoService';
import { VideoQuerySchema, CreateVideoSchema, ApiResponse } from '../models/Video';

export class VideoController {
  private videoService: VideoService;

  constructor() {
    this.videoService = new VideoService();
  }

  // GET /api/videos - Get all videos with filtering, sorting, and pagination
  getVideos = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate query parameters
      const queryResult = VideoQuerySchema.safeParse(req.query);
      
      if (!queryResult.success) {
        res.status(400).json({
          success: false,
          error: 'Invalid query parameters',
          details: queryResult.error.issues
        } as ApiResponse<never>);
        return;
      }

      const videos = await this.videoService.getVideos(queryResult.data);
      
      res.status(200).json({
        success: true,
        data: videos
      } as ApiResponse<typeof videos>);
    } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch videos'
      } as ApiResponse<never>);
    }
  };

  // GET /api/videos/:id - Get single video by ID
  getVideoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Video ID is required'
        } as ApiResponse<never>);
        return;
      }

      const video = await this.videoService.getVideoById(id);
      
      if (!video) {
        res.status(404).json({
          success: false,
          error: 'Video not found'
        } as ApiResponse<never>);
        return;
      }

      res.status(200).json({
        success: true,
        data: video
      } as ApiResponse<typeof video>);
    } catch (error) {
      console.error('Error fetching video:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch video'
      } as ApiResponse<never>);
    }
  };

  // POST /api/videos - Create a new video
  createVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request body
      const bodyResult = CreateVideoSchema.safeParse(req.body);
      
      if (!bodyResult.success) {
        res.status(400).json({
          success: false,
          error: 'Invalid video data',
          details: bodyResult.error.issues
        } as ApiResponse<never>);
        return;
      }

      const newVideo = await this.videoService.createVideo(bodyResult.data);
      
      res.status(201).json({
        success: true,
        data: newVideo,
        message: 'Video created successfully'
      } as ApiResponse<typeof newVideo>);
    } catch (error) {
      console.error('Error creating video:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Failed to create video'
      } as ApiResponse<never>);
    }
  };

  // PUT /api/videos/:id - Update an existing video
  updateVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Video ID is required'
        } as ApiResponse<never>);
        return;
      }

      // Validate request body
      const bodyResult = CreateVideoSchema.partial().safeParse(req.body);
      
      if (!bodyResult.success) {
        res.status(400).json({
          success: false,
          error: 'Invalid video data',
          details: bodyResult.error.issues
        } as ApiResponse<never>);
        return;
      }

      const updatedVideo = await this.videoService.updateVideo(id, bodyResult.data);
      
      if (!updatedVideo) {
        res.status(404).json({
          success: false,
          error: 'Video not found'
        } as ApiResponse<never>);
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedVideo,
        message: 'Video updated successfully'
      } as ApiResponse<typeof updatedVideo>);
    } catch (error) {
      console.error('Error updating video:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Failed to update video'
      } as ApiResponse<never>);
    }
  };

  // DELETE /api/videos/:id - Delete a video
  deleteVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Video ID is required'
        } as ApiResponse<never>);
        return;
      }

      const deleted = await this.videoService.deleteVideo(id);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Video not found'
        } as ApiResponse<never>);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Video deleted successfully'
      } as ApiResponse<never>);
    } catch (error) {
      console.error('Error deleting video:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Failed to delete video'
      } as ApiResponse<never>);
    }
  };

  // GET /api/videos/stats - Get video statistics
  getVideoStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await this.videoService.getVideoStats();
      
      res.status(200).json({
        success: true,
        data: stats
      } as ApiResponse<typeof stats>);
    } catch (error) {
      console.error('Error fetching video stats:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch video statistics'
      } as ApiResponse<never>);
    }
  };
}

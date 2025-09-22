// Purpose: API service layer for communicating with the VEED Video Library Dashboard backend
import axios from 'axios';
import { Video, CreateVideoRequest, VideosResponse, ApiResponse, VideoQuery, VideoStats } from '../types/video.types';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class VideoService {
  // Get all videos with optional filtering and pagination
  static async getVideos(query: VideoQuery = {}): Promise<VideosResponse> {
    try {
      const response = await api.get<ApiResponse<VideosResponse>>('/videos', {
        params: query
      });
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to fetch videos');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }

  // Get a single video by ID
  static async getVideoById(id: string): Promise<Video> {
    try {
      const response = await api.get<ApiResponse<Video>>(`/videos/${id}`);
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to fetch video');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching video:', error);
      throw error;
    }
  }

  // Create a new video
  static async createVideo(videoData: CreateVideoRequest): Promise<Video> {
    try {
      const response = await api.post<ApiResponse<Video>>('/videos', videoData);
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to create video');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error creating video:', error);
      throw error;
    }
  }

  // Update an existing video
  static async updateVideo(id: string, videoData: Partial<CreateVideoRequest>): Promise<Video> {
    try {
      const response = await api.put<ApiResponse<Video>>(`/videos/${id}`, videoData);
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to update video');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error updating video:', error);
      throw error;
    }
  }

  // Delete a video
  static async deleteVideo(id: string): Promise<void> {
    try {
      const response = await api.delete<ApiResponse<never>>(`/videos/${id}`);
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to delete video');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  }

  // Get video statistics
  static async getVideoStats(): Promise<VideoStats> {
    try {
      const response = await api.get<ApiResponse<VideoStats>>('/videos/stats');
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to fetch video stats');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching video stats:', error);
      throw error;
    }
  }
}

export default VideoService;

// Purpose: Business logic layer for video operations in the VEED Video Library Dashboard
import fs from 'fs/promises';
import path from 'path';
import { Video, CreateVideoRequest, VideoQuery, VideosResponse } from '../models/Video';

export class VideoService {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../data/videos.json');
  }

  // Load videos from JSON file
  private async loadVideos(): Promise<{ videos: Video[] }> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading videos:', error);
      return { videos: [] };
    }
  }

  // Save videos to JSON file
  private async saveVideos(videosData: { videos: Video[] }): Promise<void> {
    try {
      await fs.writeFile(this.dataPath, JSON.stringify(videosData, null, 2));
    } catch (error) {
      console.error('Error saving videos:', error);
      throw new Error('Failed to save videos');
    }
  }

  // Get all videos with filtering, sorting, and pagination
  async getVideos(query: VideoQuery): Promise<VideosResponse> {
    const { videos } = await this.loadVideos();
    let filteredVideos = [...videos];

    // Apply search filter
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredVideos = filteredVideos.filter(video =>
        video.title.toLowerCase().includes(searchTerm)
      );
    }

    // Apply tag filter
    if (query.tags) {
      const filterTags = query.tags.split(',').map(tag => tag.trim().toLowerCase());
      filteredVideos = filteredVideos.filter(video =>
        video.tags.some(tag => 
          filterTags.some(filterTag => tag.toLowerCase().includes(filterTag))
        )
      );
    }

    // Apply sorting
    filteredVideos.sort((a, b) => {
      let aValue: any = a[query.sort];
      let bValue: any = b[query.sort];

      // Handle date sorting
      if (query.sort === 'created_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (query.order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Apply pagination
    const total = filteredVideos.length;
    const startIndex = query.offset;
    const endIndex = startIndex + query.limit;
    const paginatedVideos = filteredVideos.slice(startIndex, endIndex);

    return {
      videos: paginatedVideos,
      total,
      page: Math.floor(query.offset / query.limit) + 1,
      limit: query.limit
    };
  }

  // Get single video by ID
  async getVideoById(id: string): Promise<Video | null> {
    const { videos } = await this.loadVideos();
    return videos.find(video => video.id === id) || null;
  }

  // Create a new video
  async createVideo(videoData: CreateVideoRequest): Promise<Video> {
    const { videos } = await this.loadVideos();
    
    // Generate new video ID
    const newId = `v-${String(videos.length + 1).padStart(3, '0')}`;
    
    // Create new video with default values
    const newVideo: Video = {
      id: newId,
      title: videoData.title,
      thumbnail_url: `https://picsum.photos/seed/${newId}/300/200`,
      created_at: new Date().toISOString(),
      duration: 300, // Default 5 minutes
      views: 0, // Default 0 views
      tags: videoData.tags || []
    };

    // Add to videos array
    videos.push(newVideo);
    
    // Save to file
    await this.saveVideos({ videos });
    
    return newVideo;
  }

  // Update an existing video
  async updateVideo(id: string, updateData: Partial<CreateVideoRequest>): Promise<Video | null> {
    const { videos } = await this.loadVideos();
    const videoIndex = videos.findIndex(video => video.id === id);
    
    if (videoIndex === -1) {
      return null;
    }

    // Update video data
    videos[videoIndex] = {
      ...videos[videoIndex],
      ...updateData,
      id // Ensure ID doesn't change
    };

    await this.saveVideos({ videos });
    return videos[videoIndex];
  }

  // Delete a video
  async deleteVideo(id: string): Promise<boolean> {
    const { videos } = await this.loadVideos();
    const videoIndex = videos.findIndex(video => video.id === id);
    
    if (videoIndex === -1) {
      return false;
    }

    videos.splice(videoIndex, 1);
    await this.saveVideos({ videos });
    return true;
  }

  // Get video statistics
  async getVideoStats(): Promise<{ total: number; totalViews: number; averageDuration: number }> {
    const { videos } = await this.loadVideos();
    
    return {
      total: videos.length,
      totalViews: videos.reduce((sum, video) => sum + video.views, 0),
      averageDuration: videos.length > 0 
        ? videos.reduce((sum, video) => sum + video.duration, 0) / videos.length 
        : 0
    };
  }
}

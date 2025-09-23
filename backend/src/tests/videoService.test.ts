// Purpose: Unit tests for video service business logic
import { VideoService } from '../services/videoService';
import { CreateVideoRequest } from '../models/Video';

describe('VideoService', () => {
  let videoService: VideoService;

  beforeEach(() => {
    videoService = new VideoService();
  });

  describe('getVideos', () => {
    it('should return paginated videos', async () => {
      const result = await videoService.getVideos({
        limit: 5,
        offset: 0,
        sort: 'created_at',
        order: 'desc'
      });

      expect(result.videos).toHaveLength(5);
      expect(result.total).toBeGreaterThan(0);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(5);
    });

    it('should filter videos by search term', async () => {
      const result = await videoService.getVideos({
        search: 'tutorial',
        limit: 50,
        offset: 0,
        sort: 'created_at',
        order: 'desc'
      });

      result.videos.forEach(video => {
        expect(video.title.toLowerCase()).toContain('tutorial');
      });
    });

    it('should filter videos by tags', async () => {
      const result = await videoService.getVideos({
        tags: 'tutorial,beginner',
        limit: 50,
        offset: 0,
        sort: 'created_at',
        order: 'desc'
      });

      result.videos.forEach(video => {
        const hasTag = video.tags.some(tag => 
          ['tutorial', 'beginner'].includes(tag)
        );
        expect(hasTag).toBe(true);
      });
    });
  });

  describe('createVideo', () => {
    it('should create a video with auto-generated fields', async () => {
      const videoData: CreateVideoRequest = {
        title: 'Test Video Creation',
        tags: ['test', 'unit-test']
      };

      const createdVideo = await videoService.createVideo(videoData);

      expect(createdVideo).toMatchObject({
        title: videoData.title,
        tags: videoData.tags,
        id: expect.stringMatching(/^v-\d+$/),
        created_at: expect.any(String),
        duration: expect.any(Number),
        views: 0,
        thumbnail_url: expect.stringMatching(/^https:\/\//)
      });

      // Verify created_at is a valid ISO date
      expect(new Date(createdVideo.created_at).toISOString()).toBe(createdVideo.created_at);
    });

    it('should handle empty tags array', async () => {
      const videoData: CreateVideoRequest = {
        title: 'Test Video No Tags',
        tags: []
      };

      const createdVideo = await videoService.createVideo(videoData);

      expect(createdVideo.tags).toEqual([]);
    });
  });

  describe('getVideoById', () => {
    it('should return null for non-existent video', async () => {
      const video = await videoService.getVideoById('non-existent');
      expect(video).toBeNull();
    });

    it('should return video if it exists', async () => {
      // First create a video to ensure we have one
      const created = await videoService.createVideo({
        title: 'Test for retrieval',
        tags: ['test']
      });

      const retrieved = await videoService.getVideoById(created.id);
      expect(retrieved).toEqual(created);
    });
  });
});

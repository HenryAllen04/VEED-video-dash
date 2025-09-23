// Purpose: Basic API endpoint tests for video controller
import request from 'supertest';
import app from '../app';

describe('Video API Endpoints', () => {
  describe('GET /api/videos', () => {
    it('should return videos list with default pagination', async () => {
      const response = await request(app)
        .get('/api/videos')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('videos');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('page');
      expect(response.body.data).toHaveProperty('limit');
      expect(Array.isArray(response.body.data.videos)).toBe(true);
    });

    it('should filter videos by search query', async () => {
      const response = await request(app)
        .get('/api/videos?search=tutorial')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.videos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: expect.stringMatching(/tutorial/i)
          })
        ])
      );
    });

    it('should sort videos by created_at desc by default', async () => {
      const response = await request(app)
        .get('/api/videos')
        .expect(200);

      const videos = response.body.data.videos;
      if (videos.length > 1) {
        const firstDate = new Date(videos[0].created_at);
        const secondDate = new Date(videos[1].created_at);
        expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime());
      }
    });

    it('should validate query parameters', async () => {
      const response = await request(app)
        .get('/api/videos?limit=invalid')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid query parameters');
    });
  });

  describe('POST /api/videos', () => {
    it('should create a new video with valid data', async () => {
      const newVideo = {
        title: 'Test Video',
        tags: ['test', 'api']
      };

      const response = await request(app)
        .post('/api/videos')
        .send(newVideo)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        title: newVideo.title,
        tags: newVideo.tags,
        id: expect.any(String),
        created_at: expect.any(String),
        duration: expect.any(Number),
        views: expect.any(Number),
        thumbnail_url: expect.any(String)
      });
    });

    it('should reject video creation without title', async () => {
      const invalidVideo = {
        tags: ['test']
        // Missing title
      };

      const response = await request(app)
        .post('/api/videos')
        .send(invalidVideo)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid video data');
    });

    it('should create video with empty tags array when not provided', async () => {
      const newVideo = {
        title: 'Test Video No Tags'
      };

      const response = await request(app)
        .post('/api/videos')
        .send(newVideo)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.tags).toEqual([]);
    });
  });

  describe('GET /api/videos/:id', () => {
    it('should return 404 for non-existent video', async () => {
      const response = await request(app)
        .get('/api/videos/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Video not found');
    });
  });

  describe('GET /api/tags', () => {
    it('should return available tags with counts', async () => {
      const response = await request(app)
        .get('/api/tags')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data[0]).toMatchObject({
        tag: expect.any(String),
        count: expect.any(Number)
      });
    });
  });
});

// Purpose: Server entry point for the VEED Video Library Dashboard API
import app from './app';

// Configuration
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Start server
const server = app.listen(PORT, () => {
  console.log(`
🚀 VEED Video Library Dashboard API Server Started!

📍 Environment: ${NODE_ENV}
🌐 Server URL: http://localhost:${PORT}
🔗 API Base: http://localhost:${PORT}/api
💚 Health Check: http://localhost:${PORT}/health

📚 Available Endpoints:
   GET    /api/videos          - Get all videos (with filtering/sorting)
   POST   /api/videos          - Create new video
   GET    /api/videos/:id      - Get single video
   PUT    /api/videos/:id      - Update video
   DELETE /api/videos/:id      - Delete video
   GET    /api/videos/stats    - Get video statistics
   GET    /api/health          - Health check

🎯 Ready to serve requests!
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default server;

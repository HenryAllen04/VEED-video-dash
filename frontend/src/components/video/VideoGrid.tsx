// Purpose: Grid layout component for displaying multiple video cards
import React from 'react';
import { Video } from '../../types/video.types';
import VideoCard from './VideoCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
  error?: string;
  onVideoClick?: (video: Video) => void;
  onRetry?: () => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  loading = false,
  error,
  onVideoClick,
  onRetry
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="lg" className="text-primary-500 mb-4" />
        <p className="text-gray-500">Loading videos...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-8">
        <ErrorMessage 
          message={error} 
          onRetry={onRetry}
          className="max-w-md mx-auto"
        />
      </div>
    );
  }

  // Empty state
  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-500 mb-4">
            There are no videos matching your current filters.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn-primary"
            >
              Refresh
            </button>
          )}
        </div>
      </div>
    );
  }

  // Grid display
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {videos.map((video) => (
        <div key={video.id} className="animate-slide-up">
          <VideoCard
            video={video}
            onClick={onVideoClick}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;

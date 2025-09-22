// Purpose: Individual video card component for displaying video information
import React from 'react';
import { Video } from '../../types/video.types';

interface VideoCardProps {
  video: Video;
  onClick?: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="card cursor-pointer transform hover:scale-105 transition-all duration-200"
      onClick={() => onClick?.(video)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            e.currentTarget.src = `https://via.placeholder.com/300x200/e5e7eb/6b7280?text=${encodeURIComponent(video.title.slice(0, 20))}`;
          }}
        />
        
        {/* Duration overlay */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {video.title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{formatViews(video.views)} views</span>
          <span>{formatDate(video.created_at)}</span>
        </div>

        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                +{video.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;

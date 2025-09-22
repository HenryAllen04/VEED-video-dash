// Purpose: Video details modal component showing full video metadata
import React from 'react';
import { Video } from '../../types/video.types';
import Modal from '../ui/Modal';
import TagChip from './TagChip';

interface VideoDetailsModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (video: Video) => void;
  onDelete?: (video: Video) => void;
}

const VideoDetailsModal: React.FC<VideoDetailsModalProps> = ({
  video,
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!video) return null;

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views.toLocaleString()} views`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Video Details"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Video Preview */}
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/640x360/e5e7eb/6b7280?text=${encodeURIComponent(video.title.slice(0, 20))}`;
            }}
          />
          
          {/* Duration overlay */}
          <div className="relative">
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded">
              {formatDuration(video.duration)}
            </div>
          </div>
        </div>

        {/* Video Information */}
        <div className="space-y-4">
          {/* Title and Actions */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {video.title}
              </h2>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>{formatViews(video.views)}</span>
                <span>•</span>
                <span>Created {formatDate(video.created_at)}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2 ml-4">
              {onEdit && (
                <button
                  onClick={() => onEdit(video)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={() => onDelete(video)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video ID
                </label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md font-mono">
                  {video.id}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <div className="text-sm text-gray-900">
                  {formatDuration(video.duration)} ({video.duration} seconds)
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Views
                </label>
                <div className="text-sm text-gray-900">
                  {formatViews(video.views)}
                </div>
              </div>
            </div>

            {/* Dates and URLs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created At
                </label>
                <div className="text-sm text-gray-900">
                  {formatDate(video.created_at)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <div className="text-sm text-gray-900 break-all">
                  <a 
                    href={video.thumbnail_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800 underline"
                  >
                    {video.thumbnail_url}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tags ({video.tags.length})
            </label>
            {video.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                  <TagChip
                    key={index}
                    tag={tag}
                    className="bg-primary-100 text-primary-800"
                  />
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">
                No tags assigned
              </div>
            )}
          </div>

          {/* Statistics Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {formatViews(video.views).replace(' views', '')}
                </div>
                <div className="text-xs text-gray-500">Views</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {formatDuration(video.duration)}
                </div>
                <div className="text-xs text-gray-500">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {video.tags.length}
                </div>
                <div className="text-xs text-gray-500">Tags</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            Close
          </button>
          
          {onEdit && (
            <button
              onClick={() => onEdit(video)}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Edit Video
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default VideoDetailsModal;

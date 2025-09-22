// Purpose: Modal component for editing existing videos
import React, { useState } from 'react';
import { Video, CreateVideoRequest } from '../../types/video.types';
import Modal from '../ui/Modal';
import VideoForm from './VideoForm';
import VideoService from '../../services/api';

interface EditVideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
  onVideoUpdated: (updatedVideo: Video) => void;
}

const EditVideoModal: React.FC<EditVideoModalProps> = ({
  video,
  isOpen,
  onClose,
  onVideoUpdated
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  if (!video) return null;

  const initialData: CreateVideoRequest = {
    title: video.title,
    tags: video.tags
  };

  const handleSubmit = async (videoData: CreateVideoRequest) => {
    try {
      setLoading(true);
      setError('');
      
      const updatedVideo = await VideoService.updateVideo(video.id, videoData);
      onVideoUpdated(updatedVideo);
      onClose();
    } catch (err: any) {
      console.error('Error updating video:', err);
      setError(err.message || 'Failed to update video. Please try again.');
      throw err; // Re-throw so form knows about the error
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Edit Video: ${video.title}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Video Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-16 h-16 object-cover rounded"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/64x64/e5e7eb/6b7280?text=Video`;
              }}
            />
            <div>
              <h4 className="font-medium text-gray-900">{video.title}</h4>
              <p className="text-sm text-gray-500">
                ID: {video.id} • {video.views.toLocaleString()} views
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <VideoForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          initialData={initialData}
          mode="edit"
        />

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditVideoModal;

// Purpose: Page for creating new video entries
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateVideoRequest } from '../types/video.types';
import VideoService from '../services/api';
import VideoForm from '../components/video/VideoForm';

const VideoCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (videoData: CreateVideoRequest) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const newVideo = await VideoService.createVideo(videoData);
      
      setSuccess(true);
      
      // Redirect to video list after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);

      console.log('Video created successfully:', newVideo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create video';
      setError(errorMessage);
      console.error('Error creating video:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Video</h1>
              <p className="mt-1 text-gray-500">
                Create a new video entry for your library
              </p>
            </div>
            <Link
              to="/"
              className="btn-secondary"
            >
              ← Back to Library
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Video created successfully!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Redirecting to video library...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Create New Video
              </h2>
              <p className="text-gray-600">
                Fill in the details below to add a new video to your library
              </p>
            </div>

            <VideoForm
              onSubmit={handleSubmit}
              loading={loading}
              error={error || undefined}
            />
          </div>

          {/* Help Text */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  What happens next?
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>A unique ID will be automatically generated</li>
                    <li>A placeholder thumbnail will be assigned</li>
                    <li>Default duration and view count will be set</li>
                    <li>Creation date will be set to now</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCreatePage;

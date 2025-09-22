// Purpose: Main page for displaying and managing the video library
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, VideoQuery } from '../types/video.types';
import VideoService from '../services/api';
import VideoGrid from '../components/video/VideoGrid';

const VideoListPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<VideoQuery>({
    sort: 'created_at',
    order: 'desc',
    limit: 20,
    offset: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [totalVideos, setTotalVideos] = useState(0);

  // Fetch videos
  const fetchVideos = async (newQuery: VideoQuery = query) => {
    try {
      setLoading(true);
      setError(null);
      const response = await VideoService.getVideos(newQuery);
      setVideos(response.videos);
      setTotalVideos(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load videos');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchVideos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuery = {
      ...query,
      search: searchTerm || undefined,
      offset: 0 // Reset to first page
    };
    setQuery(newQuery);
    fetchVideos(newQuery);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split('-') as [VideoQuery['sort'], VideoQuery['order']];
    const newQuery = {
      ...query,
      sort,
      order,
      offset: 0 // Reset to first page
    };
    setQuery(newQuery);
    fetchVideos(newQuery);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    const newQuery = {
      ...query,
      search: undefined,
      offset: 0
    };
    setQuery(newQuery);
    fetchVideos(newQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Video Library</h1>
              <p className="mt-1 text-gray-500">
                {totalVideos} {totalVideos === 1 ? 'video' : 'videos'} total
              </p>
            </div>
            <Link
              to="/create"
              className="btn-primary"
            >
              + Add Video
            </Link>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search videos..."
                  className="input-field pr-20"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600 px-2"
                    >
                      ×
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Sort */}
            <div className="sm:w-48">
              <select
                value={`${query.sort}-${query.order}`}
                onChange={handleSortChange}
                className="input-field"
              >
                <option value="created_at-desc">Newest First</option>
                <option value="created_at-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="views-desc">Most Views</option>
                <option value="views-asc">Least Views</option>
              </select>
            </div>
          </div>

          {/* Active filters display */}
          {(query.search || query.tags) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {query.search && (
                <span className="inline-flex items-center bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                  Search: "{query.search}"
                  <button
                    onClick={clearSearch}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Video Grid */}
        <VideoGrid
          videos={videos}
          loading={loading}
          error={error || undefined}
          onRetry={() => fetchVideos()}
          onVideoClick={(video) => {
            console.log('Video clicked:', video);
            // TODO: Navigate to video detail page or open modal
          }}
        />

        {/* Load More Button */}
        {!loading && videos.length < totalVideos && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                const newQuery = {
                  ...query,
                  offset: videos.length
                };
                fetchVideos(newQuery).then(() => {
                  // Append new videos to existing list
                  VideoService.getVideos(newQuery).then(response => {
                    setVideos(prev => [...prev, ...response.videos]);
                  });
                });
              }}
              className="btn-secondary"
            >
              Load More Videos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoListPage;

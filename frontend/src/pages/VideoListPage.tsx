// Purpose: Main page for displaying and managing the video library
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, VideoQuery, TagCount } from '../types/video.types';
import VideoService from '../services/api';
import VideoGrid from '../components/video/VideoGrid';
import TagFilterDropdown from '../components/video/TagFilterDropdown';
import TagChip from '../components/video/TagChip';
import DateRangePicker from '../components/ui/DateRangePicker';
import VideoDetailsModal from '../components/video/VideoDetailsModal';
import EditVideoModal from '../components/video/EditVideoModal';
import ConfirmModal from '../components/ui/ConfirmModal';

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
  const [availableTags, setAvailableTags] = useState<TagCount[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({});
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // Fetch available tags
  const fetchTags = async () => {
    try {
      const tags = await VideoService.getTags();
      setAvailableTags(tags);
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchVideos();
    fetchTags();
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
    const [sort, order] = e.target.value.split('-');
    const newQuery: VideoQuery = {
      ...query,
      sort: sort as VideoQuery['sort'],
      order: order as VideoQuery['order'],
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

  // Handle tag filtering
  const handleTagToggle = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    
    const newQuery = {
      ...query,
      tags: newSelectedTags.length > 0 ? newSelectedTags.join(',') : undefined,
      offset: 0
    };
    setQuery(newQuery);
    fetchVideos(newQuery);
  };

  // Clear all tag filters
  const clearAllTags = () => {
    setSelectedTags([]);
    const newQuery = {
      ...query,
      tags: undefined,
      offset: 0
    };
    setQuery(newQuery);
    fetchVideos(newQuery);
  };

  // Handle date range change
  const handleDateRangeChange = (range: { from?: string; to?: string }) => {
    setDateRange(range);
    const newQuery = {
      ...query,
      dateFrom: range.from,
      dateTo: range.to,
      offset: 0
    };
    setQuery(newQuery);
    fetchVideos(newQuery);
  };

  // Clear date range
  const clearDateRange = () => {
    setDateRange({});
    const newQuery = {
      ...query,
      dateFrom: undefined,
      dateTo: undefined,
      offset: 0
    };
    setQuery(newQuery);
    fetchVideos(newQuery);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setDateRange({});
    const newQuery: VideoQuery = {
      sort: 'created_at',
      order: 'desc',
      limit: 20,
      offset: 0
    };
    setQuery(newQuery);
    fetchVideos(newQuery);
  };

  // Handle video click for details
  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsDetailsModalOpen(true);
  };

  // Handle close details modal
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedVideo(null);
  };

  // Handle close edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedVideo(null);
  };

  // Handle video updated
  const handleVideoUpdated = (updatedVideo: Video) => {
    setVideos(prev => prev.map(v => v.id === updatedVideo.id ? updatedVideo : v));
    // Optionally refresh tags if new ones were added
    fetchTags();
  };

  // Handle edit video
  const handleEditVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsDetailsModalOpen(false); // Close details modal
    setIsEditModalOpen(true); // Open edit modal
  };

  // Handle delete video
  const handleDeleteVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsDetailsModalOpen(false); // Close details modal
    setIsDeleteModalOpen(true); // Open delete confirmation
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedVideo) return;

    try {
      setDeleteLoading(true);
      await VideoService.deleteVideo(selectedVideo.id);
      
      // Remove video from local state
      setVideos(prev => prev.filter(v => v.id !== selectedVideo.id));
      setTotalVideos(prev => prev - 1);
      
      // Close modal and reset state
      setIsDeleteModalOpen(false);
      setSelectedVideo(null);
    } catch (error: any) {
      console.error('Error deleting video:', error);
      // You could show a toast notification here
      alert('Failed to delete video. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle close delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedVideo(null);
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
          <div className="flex flex-col gap-4">
            {/* First Row: Search and Sort */}
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

            {/* Second Row: Tag and Date Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1 sm:max-w-md">
                <TagFilterDropdown
                  availableTags={availableTags}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  onClearAll={clearAllTags}
                />
              </div>
              
              <div className="flex-1 sm:max-w-md">
                <DateRangePicker
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  onClear={clearDateRange}
                />
              </div>
              
              {(searchTerm || selectedTags.length > 0 || dateRange.from || dateRange.to) && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline whitespace-nowrap"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Active filters display */}
          {(query.search || selectedTags.length > 0 || dateRange.from || dateRange.to) && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">Active filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {query.search && (
                  <TagChip
                    tag={`Search: "${query.search}"`}
                    removable
                    onRemove={clearSearch}
                    className="bg-blue-100 text-blue-800"
                  />
                )}
                {selectedTags.map(tag => (
                  <TagChip
                    key={tag}
                    tag={tag}
                    removable
                    onRemove={handleTagToggle}
                    className="bg-green-100 text-green-800"
                  />
                ))}
                {(dateRange.from || dateRange.to) && (
                  <TagChip
                    tag={`Date: ${dateRange.from ? new Date(dateRange.from).toLocaleDateString() : 'Any'} - ${dateRange.to ? new Date(dateRange.to).toLocaleDateString() : 'Any'}`}
                    removable
                    onRemove={clearDateRange}
                    className="bg-purple-100 text-purple-800"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Video Grid */}
        <VideoGrid
          videos={videos}
          loading={loading}
          error={error || undefined}
          onRetry={() => fetchVideos()}
          onVideoClick={handleVideoClick}
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

        {/* Video Details Modal */}
        <VideoDetailsModal
          video={selectedVideo}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          onEdit={handleEditVideo}
          onDelete={handleDeleteVideo}
        />

        {/* Edit Video Modal */}
        <EditVideoModal
          video={selectedVideo}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onVideoUpdated={handleVideoUpdated}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Delete Video"
          message={selectedVideo ? `Are you sure you want to delete "${selectedVideo.title}"? This action cannot be undone.` : ''}
          confirmText="Delete Video"
          variant="danger"
          loading={deleteLoading}
        />
      </div>
    </div>
  );
};

export default VideoListPage;

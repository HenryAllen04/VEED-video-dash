// Purpose: Form component for creating new video entries
import React, { useState } from 'react';
import { CreateVideoRequest } from '../../types/video.types';
import LoadingSpinner from '../ui/LoadingSpinner';

interface VideoFormProps {
  onSubmit: (videoData: CreateVideoRequest) => Promise<void>;
  loading?: boolean;
  error?: string;
  initialData?: CreateVideoRequest;
  mode?: 'create' | 'edit';
}

const VideoForm: React.FC<VideoFormProps> = ({ 
  onSubmit, 
  loading = false, 
  error,
  initialData,
  mode = 'create'
}) => {
  const [formData, setFormData] = useState<CreateVideoRequest>(
    initialData || {
      title: '',
      tags: []
    }
  );
  const [tagInput, setTagInput] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      errors.title = 'Title must be at least 3 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form on success (only for create mode)
      if (mode === 'create') {
        setFormData({ title: '', tags: [] });
        setTagInput('');
        setValidationErrors({});
      }
    } catch (err) {
      // Error handling is done by parent component
      console.error('Form submission error:', err);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, title: e.target.value }));
    // Clear validation error when user starts typing
    if (validationErrors.title) {
      setValidationErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags?.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Video Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleTitleChange}
            className={`input-field ${validationErrors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter video title..."
            disabled={loading}
          />
          {validationErrors.title && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
          )}
        </div>

        {/* Tags Field */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags (optional)
          </label>
          <div className="space-y-2">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyPress={handleTagInputKeyPress}
              onBlur={addTag}
              className="input-field"
              placeholder="Add tags (press Enter or comma to add)..."
              disabled={loading}
            />
            
            {/* Display added tags */}
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Press Enter or comma to add multiple tags
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || !formData.title.trim()}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                {mode === 'edit' ? 'Updating Video...' : 'Creating Video...'}
              </>
            ) : (
              mode === 'edit' ? 'Update Video' : 'Create Video'
            )}
          </button>
        </div>
      </form>

      {/* Helper Text */}
      <div className="mt-6 text-sm text-gray-500">
        <p>
          <strong>Note:</strong> {mode === 'edit' 
            ? 'Only title and tags can be modified. Other metadata is preserved.'
            : 'Thumbnail, duration, and view count will be set automatically.'
          }
        </p>
      </div>
    </div>
  );
};

export default VideoForm;

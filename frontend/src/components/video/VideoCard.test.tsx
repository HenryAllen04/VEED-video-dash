// Purpose: Unit tests for VideoCard component
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoCard from './VideoCard';
import { Video } from '../../types/video.types';

const mockVideo: Video = {
  id: 'test-video-1',
  title: 'Test Video Title',
  thumbnail_url: 'https://example.com/thumbnail.jpg',
  created_at: '2023-10-01T12:00:00.000Z',
  duration: 300,
  views: 1250,
  tags: ['tutorial', 'react', 'testing']
};

describe('VideoCard', () => {
  test('renders video information correctly', () => {
    const mockOnClick = jest.fn();
    
    render(<VideoCard video={mockVideo} onClick={mockOnClick} />);
    
    // Check if title is rendered
    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
    
    // Check if date is formatted correctly
    expect(screen.getByText(/Oct.*2023/)).toBeInTheDocument();
    
    // Check if duration is formatted correctly
    expect(screen.getByText('5:00')).toBeInTheDocument();
    
    // Check if views are formatted correctly (component uses K/M formatting)
    expect(screen.getByText('1.3K views')).toBeInTheDocument();
    
    // Check if tags are rendered
    expect(screen.getByText('tutorial')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const mockOnClick = jest.fn();
    
    render(<VideoCard video={mockVideo} onClick={mockOnClick} />);
    
    // The card is a div with click handler, not a button
    const cardElement = screen.getByText('Test Video Title').closest('div');
    fireEvent.click(cardElement!);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockVideo);
  });

  test('renders thumbnail with correct alt text', () => {
    const mockOnClick = jest.fn();
    
    render(<VideoCard video={mockVideo} onClick={mockOnClick} />);
    
    const thumbnail = screen.getByRole('img');
    expect(thumbnail).toHaveAttribute('src', mockVideo.thumbnail_url);
    expect(thumbnail).toHaveAttribute('alt', mockVideo.title);
  });

  test('handles video with no tags', () => {
    const videoWithoutTags = { ...mockVideo, tags: [] };
    const mockOnClick = jest.fn();
    
    render(<VideoCard video={videoWithoutTags} onClick={mockOnClick} />);
    
    // Should not render any tag elements
    expect(screen.queryByText('tutorial')).not.toBeInTheDocument();
  });

  test('formats large view counts correctly', () => {
    const videoWithManyViews = { ...mockVideo, views: 1500000 };
    const mockOnClick = jest.fn();
    
    render(<VideoCard video={videoWithManyViews} onClick={mockOnClick} />);
    
    expect(screen.getByText('1.5M views')).toBeInTheDocument();
  });
});

// Purpose: Unit tests for VideoForm component validation and behavior
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoForm from './VideoForm';

describe('VideoForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements correctly', () => {
    render(
      <VideoForm 
        onSubmit={mockOnSubmit} 
        loading={false}
      />
    );
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create video/i })).toBeInTheDocument();
  });

  test('submits form when title is provided', async () => {
    render(
      <VideoForm 
        onSubmit={mockOnSubmit} 
        loading={false}
      />
    );
    
    const titleInput = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /create video/i });
    
    await userEvent.type(titleInput, 'Test Video Title');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Video Title',
        tags: []
      });
    });
  });

  test('displays form fields with proper labels', () => {
    render(
      <VideoForm 
        onSubmit={mockOnSubmit} 
        loading={false}
      />
    );
    
    expect(screen.getByLabelText(/video title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create video/i })).toBeInTheDocument();
  });

  test('updates form data when title input changes', async () => {
    render(
      <VideoForm 
        onSubmit={mockOnSubmit} 
        loading={false}
      />
    );
    
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    
    await userEvent.type(titleInput, 'New Title');
    
    expect(titleInput.value).toBe('New Title');
  });

  test('shows loading state correctly', () => {
    render(
      <VideoForm 
        onSubmit={mockOnSubmit} 
        loading={true}
      />
    );
    
    const submitButton = screen.getByRole('button', { name: /creating/i });
    expect(submitButton).toBeDisabled();
    expect(screen.getByRole('status')).toBeInTheDocument(); // Loading spinner
  });

  test('populates form with initial data when editing', () => {
    const initialData = {
      title: 'Existing Video',
      tags: ['existing', 'edit']
    };
    
    render(
      <VideoForm 
        onSubmit={mockOnSubmit} 
        loading={false}
        initialData={initialData}
        mode="edit"
      />
    );
    
    expect(screen.getByDisplayValue('Existing Video')).toBeInTheDocument();
    // Tags are displayed as chips, not in the input field
    expect(screen.getByText('existing')).toBeInTheDocument();
    expect(screen.getByText('edit')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update video/i })).toBeInTheDocument();
  });

  test('displays error message when provided', () => {
    render(
      <VideoForm 
        onSubmit={mockOnSubmit} 
        loading={false}
        error="Something went wrong"
      />
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

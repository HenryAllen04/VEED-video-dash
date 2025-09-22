// Purpose: TypeScript type definitions for video-related data structures

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  duration: number; // in seconds
  views: number;
  tags: string[];
}

export interface CreateVideoRequest {
  title: string;
  tags?: string[];
}

export interface VideosResponse {
  videos: Video[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface VideoQuery {
  sort?: 'created_at' | 'title' | 'views';
  order?: 'asc' | 'desc';
  search?: string;
  tags?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

export interface VideoStats {
  total: number;
  totalViews: number;
  averageDuration: number;
}

export interface TagCount {
  tag: string;
  count: number;
}

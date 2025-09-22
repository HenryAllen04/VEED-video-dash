// Purpose: Video data model and type definitions for the VEED Video Library Dashboard
import { z } from 'zod';

// Zod schema for video validation
export const VideoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  thumbnail_url: z.string().url('Invalid thumbnail URL'),
  created_at: z.string().datetime('Invalid date format'),
  duration: z.number().positive('Duration must be positive'),
  views: z.number().nonnegative('Views cannot be negative'),
  tags: z.array(z.string()).default([])
});

// TypeScript type inferred from Zod schema
export type Video = z.infer<typeof VideoSchema>;

// Schema for creating a new video (only required fields)
export const CreateVideoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  tags: z.array(z.string()).optional().default([])
});

export type CreateVideoRequest = z.infer<typeof CreateVideoSchema>;

// Schema for video query parameters
export const VideoQuerySchema = z.object({
  sort: z.enum(['created_at', 'title', 'views']).optional().default('created_at'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().optional(),
  tags: z.string().optional(), // comma-separated tags
  dateFrom: z.string().optional(), // ISO date string
  dateTo: z.string().optional(), // ISO date string
  limit: z.coerce.number().min(1).max(100).optional().default(20),
  offset: z.coerce.number().min(0).optional().default(0)
});

export type VideoQuery = z.infer<typeof VideoQuerySchema>;

// Response types
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

export interface TagCount {
  tag: string;
  count: number;
}

# VEED Video Library Dashboard

A full-stack TypeScript application for managing and browsing video content with filtering, sorting, and creation capabilities.

## 🎯 Project Overview

This application was built as a technical challenge demonstrating clean architecture, type safety, and excellent user experience within a 4-hour development constraint. It enables users to browse videos in a responsive grid layout, apply filters and sorting, and create new video entries.

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type safety across the full stack
- **Zod** - Runtime type validation and schema parsing
- **CORS** - Cross-origin resource sharing middleware

### Development Tools
- **Vite** - Fast build tool and dev server (frontend)
- **ts-node** - TypeScript execution for Node.js
- **Nodemon** - Auto-restart development server
- **ESLint & Prettier** - Code linting and formatting

## 🏗️ Architecture

### Project Structure
```
VEED-video-dash/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Route components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API communication layer
│   │   ├── types/           # TypeScript definitions
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Data models and validation
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Custom middleware
│   │   ├── data/           # JSON data storage
│   │   └── utils/          # Utility functions
│   └── dist/               # Compiled JavaScript
├── videos.json             # Seed data (50+ video entries)
├── Phase1-PRD.md          # Technical specification document
└── README.md              # This file
```

### API Design
- **RESTful endpoints** with consistent response formats
- **Query parameter support** for filtering, sorting, and pagination
- **Zod validation** for runtime type checking
- **Comprehensive error handling** with meaningful messages
- **CORS enabled** for cross-origin requests

### Frontend Architecture
- **Component-based architecture** with clear separation of concerns
- **Custom hooks** for data fetching and state management
- **Type-safe API integration** with shared TypeScript interfaces
- **Responsive design** using Tailwind CSS utilities
- **Error boundaries** and loading states for better UX

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VEED-video-dash
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Start the development servers**

   **Option A: Run both servers simultaneously (recommended)**
   ```bash
   # From the root directory
   cd backend
   npm run dev &
   cd ../frontend
   npm start
   ```

   **Option B: Run servers in separate terminals**
   ```bash
   # Terminal 1 - Backend server
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend server
   cd frontend
   npm start
   ```

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:3001
   - **API Health Check**: http://localhost:3001/health

### Production Build

```bash
# Build backend
cd backend
npm run build
npm start

# Build frontend
cd frontend
npm run build
# Serve the build directory with your preferred static server
```

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Videos
| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/videos` | Get all videos | `sort`, `order`, `search`, `tags`, `limit`, `offset` |
| POST | `/videos` | Create new video | - |
| GET | `/videos/:id` | Get single video | - |
| PUT | `/videos/:id` | Update video | - |
| DELETE | `/videos/:id` | Delete video | - |
| GET | `/videos/stats` | Get video statistics | - |

#### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Basic health check |
| GET | `/health/detailed` | Detailed system information |

### Request/Response Examples

#### Get Videos with Filtering
```bash
GET /api/videos?sort=created_at&order=desc&search=tutorial&limit=10
```

Response:
```json
{
  "success": true,
  "data": {
    "videos": [...],
    "total": 45,
    "page": 1,
    "limit": 10
  }
}
```

#### Create New Video
```bash
POST /api/videos
Content-Type: application/json

{
  "title": "My New Video",
  "tags": ["tutorial", "beginner"]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "v-051",
    "title": "My New Video",
    "thumbnail_url": "https://picsum.photos/seed/v-051/300/200",
    "created_at": "2025-09-22T12:30:00.000Z",
    "duration": 300,
    "views": 0,
    "tags": ["tutorial", "beginner"]
  },
  "message": "Video created successfully"
}
```

## 🎨 Features

### ✅ Implemented Features
- **Video Grid Layout**: Responsive grid displaying videos with title, date, and tags
- **Sorting**: Sort videos by creation date (newest/oldest)
- **Search**: Search videos by title
- **Tag Filtering**: Filter videos by tags
- **Video Creation**: Form to create new video entries with validation
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Smooth loading experiences with skeletons
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Type Safety**: Full TypeScript coverage across frontend and backend

### 🔄 Core User Flows
1. **Browse Videos**: Users see a grid of videos with sorting and filtering options
2. **Search & Filter**: Users can search by title and filter by tags
3. **Create Video**: Users can add new videos with title and optional tags
4. **Responsive Experience**: Smooth experience across all device sizes

## 🏆 Technical Decisions & Trade-offs

### ✅ Decisions Made

#### **JSON File Storage**
- **Why**: Quick setup, no database configuration needed for 4-hour constraint
- **Benefits**: Simple, version-controllable, fast development
- **Trade-off**: Not suitable for production scale, no concurrent write protection

#### **Axios for HTTP Client**
- **Why**: Better error handling and interceptors compared to fetch
- **Benefits**: Consistent API, automatic JSON parsing, request/response interceptors
- **Alternative**: Could use native fetch API to reduce bundle size

#### **Zod for Validation**
- **Why**: Runtime type validation with excellent TypeScript integration
- **Benefits**: Single source of truth for types, great error messages
- **Alternative**: Joi or Yup, but Zod has better TypeScript inference

#### **Tailwind CSS**
- **Why**: Rapid prototyping and consistent design system
- **Benefits**: Utility-first approach, responsive design utilities, small bundle size
- **Trade-off**: Learning curve for developers unfamiliar with utility classes

#### **Component Co-location**
- **Why**: Keep related components, hooks, and utilities close together
- **Benefits**: Better maintainability, easier to find related code
- **Trade-off**: Slightly deeper folder structure

### ⚠️ Known Limitations

1. **File-based Storage**: Not suitable for production; would need database migration
2. **No Authentication**: Open API without user management
3. **Limited Error Recovery**: Some error states could have better recovery options
4. **No Image Upload**: Uses placeholder images instead of real uploads
5. **No Pagination UI**: Backend supports pagination, frontend uses basic loading

## 🚀 Future Improvements

### High Priority (Next Sprint)
- **Database Migration**: Move from JSON to PostgreSQL/MongoDB with Prisma ORM
- **Image Upload**: Implement real thumbnail upload with cloud storage
- **Pagination UI**: Add proper pagination controls to the video grid
- **Advanced Filtering**: Date range filters, multiple tag selection
- **Error Boundaries**: More granular error handling with recovery options

### Medium Priority
- **Authentication**: User management and protected routes
- **Video Player**: Integrate actual video playback functionality
- **Bulk Operations**: Select multiple videos for bulk actions
- **Search Improvements**: Fuzzy search, search suggestions
- **Performance**: Virtual scrolling for large video lists

### Low Priority (Polish)
- **Dark Mode**: Theme switching functionality
- **Keyboard Navigation**: Full keyboard accessibility
- **Offline Support**: Service worker for offline functionality
- **Analytics**: Track user interactions and popular videos
- **Export/Import**: Backup and restore video libraries

## 🧪 Testing Strategy

### Current Testing
- **API Endpoint Testing**: Basic validation and error handling tests
- **Component Testing**: Key React components with React Testing Library
- **Type Safety**: Full TypeScript coverage prevents runtime type errors

### Future Testing Improvements
- **E2E Testing**: Playwright/Cypress for critical user journeys
- **Integration Testing**: Full API integration tests with test database
- **Visual Regression**: Screenshot testing for UI consistency
- **Performance Testing**: Load testing for API endpoints

## 🔧 Development

### Available Scripts

#### Backend
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server
npm run typecheck   # Type check without building
npm run clean       # Remove dist directory
```

#### Frontend
```bash
npm start           # Start development server
npm run build       # Build for production
npm test            # Run test suite
npm run eject       # Eject from Create React App (irreversible)
```

### Code Quality
- **ESLint**: Configured for TypeScript and React best practices
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict mode enabled for maximum type safety
- **Git Hooks**: Pre-commit hooks for linting and formatting (future)

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

#### TypeScript Compilation Errors
```bash
# Clear TypeScript cache
cd backend
rm -rf dist node_modules/.cache
npm run build
```

#### CORS Issues
- Ensure backend is running on port 3001
- Frontend should proxy API requests correctly
- Check CORS configuration in `backend/src/app.ts`

### Getting Help
- Check the console for detailed error messages
- Verify both servers are running on correct ports
- Ensure all dependencies are installed (`npm install`)

## 📄 License

This project was created for the VEED technical challenge. All rights reserved.

---

**Built with ❤️ for VEED by [Your Name]**

*Total development time: ~4 hours*

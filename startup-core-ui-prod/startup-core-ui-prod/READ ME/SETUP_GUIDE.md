# Local Development Setup Guide - Startup Core UI

## Overview
This is a **frontend-only** React application built with TypeScript and Vite. The project connects to a backend REST API that handles all database operations with MariaDB. This guide will help you set up the local environment and prepare for backend integration.

---

## 🔍 Project Analysis

### Technology Stack
- **Frontend Framework:** React 18.2.0 + TypeScript 4.9.3
- **Build Tool:** Vite 4.1.0
- **Styling:** TailwindCSS 3.2.7
- **State Management:** React Query (TanStack Query) 4.24.10
- **HTTP Client:** Axios 1.3.4
- **Form Management:** Formik 2.2.9 + Yup 1.0.0
- **UI Components:** Headless UI, React Icons, React Select
- **Containerization:** Docker with Node 16.13.0

### Backend API Integration
The frontend communicates with a REST API backend through these endpoints:
- `/api/v2/administrator/*` - Main administrative operations
- `/api/mng/*` - Management operations

### Database Connection
⚠️ **Important:** This frontend does **NOT** directly connect to MariaDB. The database connection is handled by the backend API server (not included in this repository).

---

## 📋 Prerequisites

### Required Software (Windows 10/11)
1. **Node.js** - Version 16.13.0 or higher
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Git** (optional but recommended)
   - Download: https://git-scm.com/download/win

3. **Docker Desktop** (optional, for containerized deployment)
   - Download: https://www.docker.com/products/docker-desktop/
   - Enable WSL 2 backend for better performance

4. **Visual Studio Code** (already installed)
   - Extensions recommended:
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense
     - TypeScript Vue Plugin (Volar)

---

## 🚀 Setup Instructions

### Step 1: Project Initialization

```bash
# Navigate to project directory (already done)
cd "c:\Users\azhyg\Documents\Startup Website\Start up source code\startup-core-ui-prod\startup-core-ui-prod"

# Install dependencies
npm install

# This will install all packages listed in package.json
```

### Step 2: Environment Configuration

Create a `.env` file based on `.env.dist`:

```bash
# Copy the template
copy .env.dist .env
```

Edit the `.env` file with the following configuration:

```env
# Backend API Endpoint (CRITICAL - must match your backend server)
VITE_WS_ENDPOINT=http://localhost:8000

# Uploadcare Public Key (for file uploads)
VITE_UCARE_PUBKEY=your_uploadcare_public_key_here

# Docker Compose Settings (if using Docker)
COMPOSE_PROJECT_NAME=start-up-core
COMPOSE_WEBSERVER_PORT=3000
```

**Environment Variables Explained:**

- **`VITE_WS_ENDPOINT`**: The base URL of your backend API server
  - Development: `http://localhost:8000` (adjust port as needed)
  - Staging: `https://api-staging.yourdomain.com`
  - Production: `https://api.yourdomain.com`

- **`VITE_UCARE_PUBKEY`**: Your Uploadcare public key for file uploads
  - Sign up at: https://uploadcare.com/
  - Get your public key from the dashboard

### Step 3: Development Server Setup

#### Option A: Local Development (Recommended for Development)

```bash
# Start the development server
npm run dev

# The server will start at http://localhost:5173 (Vite default)
# Open your browser and navigate to this URL
```

**Development Features:**
- Hot Module Replacement (HMR)
- Fast refresh on file changes
- TypeScript type checking
- ESLint integration

#### Option B: Docker Development

```bash
# Build and start the Docker container
docker-compose up --build

# The application will be available at http://localhost:3000
# (or the port specified in COMPOSE_WEBSERVER_PORT)

# To stop the container:
docker-compose down
```

### Step 4: Build for Production

```bash
# Build the application
npm run build

# This creates an optimized production build in the 'dist' folder

# Preview the production build locally
npm run preview
```

---

## 🗄️ Database & Backend Integration

### Current State
- **Frontend:** React application (this repository)
- **Backend:** Separate API server (not included, to be provided)
- **Database:** MariaDB (managed by backend)

### Backend Requirements

The backend API server must provide the following:

1. **Authentication Endpoints:**
   ```
   POST /api/v2/administrator/authenticate
   POST /api/v2/administrator/two_factor_authenticate
   ```

2. **CORS Configuration:**
   - Allow requests from frontend origin (http://localhost:5173 for dev)
   - Allow credentials (for cookie-based sessions if used)

3. **Response Format:**
   ```json
   {
     "data": {...},
     "message": "Success message",
     "errors": {...}
   }
   ```

4. **Authentication:**
   - Bearer token authentication
   - Token format: `Bearer <token>`
   - Token stored in localStorage under key `session`

### Database Preparation Checklist

When the backend and database dump are provided:

#### ✅ Backend Setup Tasks
1. [ ] Install backend dependencies (Node.js/PHP/Laravel based on backend tech)
2. [ ] Configure backend `.env` file with database credentials
3. [ ] Set up MariaDB connection parameters
4. [ ] Run database migrations
5. [ ] Seed initial data (if seeders provided)
6. [ ] Start backend API server
7. [ ] Verify API endpoints are accessible

#### ✅ Database Configuration

**MariaDB Connection Parameters:**
```env
# Backend .env file (not frontend)
DB_CONNECTION=mysql  # Use 'mysql' driver for MariaDB
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=startup_core
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

**Important Notes:**
- MariaDB is MySQL-compatible, use the `mysql` driver
- No code changes needed when switching from MySQL to MariaDB
- Ensure MariaDB version compatibility (10.x recommended)

#### ✅ MariaDB vs MySQL Compatibility

**Good News:** MariaDB is a drop-in replacement for MySQL. No changes needed for:
- SQL syntax
- Connection drivers
- ORM configurations (if using Laravel Eloquent or TypeORM)

**Potential Considerations:**
- MariaDB 10.5+ has better JSON support
- Some stored procedures might need minor adjustments
- Character set and collation should match (utf8mb4_unicode_ci recommended)

---

## 🧪 Testing & Verification

### Step 1: Verify Frontend Setup

```bash
# Run linter to check code quality
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Start development server
npm run dev
```

**Expected Result:**
- No TypeScript errors
- Dev server starts successfully
- Can access http://localhost:5173
- Login page displays correctly

### Step 2: Backend Integration Testing

Once backend is available:

1. **Update Frontend `.env`:**
   ```env
   VITE_WS_ENDPOINT=http://localhost:8000
   ```

2. **Restart Frontend Dev Server:**
   ```bash
   npm run dev
   ```

3. **Test Authentication:**
   - Navigate to login page
   - Enter test credentials
   - Check browser DevTools Network tab
   - Verify API requests to `/api/v2/administrator/authenticate`
   - Confirm successful login and token storage

4. **Test API Connectivity:**
   - After login, navigate to different pages
   - Monitor Network tab for API calls
   - Check for CORS errors (should be none if backend configured correctly)
   - Verify data loads from backend

### Step 3: Database Migration Testing

When database dump is provided:

```bash
# On backend server/database server:

# 1. Create database
mysql -u root -p
CREATE DATABASE startup_core CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;

# 2. Import database dump
mysql -u root -p startup_core < database_dump.sql

# 3. Verify import
mysql -u root -p startup_core
SHOW TABLES;
SELECT COUNT(*) FROM users;  # or any main table
exit;

# 4. Update backend database configuration
# Edit backend .env file with correct credentials

# 5. Test backend connection
# Run backend server
# Check logs for successful database connection
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. **CORS Errors**
**Symptom:** Browser console shows CORS policy errors

**Solution:**
```javascript
// Backend must allow CORS (example for Express.js)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// For Laravel backend in config/cors.php
'allowed_origins' => ['http://localhost:5173'],
'supports_credentials' => true,
```

#### 2. **Network Request Failed**
**Symptom:** API requests fail with network errors

**Solution:**
- Verify backend server is running
- Check `VITE_WS_ENDPOINT` in `.env`
- Ensure no firewall blocking
- Test API with Postman/Insomnia

#### 3. **Module Not Found Errors**
**Symptom:** Import errors during development

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. **Port Already in Use**
**Symptom:** Dev server won't start

**Solution:**
```bash
# Find process using port 5173
netstat -ano | findstr :5173

# Kill the process (Windows)
taskkill /PID <process_id> /F

# Or use different port
npm run dev -- --port 5174
```

#### 5. **TypeScript Errors**
**Symptom:** Build fails with type errors

**Solution:**
```bash
# Check TypeScript errors
npm run lint

# Fix automatically when possible
npm run lint:fix

# Update type definitions
npm update @types/react @types/react-dom
```

---

## 📁 Project Structure

```
startup-core-ui-prod/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── metacover.jpg
├── src/
│   ├── assets/            # Images, styles
│   ├── components/        # Reusable React components
│   ├── context/           # React Context providers
│   ├── features/          # Feature-based modules
│   │   ├── authentication/
│   │   ├── dashboard/
│   │   ├── user-management/
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layouts
│   ├── lib/               # Third-party integrations
│   │   ├── react-query/
│   │   └── ws/            # API service layer
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   ├── ui/                # UI components
│   ├── utils/             # Utility functions
│   ├── validations/       # Form validation schemas
│   ├── App.tsx            # Root component
│   └── main.tsx           # Application entry point
├── .env                   # Environment variables (create this)
├── .env.dist              # Environment template
├── docker-compose.yml     # Docker configuration
├── Dockerfile             # Docker image definition
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── tailwind.config.cjs    # Tailwind CSS configuration
```

---

## 🔐 Security Considerations

### Frontend Security
1. **Environment Variables:**
   - Never commit `.env` file to git
   - Use `.env.dist` as template only
   - Keep API keys secure

2. **Authentication:**
   - Tokens stored in localStorage
   - Automatic logout on 401 errors
   - Two-factor authentication support

3. **Input Sanitization:**
   - Uses DOMPurify for HTML sanitization
   - Formik + Yup for form validation

### Backend Security (when setting up)
1. **Database:**
   - Use strong passwords
   - Limit database user permissions
   - Enable SSL for database connections in production

2. **API:**
   - Implement rate limiting
   - Use HTTPS in production
   - Validate all inputs server-side
   - Implement proper CORS policies

---

## 📝 Development Workflow

### Daily Development

```bash
# 1. Pull latest changes (if using git)
git pull

# 2. Install any new dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Make your changes
# 5. Test locally

# 6. Before committing, run linter
npm run lint:fix

# 7. Build to verify production bundle
npm run build
```

### Code Quality

```bash
# Lint TypeScript files
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Type checking without emitting files
tsc --noEmit
```

---

## 📞 Next Steps & Support

### Immediate Actions
1. ✅ **Complete Environment Setup**
   - Install Node.js if not already installed
   - Run `npm install`
   - Create `.env` file
   - Start dev server with `npm run dev`

2. ⏳ **Wait for Backend Delivery**
   - Request backend codebase
   - Request database dump file
   - Request API documentation
   - Request backend environment variables

3. 🔄 **Backend Integration**
   - Set up backend server
   - Import database dump
   - Configure database connection
   - Test API endpoints
   - Update frontend `VITE_WS_ENDPOINT`

### When Backend is Provided

Create a checklist to work through:

```markdown
## Backend Integration Checklist

### Backend Setup
- [ ] Received backend codebase
- [ ] Identified backend technology (Node.js/PHP/Laravel/etc.)
- [ ] Installed backend dependencies
- [ ] Reviewed backend documentation
- [ ] Configured backend `.env` file

### Database Setup
- [ ] Received database dump file
- [ ] Installed MariaDB locally
- [ ] Created database with proper charset
- [ ] Imported database dump successfully
- [ ] Verified all tables imported
- [ ] Created database user with appropriate permissions
- [ ] Updated backend database credentials

### API Testing
- [ ] Started backend server
- [ ] Verified backend is running (check logs)
- [ ] Tested API endpoint with Postman/curl
- [ ] Confirmed CORS is configured
- [ ] Updated frontend `.env` with backend URL

### Integration Testing
- [ ] Started frontend dev server
- [ ] Accessed login page
- [ ] Tested authentication flow
- [ ] Verified token storage
- [ ] Navigated through different pages
- [ ] Confirmed data loads from backend
- [ ] Tested CRUD operations
- [ ] Checked for console errors

### Production Preparation
- [ ] Build frontend for production
- [ ] Test production build locally
- [ ] Document deployment process
- [ ] Prepare environment variables for production
- [ ] Set up CI/CD pipeline (if needed)
```

---

## 🎯 Summary

### What You Have
- ✅ Frontend React application with TypeScript
- ✅ Docker configuration for containerized deployment
- ✅ Comprehensive UI components and features
- ✅ API integration layer (axios + react-query)
- ✅ Authentication system (login + 2FA)
- ✅ Form validation and state management

### What You Need
- ⏳ Backend API server (Laravel/Node.js/other)
- ⏳ MariaDB database dump
- ⏳ Backend API documentation
- ⏳ Backend environment configuration

### Ready to Go
1. Frontend development environment is ready
2. Can start frontend development/customization now
3. Prepared for backend integration
4. Database migration plan documented

---

## 📚 Additional Resources

- **Vite Documentation:** https://vitejs.dev/
- **React Documentation:** https://react.dev/
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **TailwindCSS:** https://tailwindcss.com/docs
- **React Query:** https://tanstack.com/query/latest
- **MariaDB Documentation:** https://mariadb.org/documentation/

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Author:** Cline AI Assistant

For questions or issues, refer to this document or check the troubleshooting section.

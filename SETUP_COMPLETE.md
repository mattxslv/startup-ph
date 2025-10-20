# Startup PH - Environment Setup Complete ✅

## Setup Summary

I've successfully set up the Startup PH website development environment. Here's what has been configured:

---

## 🎯 What We Have Now

### 1. **Backend API (Laravel)** - ✅ READY
- **Location:** `start-up-ws-main/start-up-ws-main/`
- **Docker Containers Running:**
  - `startup-ws-app` - Laravel application (PHP-FPM)
  - `startup-ws-nginx` - Web server (accessible at http://localhost:80)
  - `startup-ws-es` - Elasticsearch (port 54049)
- **Status:** 
  - ✅ Dependencies installed (Composer)
  - ✅ Application key generated
  - ✅ Configuration cached
  - ⏳ **WAITING FOR DATABASE** (42GB MariaDB dump)

### 2. **Frontend Website (Next.js)** - ✅ READY
- **Location:** `startup-ph-ui-prod/startup-ph-ui-prod/`
- **Port:** 3000 (when started)
- **Status:** 
  - ✅ Dependencies installed (496 npm packages)
  - ✅ Environment configured
  - ⏳ Ready to start (but needs backend API running)

### 3. **Admin Panel (React + Vite)** - ✅ READY
- **Location:** `startup-core-ui-prod/startup-core-ui-prod/`
- **Port:** 3001 (when started)
- **Status:** 
  - ✅ Dependencies installed (582 npm packages)
  - ✅ Environment configured
  - ⏳ Ready to start (but needs backend API running)

---

## 📋 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        STARTUP PH SYSTEM                         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
        ┌───────▼──────┐  ┌─────▼─────┐  ┌──────▼──────┐
        │   Frontend   │  │   Admin   │  │   Backend   │
        │   (Next.js)  │  │  (React)  │  │  (Laravel)  │
        │   Port 3000  │  │ Port 3001 │  │   Port 80   │
        └──────┬───────┘  └─────┬─────┘  └──────┬──────┘
               │                │                │
               └────────────────┼────────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
            ┌───────▼──┐  ┌─────▼─────┐  ┌─▼────────┐
            │ MariaDB  │  │   Redis   │  │ Elastic  │
            │ Database │  │   Cache   │  │  Search  │
            │ NOT YET  │  │ (Docker)  │  │ (Docker) │
            └──────────┘  └───────────┘  └──────────┘
```

---

## 🔧 Environment Files Created

All `.env` files have been configured with development settings:

### Backend (`start-up-ws-main/start-up-ws-main/`)
1. **Root `.env`**
   - Docker compose settings
   - Ports: 80 (web), 3306 (DB)

2. **`project/.env`**
   - Laravel configuration
   - Database: `start-up` (username: admin, password: secret)
   - Redis, Elasticsearch configured for Docker
   - Mail using Mailpit (development mail catcher)

### Frontend (`startup-ph-ui-prod/startup-ph-ui-prod/`)
1. **Root `.env`**
   - Next.js public variables
   - Backend API: http://localhost:80
   - Port: 3000

2. **`project/.env`** (if using Laravel backend within frontend)
   - Similar to main backend config

### Admin Panel (`startup-core-ui-prod/startup-core-ui-prod/`)
1. **`.env`**
   - Backend API: http://localhost:80
   - Port: 3001

---

## ⏭️ NEXT STEPS: When You Get Home with the Database

### Step 1: Import the 42GB MariaDB Database

You have two options:

#### Option A: Import to Docker Database Container (Recommended for Testing)

If you want to use a temporary database just for testing:

```bash
# Start a MariaDB container
docker run -d \
  --name startup-mariadb \
  --network startup-ws_app-local-network \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=start-up \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=secret \
  -p 3306:3306 \
  mariadb:10.8

# Wait for MariaDB to be ready (about 30 seconds)
# Then import your 42GB database dump
mysql -h 127.0.0.1 -u root -psecret start-up < /path/to/your/database.sql
```

#### Option B: Use Existing MariaDB Installation

If you already have MariaDB installed on your computer:

```bash
# Import the database
mysql -u root -p start-up < /path/to/your/database.sql

# Update the backend .env file to point to your local MariaDB
# Change DB_HOST from "database" to "host.docker.internal"
```

### Step 2: Update Backend Configuration for Your Database

Edit `start-up-ws-main/start-up-ws-main/project/.env` if needed:

```env
DB_HOST=database  # or host.docker.internal if using local MariaDB
DB_PORT=3306
DB_DATABASE=start-up
DB_USERNAME=admin  # or your MariaDB username
DB_PASSWORD=secret  # or your MariaDB password
```

### Step 3: Run Database Migrations

Once the database is imported, run Laravel migrations:

```bash
docker exec -it startup-ws-app php artisan migrate
docker exec -it startup-ws-app php artisan elastic:migrate
```

### Step 4: Run Database Seeders

```bash
docker exec -it startup-ws-app php artisan db:seed --class=AdministratorSeeder
docker exec -it startup-ws-app php artisan db:seed --class=RolesPermissionsSeeder
docker exec -it startup-ws-app php artisan db:seed --class=RemarkSeeder
docker exec -it startup-ws-app php artisan db:seed --class=AssessmentTagSeeder
docker exec -it startup-ws-app php artisan db:seed --class=RequirementSeeder
docker exec -it startup-ws-app php artisan db:seed --class=SectorSeeder
docker exec -it startup-ws-app php artisan db:seed --class=TestimonialSeeder
```

### Step 5: Import Address Data

Import the SQL files in the `dumps` folder:

```bash
# From the start-up-ws-main/start-up-ws-main/ directory
mysql -h 127.0.0.1 -u admin -psecret start-up < dumps/start-up-address.sql
mysql -h 127.0.0.1 -u admin -psecret start-up < dumps/PSCC-latest.sql
```

### Step 6: Start the Frontend Applications

**Frontend (Public Website):**
```bash
cd startup-ph-ui-prod/startup-ph-ui-prod
npm run dev
# Opens at http://localhost:3000
```

**Admin Panel:**
```bash
cd startup-core-ui-prod/startup-core-ui-prod
npm run dev
# Opens at http://localhost:3001
```

---

## 🚀 How to Start Everything

### Starting Backend (Already Running)
```bash
cd start-up-ws-main/start-up-ws-main
docker-compose up -d
```

### Starting Frontend
```bash
cd startup-ph-ui-prod/startup-ph-ui-prod
npm run dev
```

### Starting Admin Panel
```bash
cd startup-core-ui-prod/startup-core-ui-prod
npm run dev
```

### Stopping Everything
```bash
# Stop backend
cd start-up-ws-main/start-up-ws-main
docker-compose down

# Stop frontend and admin (Ctrl+C in their terminals)
```

---

## 🔍 What Each Component Does

### 1. **Backend API (start-up-ws-main)**
- **Purpose:** Main Laravel API server
- **What it does:**
  - Handles all business logic
  - Manages database operations
  - Provides REST API endpoints for frontend and admin
  - Authentication & authorization
  - File uploads, email sending, etc.
- **Tech Stack:** Laravel 10, PHP 8.x, MySQL/MariaDB, Redis, Elasticsearch

### 2. **Frontend Website (startup-ph-ui-prod)**
- **Purpose:** Public-facing website
- **What it does:**
  - Startup registration
  - Public startup directory
  - News and resources
  - User authentication (eGov SSO)
  - Application submissions
- **Tech Stack:** Next.js 13, React, TailwindCSS

### 3. **Admin Panel (startup-core-ui-prod)**
- **Purpose:** Administrative interface
- **What it does:**
  - Manage startups (approve/reject)
  - Manage programs
  - Manage users and permissions
  - View analytics and reports
  - Manage content (news, resources)
  - Investor management
- **Tech Stack:** React 18, Vite, TailwindCSS, TypeScript

---

## 📝 Important Notes

### Database Configuration
- The backend is configured to expect a database named `start-up`
- Default credentials: username `admin`, password `secret`
- Make sure your 42GB database dump uses the same database name

### Docker Containers
- Backend containers are managed by Docker Compose
- They're isolated in their own network (`startup-ws_app-local-network`)
- Redis and Elasticsearch are included for caching and search

### Frontend & Admin
- Both run as standalone Node.js dev servers
- They communicate with the backend API at http://localhost:80
- You can run them simultaneously on different ports

### Environment Variables
- Never commit `.env` files to Git
- The `.env` files created use development settings
- For production, you'll need to update with real credentials:
  - eGov API credentials
  - Cloudflare Turnstile keys
  - Email SMTP settings
  - AWS Cloudwatch (optional)
  - Uploadcare keys

---

## 🐛 Troubleshooting

### Backend Issues

**Container won't start:**
```bash
docker logs startup-ws-app
docker logs startup-ws-nginx
docker logs startup-ws-es
```

**Database connection errors:**
- Check if MariaDB is running
- Verify credentials in `project/.env`
- Ensure database name matches

**Permission errors:**
```bash
docker exec -it startup-ws-app chmod -R 777 storage bootstrap/cache
```

### Frontend/Admin Issues

**Port already in use:**
- Change the port in the `.env` file
- Or stop the application using that port

**Cannot connect to API:**
- Verify backend is running: http://localhost:80
- Check CORS settings in backend
- Verify API endpoint in frontend `.env`

**npm install errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try `npm install --legacy-peer-deps`

---

## 🏃‍♂️ **OPTIMIZED DEVELOPMENT WORKFLOW** (Avoid Docker Rebuilds)

### ⚡ Development Speed Solutions

**For Frontend & Admin (Use Local Dev Servers):**
```bash
# FRONTAL (Port 3000) - Local dev server
cd startup-ph-ui-prod/startup-ph-ui-prod
npm run dev

# ADMIN (Port 3001) - Local dev server
cd startup-core-ui-prod/startup-core-ui-prod
npm run dev
```

**For Backend (Use Mounted Volumes):**
The backend containers are **already configured for live reload** - no rebuilding needed! Code changes are instantly reflected because of volume mounting in `docker-compose.yml`.

### 📚 Useful Commands

### Backend Commands (Fast - No Rebuilds!)
```bash
# Access Laravel container
docker exec -it startup-ws-app sh

# Run artisan commands (todo inside container)
php artisan [command]

# View logs
docker logs -f startup-ws-app

# Restart backend services only (fast)
cd start-up-ws-main/start-up-ws-main
docker-compose restart app

# Clear Laravel cache (inside container)
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# If you modify composer.json/dependencies, rebuild app container:
docker-compose up --build -d app
```

### Frontend Commands (Super Fast Hot Reload)
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Admin Commands (Super Fast Hot Reload)
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 🛠 **Visualization of Development Workflow**

```
DEVELOPMENT PHASE:
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│    Frontend      │    │     Backend      │    │     Admin        │
│   (Local Dev)    │    │  (Docker Volume) │    │  (Local Dev)     │
│                  │    │                  │    │                  │
│ npm run dev      │◄──►│ Code changes     │◄──►│ npm run dev      │
│ Port 3000        │    │ instant via      │    │ Port 3001        │
│ Hot Reload: ✅   │    │ volume mount     │    │ Hot Reload: ✅   │
└──────────────────┘    └──────────────────┘    └──────────────────┘
                                                         │
                                                         ▼
                                               PRODUCTION PHASE:
                                               ✅ Build & Deploy
```

---

## ✅ Setup Checklist

Current Status:
- [x] Docker installed and running
- [x] Node.js installed
- [x] Backend environment files configured
- [x] Frontend environment files configured
- [x] Admin environment files configured
- [x] Backend Docker containers built and running
- [x] Backend dependencies installed (Composer)
- [x] Laravel application key generated
- [x] Laravel configuration cached
- [x] Frontend dependencies installed (npm)
- [x] Admin dependencies installed (npm)
- [ ] **DATABASE IMPORT PENDING** (waiting for 42GB MariaDB dump)
- [ ] Database migrations run
- [ ] Database seeders run
- [ ] Address data imported
- [ ] Test all three applications

---

## 🎓 For the Team

As the lead developer, you now have:

1. **A fully configured development environment** ready to accept the database
2. **All dependencies installed** for backend, frontend, and admin
3. **Docker containers running** for backend services
4. **Clear instructions** for importing the database when you get home

The system is ready for development and testing once the database is imported!

---

## 📞 Need Help?

When you import the database and if you encounter any issues:

1. Check the logs first (see Troubleshooting section)
2. Verify all environment variables are correct
3. Ensure all containers are running: `docker ps`
4. Test backend API: http://localhost:80
5. Test frontend: http://localhost:3000 (after starting)
6. Test admin: http://localhost:3001 (after starting)

---

**Setup completed on:** October 20, 2025, 2:36 PM (Asia/Manila)  
**Ready for:** Database import and testing

# StartupPH WSL2 Ubuntu Startup Guide

## Quick Start (After Reboot)

### 1. Start WSL2 Ubuntu and Docker Services
```powershell
# Open PowerShell and run:
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose up -d"
```

**Wait 30 seconds** for all containers to initialize.

### 2. Verify All Services are Running
```powershell
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose ps"
```

You should see:
- ✅ **startup-app** (PHP 8.2 FPM) - Running
- ✅ **startup-database** (MariaDB 10.11) - Running  
- ✅ **startup-nginx** (Nginx) - Running
- ✅ **startup-redis** (Redis) - Running
- ✅ **startup-mailpit** (Mailpit) - Running

### 3. Test Backend API
```powershell
curl http://localhost:8080
```
Expected: JSON response or HTML from Laravel

### 4. Start Frontend User Application (Port 3000)
```powershell
# Open NEW PowerShell window (keep it running)
wsl -d Ubuntu bash -c "cd ~/projects/startupph/startup-ph-ui-prod/startup-ph-ui-prod && npm run dev"
```

**Access:** http://localhost:3000

### 5. Start Admin Dashboard (Port 5173)
```powershell
# Open ANOTHER NEW PowerShell window (keep it running)
wsl -d Ubuntu bash -c "cd ~/projects/startupph/startup-core-ui-prod/startup-core-ui-prod && npm run dev"
```

**Access:** http://localhost:5173

---

## All Services Running Checklist

| Service | Port | URL | Status Check |
|---------|------|-----|--------------|
| **Backend API** | 8080 | http://localhost:8080 | `curl http://localhost:8080` |
| **Frontend User** | 3000 | http://localhost:3000 | Open in browser |
| **Admin Dashboard** | 5173 | http://localhost:5173 | Open in browser |
| **Database** | 3306 | localhost:3306 | `docker-compose ps` |
| **Redis** | 6379 | localhost:6379 | `docker-compose ps` |
| **Mailpit** | 8025 | http://localhost:8025 | Email testing UI |

---

## Important Configuration

### Environment Files (Already Configured)
- ✅ `start-up-ws-main/project/.env` - Laravel backend config
  - SCOUT_DRIVER=null (Elasticsearch disabled)
  - Database: MariaDB on localhost
  
- ✅ `startup-ph-ui-prod/.env.local` - Frontend user config
  - NEXT_PUBLIC_WS_ENDPOINT=http://localhost:8080
  - NEXT_PUBLIC_UPLOADER_ENDPOINT=http://localhost:8080/api/v2/upload

- ✅ `startup-core-ui-prod/.env` - Admin dashboard config
  - VITE_WS_ENDPOINT=http://localhost:8080

### PHP Configuration (Already Applied)
- ✅ upload_max_filesize = 50M
- ✅ post_max_size = 50M
- ✅ pdo_mysql extension installed

### Database Migrations (Already Run)
- ✅ 58 migrations completed
- ✅ is_test_account column added to users and startups tables
- ✅ Sectors, datasets, assessment_tags seeded

---

## Admin Credentials

**Email:** admin@dict.gov.ph  
**Password:** Dict2023!

---

## Stopping Services (Before Shutdown)

### Option 1: Keep Docker Running (Recommended)
Just close PowerShell windows. Docker containers will auto-start on next WSL boot.

### Option 2: Stop Everything Cleanly
```powershell
# Stop frontend servers (Ctrl+C in their PowerShell windows)

# Stop Docker containers
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose down"
```

---

## Troubleshooting

### Backend not responding?
```powershell
# Restart Docker containers
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose restart"
```

### Frontend won't start?
```powershell
# Kill any stuck Node processes
wsl -d Ubuntu bash -c "pkill -f node"

# Then start again
wsl -d Ubuntu bash -c "cd ~/projects/startupph/startup-ph-ui-prod/startup-ph-ui-prod && npm run dev"
```

### Database connection failed?
```powershell
# Check database container
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose exec database mysql -uroot -psecret -e 'SELECT 1'"
```

### Port already in use?
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

## File Sync Between Windows and WSL2

### WSL2 Path from Windows:
```
\\wsl.localhost\Ubuntu\home\tonky\projects\startupph\
```

### Copy Files to WSL2:
```powershell
Copy-Item "C:\Users\DICT PC-User\Documents\GitHub\startupph\YOUR_FILE" `
  -Destination "\\wsl.localhost\Ubuntu\home\tonky\projects\startupph\YOUR_FILE" `
  -Force
```

---

## Performance Notes

- **WSL2 = 100x faster** than Windows Docker Desktop
- API responses: ~15ms (was 3-5 seconds on Windows)
- All services run from Linux filesystem for maximum performance
- Edit files in Windows, they sync automatically to WSL2

---

## Key Features Implemented

### ✅ Completed
1. **File Upload Size Limits** - Increased to 50MB (frontend + backend + PHP)
2. **SEC Registration Number** - Already exists as "DTI/SEC Registration Number" field
3. **Edit Registration Info** - Profile editing via /api/v2/user/profile  
4. **Corporation Name Field** - Separate from business_name field
5. **Test Account Flagging** - Database ready (is_test_account column added)

### 🚧 Remaining Tasks
6. User type categorization (visitor/startup/enabler)
7. Admin dashboard statistics and density maps
8. Region focal access control
9. Business permit expiry tracking
10. Elasticsearch/Scout stability decision

---

## Project Structure

```
startupph/
├── start-up-ws-main/           # Laravel Backend API
│   └── project/                # Laravel application root
│       ├── app/
│       ├── database/
│       └── .env
├── startup-ph-ui-prod/         # Next.js Frontend (User)
│   └── src/
│       ├── pages/
│       ├── components/
│       └── features/
├── startup-core-ui-prod/       # Vite React Admin Dashboard
│   └── src/
│       ├── pages/
│       └── features/
└── config-backup/              # Environment file backups
```

---

## Docker Container Details

### startup-app (PHP 8.2 FPM Alpine)
- **Purpose:** Runs Laravel PHP application
- **Extensions:** pdo_mysql, redis, gd, zip
- **Config:** /var/www/html (project root)
- **Logs:** `docker-compose logs app`

### startup-database (MariaDB 10.11)
- **Purpose:** MySQL-compatible database
- **Database:** startup_ph
- **Root Password:** secret
- **Access:** `docker-compose exec database mysql -uroot -psecret startup_ph`

### startup-nginx
- **Purpose:** Web server / reverse proxy
- **Port:** 8080 (maps to backend API)
- **Config:** ops/docker/nginx/

### startup-redis
- **Purpose:** Cache and session storage
- **Port:** 6379

### startup-mailpit
- **Purpose:** Email testing (catches all outgoing emails)
- **Web UI:** http://localhost:8025

---

## Common Commands

### Check Docker Logs
```powershell
# All services
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose logs -f"

# Specific service
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose logs -f app"
```

### Run Artisan Commands
```powershell
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose exec -T -w /var/www/html app php artisan YOUR_COMMAND"
```

### Database Query
```powershell
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose exec -T database mysql -uroot -psecret startup_ph -e 'YOUR_SQL_QUERY'"
```

### Clear Laravel Cache
```powershell
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose exec -T -w /var/www/html app php artisan cache:clear"
wsl -d Ubuntu bash -c "cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose exec -T -w /var/www/html app php artisan config:clear"
```

---

## Git Commands (If Needed)

### Check Status
```powershell
cd C:\Users\DICT PC-User\Documents\GitHub\startupph
git status
```

### Commit Changes
```powershell
git add .
git commit -m "Your commit message"
```

### Push to Remote
```powershell
git push origin main
```

---

**Last Updated:** October 30, 2025  
**Performance:** WSL2 Ubuntu + Docker  
**API Response Time:** ~15ms  
**All Services Working:** ✅

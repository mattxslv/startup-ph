# StartupPH - New Machine Setup Guide

## Quick Setup (Automated)

### Prerequisites
1. **Docker Desktop** - https://www.docker.com/products/docker-desktop
2. **Node.js** (v14+) - https://nodejs.org/
3. **Git** - https://git-scm.com/download/win

### Automated Setup Steps

1. **Clone the repository:**
   ```powershell
   cd Documents\GitHub
   git clone https://github.com/DICT-ORG/startupph.git
   cd startupph
   ```

2. **Run the setup script:**
   ```powershell
   .\SETUP_NEW_MACHINE.ps1
   ```

3. **Start the frontend:**
   ```powershell
   cd startup-ph-ui-prod\startup-ph-ui-prod
   npm run dev -- -p 3001
   ```

4. **Access the application:**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:8080

---

## Manual Setup (If Script Fails)

### Backend Setup

1. **Navigate to backend folder:**
   ```powershell
   cd start-up-ws-main\start-up-ws-main
   ```

2. **Start Docker containers:**
   ```powershell
   docker-compose up -d
   ```

3. **Import database:**
   ```powershell
   .\import-database.ps1
   # OR manually:
   # Get-Content .\dumps\PSCC-latest.sql | docker exec -i start-up-ws-mysql mysql -u root -proot start_up
   ```

4. **Remove PM2 workers (IMPORTANT):**
   ```powershell
   docker exec start-up-ws-app pm2 delete all
   docker exec start-up-ws-app pm2 save --force
   ```

5. **Clear Laravel caches:**
   ```powershell
   docker exec start-up-ws-app php artisan config:clear
   docker exec start-up-ws-app php artisan route:clear
   docker exec start-up-ws-app php artisan view:clear
   ```

### Frontend Setup

1. **Navigate to frontend folder:**
   ```powershell
   cd startup-ph-ui-prod\startup-ph-ui-prod
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Create .babelrc file (REQUIRED for Windows):**
   ```powershell
   echo '{"presets": ["next/babel"]}' | Out-File -FilePath .babelrc -Encoding utf8
   ```

4. **Create/verify .env.local file:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   ```

5. **Start development server:**
   ```powershell
   npm run dev -- -p 3001
   ```

---

## Configuration Files to Copy

If you're migrating from another machine, copy these files:

### Frontend
- `startup-ph-ui-prod/startup-ph-ui-prod/.env.local`

### Backend
- `start-up-ws-main/start-up-ws-main/project/.env`

---

## Common Issues & Solutions

### Frontend keeps crashing
**Issue:** Next.js shows "multiple modules with names that only differ in casing"

**Solution:** This is a Windows filesystem issue. Just restart the dev server:
```powershell
npm run dev -- -p 3001
```

### Registration returns 500 error
**Issue:** PM2 workers auto-start with wrong queue configuration

**Solution:** Delete PM2 workers:
```powershell
docker exec start-up-ws-app pm2 delete all
docker exec start-up-ws-app pm2 save --force
```

### Port already in use
**Issue:** Port 3001 or 8080 is already in use

**Solution for port 3001:**
```powershell
$process = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) { Stop-Process -Id $process -Force }
```

### Docker containers won't start
**Issue:** Docker Desktop not running or permission issues

**Solution:**
1. Start Docker Desktop
2. Run PowerShell as Administrator
3. Try `docker-compose up -d` again

---

## Useful Commands

### Docker
```powershell
# View running containers
docker ps

# View container logs
docker logs start-up-ws-app
docker logs start-up-ws-mysql

# Stop all containers
cd start-up-ws-main\start-up-ws-main
docker-compose down

# Restart a specific container
docker restart start-up-ws-app
```

### Frontend
```powershell
# Start dev server
npm run dev -- -p 3001

# Install dependencies
npm install

# Clear npm cache (if having issues)
npm cache clean --force
```

### Backend (Laravel)
```powershell
# Clear caches
docker exec start-up-ws-app php artisan config:clear
docker exec start-up-ws-app php artisan route:clear
docker exec start-up-ws-app php artisan view:clear
docker exec start-up-ws-app php artisan cache:clear

# View Laravel logs
docker exec start-up-ws-app tail -f /var/www/html/storage/logs/laravel.log

# Run artisan commands
docker exec start-up-ws-app php artisan <command>
```

---

## Database Access

- **Host:** localhost
- **Port:** 3307
- **Database:** start_up
- **Username:** root
- **Password:** root

**Connect via MySQL Client:**
```powershell
mysql -h 127.0.0.1 -P 3307 -u root -proot start_up
```

**Connect via Docker:**
```powershell
docker exec -it start-up-ws-mysql mysql -u root -proot start_up
```

---

## Project Structure

```
startupph/
├── SETUP_NEW_MACHINE.ps1          # Automated setup script
├── NEW_MACHINE_SETUP.md           # This file
├── start-up-ws-main/              # Backend (Laravel)
│   └── start-up-ws-main/
│       ├── docker-compose.yml     # Docker configuration
│       ├── project/               # Laravel application
│       └── dumps/                 # Database dumps
└── startup-ph-ui-prod/            # Frontend (Next.js)
    └── startup-ph-ui-prod/
        ├── src/                   # React/Next.js source
        ├── package.json
        └── .env.local            # Environment variables
```

---

## Getting Help

1. Check this README for common issues
2. View Docker logs: `docker logs start-up-ws-app`
3. View Laravel logs: `docker exec start-up-ws-app tail -f /var/www/html/storage/logs/laravel.log`
4. Check frontend terminal output for errors

---

## Next Steps After Setup

1. Test the frontend: http://localhost:3001
2. Test the backend API: http://localhost:8080/api/v2/health (if endpoint exists)
3. Try logging in or registering a user
4. Check that Docker containers are running: `docker ps`

---

**Last Updated:** October 23, 2025

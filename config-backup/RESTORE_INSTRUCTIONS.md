# Configuration Restore Instructions

## Files in this backup:

1. **backend-docker.env** → Copy to `start-up-ws-main/start-up-ws-main/.env`
2. **backend-laravel.env** → Copy to `start-up-ws-main/start-up-ws-main/project/.env`
3. **frontend.env.local** → Copy to `startup-ph-ui-prod/startup-ph-ui-prod/.env.local`
4. **.babelrc** → Copy to `startup-ph-ui-prod/startup-ph-ui-prod/.babelrc`

## Setup Steps:

### Quick Setup (Copy-Paste All Commands)
```powershell
# 1. Clone repository (if first time) or pull latest changes
git clone https://github.com/DICT-ORG/startupph.git
cd startupph
# OR if already cloned:
# cd startupph
# git pull origin main

# 2. Restore environment files
Copy-Item .\config-backup\backend-docker.env -Destination .\start-up-ws-main\start-up-ws-main\.env
Copy-Item .\config-backup\backend-laravel.env -Destination .\start-up-ws-main\start-up-ws-main\project\.env
Copy-Item .\config-backup\frontend.env.local -Destination .\startup-ph-ui-prod\startup-ph-ui-prod\.env.local
Copy-Item .\config-backup\.babelrc -Destination .\startup-ph-ui-prod\startup-ph-ui-prod\.babelrc

# 3. Start Docker containers
cd start-up-ws-main\start-up-ws-main
docker-compose up -d

# 4. Install backend dependencies
docker exec start-up-ws-main-app php composer.phar install

# 5. Setup database
docker exec start-up-ws-main-app php artisan migrate:fresh --seed

# 6. Install frontend dependencies
cd ..\..\startup-ph-ui-prod\startup-ph-ui-prod
npm install

# 7. Start frontend development server
npm run dev
```

### Detailed Step-by-Step Instructions

### 1. Clone/Pull the Repository
```powershell
# First time setup
git clone https://github.com/DICT-ORG/startupph.git
cd startupph

# OR update existing repository
cd startupph
git pull origin main
```

### 2. Restore Configuration Files
```powershell
# Backend Docker config
Copy-Item .\config-backup\backend-docker.env -Destination .\start-up-ws-main\start-up-ws-main\.env

# Backend Laravel config
Copy-Item .\config-backup\backend-laravel.env -Destination .\start-up-ws-main\start-up-ws-main\project\.env

# Frontend config
Copy-Item .\config-backup\frontend.env.local -Destination .\startup-ph-ui-prod\startup-ph-ui-prod\.env.local

# Babel config
Copy-Item .\config-backup\.babelrc -Destination .\startup-ph-ui-prod\startup-ph-ui-prod\.babelrc
```

### 3. Start Backend (Docker)
```powershell
cd start-up-ws-main\start-up-ws-main
docker-compose up -d
```

### 4. Install Backend Dependencies
```powershell
docker exec start-up-ws-main-app php composer.phar install
```

### 5. Setup Database
```powershell
docker exec start-up-ws-main-app php artisan migrate:fresh --seed
```

### 6. Install Frontend Dependencies
```powershell
cd ..\..\startup-ph-ui-prod\startup-ph-ui-prod
npm install
```

### 7. Start Frontend Development Server
```powershell
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Mailpit (Email):** http://localhost:8025

## Key Configuration Values

### Backend (.env)
- Database: `startup_ph`
- DB Username: `admin`
- DB Password: `secret`
- Elasticsearch: `http://elasticsearch:9200`
- Turnstile Secret: `1x0000000000000000000000000000000AA` (test key)

### Frontend (.env.local)
- API URL: `http://localhost:8080/api/v2`
- Elastic URL: `http://localhost:9200`
- eGov SSO Env: `STAGING/PRODUCTION`
- eGov SSO Client ID: `STARTUP`

## Troubleshooting

If you get port conflicts:
```powershell
# Kill process on port 3000 (Frontend)
$process = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) { Stop-Process -Id $process -Force }
```

## Notes

- The database will be created fresh with migrations and seeders
- No need to import the 42GB dump - placeholder data is sufficient for development
- Mailpit will capture all emails (OTP codes, etc.)

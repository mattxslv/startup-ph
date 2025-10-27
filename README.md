# StartupPH - Government Startup Platform

Official government platform for Philippine startups, providing comprehensive support from registration to program applications and resource access.

[![DICT](https://img.shields.io/badge/DICT-Government%20Project-blue)](https://dict.gov.ph)
[![Laravel](https://img.shields.io/badge/Laravel-10-red)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/Next.js-13-black)](https://nextjs.org)
[![License](https://img.shields.io/badge/license-Government-green)](LICENSE)

## 🚀 Overview

StartupPH is the official Department of Information and Communications Technology (DICT) platform designed to support the Philippine startup ecosystem. The platform provides:

- **Startup Registration** - Official registration platform for Philippine startups and businesses
- **Program Applications** - Apply for government startup programs and track application status
- **Resource Library** - Access government guidelines, forms, and startup-related information
- **Business Directory** - Connect with other startups and explore the ecosystem

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 13.2.4
- **UI Library:** React 18.2.0
- **Styling:** TailwindCSS 3.2.7
- **State Management:** React Query (@tanstack/react-query)
- **Forms:** Formik + Yup validation
- **Authentication:** eGov SSO Widget
- **File Upload:** Google Cloud Storage

### Backend
- **Framework:** Laravel 10
- **Database:** MySQL/MariaDB 10.11
- **Search:** Elasticsearch 7.17.10
- **Cache:** Redis 7
- **Queue:** Laravel Queue
- **Email:** Mailpit (development)
- **Authentication:** Laravel Sanctum

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx
- **PHP:** PHP-FPM 8.1+
- **Development:** Hot reload, Docker volumes

## 📁 Project Structure

```
startupph/
├── startup-ph-ui-prod/          # Next.js Frontend
│   └── startup-ph-ui-prod/
│       ├── src/
│       │   ├── components/      # Reusable UI components
│       │   ├── feature/         # Feature-specific modules
│       │   ├── pages/           # Next.js pages
│       │   ├── ui/              # Design system components
│       │   └── lib/             # Utilities and helpers
│       ├── public/              # Static assets
│       └── package.json
│
├── start-up-ws-main/            # Laravel Backend
│   └── start-up-ws-main/
│       ├── project/
│       │   ├── app/             # Application code
│       │   ├── database/        # Migrations & seeders
│       │   ├── routes/          # API routes
│       │   └── config/          # Configuration files
│       ├── ops/docker/          # Docker configurations
│       └── docker-compose.yml
│
└── config-backup/               # Environment file templates
    ├── backend-docker.env
    ├── backend-laravel.env
    ├── frontend.env.local
    └── RESTORE_INSTRUCTIONS.md
```

## 🔧 Quick Setup

### Prerequisites

- **Docker Desktop** (with WSL2 for Windows)
- **Node.js** 18.x or higher
- **Git**
- **PowerShell** (for Windows)

### Installation

Copy and paste these commands in PowerShell:

```powershell
# 1. Clone the repository
git clone https://github.com/DICT-ORG/startupph.git
cd startupph

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

### Access the Application

After setup completes, access:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Mailpit (Email Testing):** http://localhost:8025
- **Elasticsearch:** http://localhost:9200

## 🔑 Default Credentials

### Admin Account
- **Email:** admin@dict.gov.ph
- **Password:** password
- **Role:** Administrator

### Database
- **Database:** startup_ph
- **Username:** admin
- **Password:** secret
- **Port:** 3306

## 📝 Environment Configuration

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v2
NEXT_PUBLIC_ELASTIC_URL=http://localhost:9200

# Google Cloud Storage for file uploads
NEXT_PUBLIC_GCS_BUCKET_NAME=startup-ph-uploads-2025
GCS_PROJECT_ID=startup-ph-storage
GCS_CLIENT_EMAIL=storage-uploader@startup-ph-storage.iam.gserviceaccount.com
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Backend (.env)
```bash
APP_URL=http://localhost:8080
DB_DATABASE=startup_ph
DB_USERNAME=admin
DB_PASSWORD=secret
ELASTIC_HOST=http://elasticsearch:9200
```

See `config-backup/RESTORE_INSTRUCTIONS.md` for complete configuration details.

## 🧪 Development

### Running Frontend Only
```powershell
cd startup-ph-ui-prod\startup-ph-ui-prod
npm run dev
```

### Running Backend Only
```powershell
cd start-up-ws-main\start-up-ws-main
docker-compose up -d
```

### Database Operations
```powershell
# Run migrations
docker exec start-up-ws-main-app php artisan migrate

# Seed database
docker exec start-up-ws-main-app php artisan db:seed

# Reset database
docker exec start-up-ws-main-app php artisan migrate:fresh --seed
```

### View Logs
```powershell
# Laravel logs
docker exec start-up-ws-main-app tail -f /var/www/html/storage/logs/laravel.log

# Docker container logs
docker logs start-up-ws-main-app -f
```

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Kill process on port 3000 (Frontend)
$process = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) { Stop-Process -Id $process -Force }

# Kill process on port 8080 (Backend)
docker-compose down
docker-compose up -d
```

### Database Connection Issues
```powershell
# Restart Docker containers
cd start-up-ws-main\start-up-ws-main
docker-compose restart

# Check database is running
docker ps | Select-String "database"
```

### Clear Cache
```powershell
# Backend cache
docker exec start-up-ws-main-app php artisan cache:clear
docker exec start-up-ws-main-app php artisan config:clear

# Frontend cache (from the frontend directory)
cd startup-ph-ui-prod\startup-ph-ui-prod
Remove-Item -Recurse -Force .next
npm run dev
```

## 📊 Database Schema

The platform includes 56 database tables covering:

- **User Management** - users, roles, permissions
- **Startup Profiles** - startups, sectors, industries
- **Applications** - programs, applications, submissions
- **Resources** - news, events, resources
- **Address System** - regions, provinces, cities, barangays
- **Audit Trail** - comprehensive activity logging

Run migrations to see the complete schema:
```powershell
docker exec start-up-ws-main-app php artisan migrate:status
```

## 🔐 Security Features

- ✅ Laravel Sanctum SPA Authentication
- ✅ CSRF Protection
- ✅ Cloudflare Turnstile Bot Protection
- ✅ Rate Limiting
- ✅ Input Validation & Sanitization
- ✅ SQL Injection Prevention
- ✅ XSS Protection
- ✅ Secure Session Management

## 🚀 Deployment

### Production Environment Variables

Update these for production:

**Frontend:**
```bash
NEXT_PUBLIC_API_URL=https://api.startupph.gov.ph
NEXT_PUBLIC_APP_URL=https://startupph.gov.ph
NEXT_PUBLIC_EGOV_SSO_ENV=PRODUCTION

# Google Cloud Storage (use production bucket and credentials)
NEXT_PUBLIC_GCS_BUCKET_NAME=startup-ph-production-uploads
GCS_PROJECT_ID=startup-ph-production
GCS_CLIENT_EMAIL=storage-uploader@startup-ph-production.iam.gserviceaccount.com
GCS_PRIVATE_KEY="<production-private-key>"
```

**Backend:**
```bash
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.startupph.gov.ph
DB_DATABASE=<production-db>
TURNSTILE_SECRET=<your-turnstile-secret>
```

### Build for Production

**Frontend:**
```powershell
cd startup-ph-ui-prod\startup-ph-ui-prod
npm run build
npm start
```

**Backend:**
```powershell
docker exec start-up-ws-main-app php artisan config:cache
docker exec start-up-ws-main-app php artisan route:cache
docker exec start-up-ws-main-app php artisan view:cache
```

## 📚 Documentation

- [Restore Instructions](config-backup/RESTORE_INSTRUCTIONS.md) - Setup guide for new machines
- [API Documentation](start-up-ws-main/start-up-ws-main/project/README.md) - Backend API reference
- [Frontend Guide](startup-ph-ui-prod/startup-ph-ui-prod/README.md) - Frontend development guide

## 🤝 Contributing

This is a government project. For contributions:

1. Follow coding standards (PSR-12 for PHP, Airbnb for JavaScript)
2. Write comprehensive tests
3. Document all changes
4. Submit pull requests for review
5. Ensure security compliance

## 📞 Support

For issues and support:

- **Email:** startupph@dict.gov.ph
- **GitHub Issues:** [Create an issue](../../issues)
- **DICT Support:** https://dict.gov.ph/contact

## 📄 License

This project is property of the Department of Information and Communications Technology (DICT), Republic of the Philippines.

© 2025 DICT. All rights reserved.

## 🙏 Acknowledgments

- **DICT** - Department of Information and Communications Technology
- **eGov PH** - For SSO and Upload Widget integration
- **Philippine Startup Community** - For valuable feedback

---

**Built with ❤️ for the Philippine Startup Ecosystem**

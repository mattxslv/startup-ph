# 🚀 Start Up Philippines

A comprehensive full-stack platform for startup registration and management in the Philippines, built with Laravel backend and Next.js frontend.

## 🌟 Overview

**Start Up Philippines** is a government-backed platform designed to streamline the startup ecosystem in the Philippines. The platform provides a seamless experience for entrepreneurs to register their startups, apply for government programs, and connect with the startup community.

## 🏗️ Architecture

This project consists of two main components:

- **Backend**: Laravel 10.33.0 API with PHP 8.2.6-FPM
- **Frontend**: Next.js 13.2.4 with React 18 and TypeScript
- **Database**: MariaDB 10.8 with Redis caching and Elasticsearch search

## ✨ Key Features

### For Startups
- 📝 **Easy Registration**: Streamlined startup registration process
- 📋 **Program Applications**: Apply for government startup programs
- 🔍 **Smart Search**: Find relevant programs and opportunities
- 📊 **Progress Tracking**: Monitor application status in real-time

### For Administrators
- 👥 **User Management**: Comprehensive user and role management
- 📈 **Application Review**: Review and process startup applications
- 📊 **Analytics Dashboard**: Monitor platform usage and statistics
- 🔧 **System Configuration**: Manage programs, requirements, and settings

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DICT-ORG/startupph.git
   cd startupph
   ```

2. **Start the application**
   ```bash
   cd startup-ph-ui-prod
   docker-compose up -d
   ```

3. **Run database migrations**
   ```bash
   docker exec -it start-up-ws-backend php artisan migrate
   docker exec -it start-up-ws-backend php artisan db:seed
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 🛠️ Technology Stack

**Backend:**
- Laravel 10.33.0
- PHP 8.2.6-FPM
- MariaDB 10.8
- Redis 6 (Caching)
- Elasticsearch 7.17 (Search)

**Frontend:**
- Next.js 13.2.4
- React 18.2.0
- TypeScript 5.0.2
- Tailwind CSS 3.2.7

**Infrastructure:**
- Docker & Docker Compose
- PM2 (Process Management)
- Nginx (Web Server)

## 📦 Project Structure

```
startupph/
├── startup-ph-ui-prod/          # Main application
│   ├── backend/                 # Laravel API
│   ├── frontend/                # Next.js frontend (planned)
│   ├── docker-compose.yml       # Container orchestration
│   └── README.md               # Detailed documentation
├── HOW_TO_ACCESS_SYSTEM.md     # System access guide
├── QUICK_START_GUIDE.md        # Quick setup guide
└── README.md                   # This file
```

## 🔒 Security & Authentication

- **Laravel Sanctum** for API authentication
- **Role-based Access Control (RBAC)**
- **OTP verification** for user registration
- **Audit logging** for compliance

## 🌐 API Integration

The platform integrates with various government systems:
- **eGov APIs** for citizen verification
- **Address validation** for Philippine locations
- **Industry classification** (PSCC codes)

## 📊 Current Status

✅ **Development Complete** - Core features operational
⏳ **Production Ready** - Awaiting final configuration

### What's Working
- User registration and authentication
- Startup profile management
- Program application system
- Admin dashboard
- Search functionality
- File upload handling

### Next Steps
- Email service configuration
- Production data import
- External API credential setup


## 📄 License

This project is developed for the Philippine government. See license terms for usage restrictions.

## 🆘 Support

For technical support or questions:
- Check the detailed documentation in `startup-ph-ui-prod/README.md`
- Review the system access guide: `HOW_TO_ACCESS_SYSTEM.md`
- Follow the quick start guide: `QUICK_START_GUIDE.md`

## 👥 Team

**Developed by:** Department of Information and Communications Technology (DICT)  
**Platform:** Start Up Philippines Initiative

---

**Last Updated:** October 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready

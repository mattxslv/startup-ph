# Docker Configuration Guide

## Overview

The StartupPH platform uses Docker and Docker Compose to containerize all services, making it easy to set up and run the entire stack locally or in production.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Services                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Nginx      │  │  PHP-FPM 8.2 │  │  MariaDB     │      │
│  │   (Web)      │  │  (Backend)   │  │  10.11       │      │
│  │   Port: 8080 │  │              │  │  Port: 3306  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Redis      │  │ Elasticsearch│  │   Mailpit    │      │
│  │   7.x        │  │  7.17.10     │  │  (Email)     │      │
│  │   Port: 6379 │  │  Port: 9200  │  │  Port: 8025  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   Frontend Services                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │   Next.js    │  │   Vite       │                         │
│  │  (Frontend)  │  │  (Dashboard) │                         │
│  │  Port: 3001  │  │  Port: 5174  │                         │
│  └──────────────┘  └──────────────┘                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Services

### Backend Services (Docker Compose)

Located in: `start-up-ws-main/start-up-ws-main/`

#### 1. **Nginx** (Web Server)
- **Container:** `start-up-ws-main-nginx`
- **Port:** 8080
- **Config:** `ops/docker/nginx/`
- **Purpose:** Reverse proxy and static file serving

#### 2. **PHP-FPM 8.2** (Application Server)
- **Container:** `start-up-ws-main-app`
- **Image:** PHP 8.2-fpm
- **Config:** `ops/docker/fpm/Dockerfile`
- **Purpose:** Laravel application runtime
- **Extensions:** PDO, MySQL, Redis, GD, ZIP, mbstring, etc.

#### 3. **MariaDB 10.11** (Database)
- **Container:** `start-up-ws-main-database`
- **Port:** 3306
- **Database:** `startup_ph`
- **Credentials:** See `.env` file

#### 4. **Redis 7** (Cache & Queue)
- **Container:** `start-up-ws-main-redis`
- **Port:** 6379
- **Purpose:** Session storage, caching, queue driver

#### 5. **Elasticsearch 7.17.10** (Search)
- **Container:** `start-up-ws-main-elasticsearch`
- **Port:** 9200
- **Purpose:** Full-text search for startups

#### 6. **Mailpit** (Email Testing)
- **Container:** `start-up-ws-main-mailpit`
- **Web UI:** http://localhost:8025
- **SMTP:** Port 1025
- **Purpose:** Email testing in development

## Docker Compose Files

### Development: `docker-compose.yml`
```bash
cd start-up-ws-main/start-up-ws-main
docker-compose up -d
```

### Staging: `docker-compose-stg.yml`
```bash
docker-compose -f docker-compose-stg.yml up -d
```

### Production: `docker-compose-prod.yml`
```bash
docker-compose -f docker-compose-prod.yml up -d
```

## Common Docker Commands

### Start Services
```bash
cd start-up-ws-main/start-up-ws-main
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f nginx
docker-compose logs -f database
```

### Rebuild Containers
```bash
# Rebuild all
docker-compose build

# Rebuild specific service
docker-compose build app

# No cache rebuild
docker-compose build --no-cache
```

### Execute Commands in Container
```bash
# Laravel artisan commands
docker exec start-up-ws-main-app php artisan migrate
docker exec start-up-ws-main-app php artisan db:seed
docker exec start-up-ws-main-app php artisan cache:clear

# Composer
docker exec start-up-ws-main-app composer install
docker exec start-up-ws-main-app composer update

# Shell access
docker exec -it start-up-ws-main-app bash
```

### Database Operations
```bash
# Access MySQL CLI
docker exec -it start-up-ws-main-database mysql -u admin -p startup_ph

# Backup database
docker exec start-up-ws-main-database mysqldump -u admin -p startup_ph > backup.sql

# Restore database
docker exec -i start-up-ws-main-database mysql -u admin -p startup_ph < backup.sql
```

### Redis Commands
```bash
# Access Redis CLI
docker exec -it start-up-ws-main-redis redis-cli

# Flush cache
docker exec start-up-ws-main-redis redis-cli FLUSHALL
```

### Elasticsearch Commands
```bash
# Check cluster health
curl http://localhost:9200/_cluster/health?pretty

# List indices
curl http://localhost:9200/_cat/indices?v

# Access Elasticsearch container
docker exec -it start-up-ws-main-elasticsearch bash
```

## Environment Variables

### Backend (.env)
```bash
# Database
DB_HOST=database
DB_PORT=3306
DB_DATABASE=startup_ph
DB_USERNAME=admin
DB_PASSWORD=secret

# Redis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

# Elasticsearch
ELASTIC_HOST=http://elasticsearch:9200

# Mail
MAIL_HOST=mailpit
MAIL_PORT=1025
```

## Volume Mounts

### Application Code
```yaml
volumes:
  - ./project:/var/www/html
```

### Database Persistence
```yaml
volumes:
  - ./data/mysql:/var/lib/mysql
```

### Elasticsearch Data
```yaml
volumes:
  - ./data-elasticsearch:/usr/share/elasticsearch/data
```

## Networking

All services are connected via Docker network: `start-up-ws-main_default`

Services can communicate using container names:
- `http://app` - PHP-FPM
- `http://nginx` - Nginx
- `http://database:3306` - MariaDB
- `http://redis:6379` - Redis
- `http://elasticsearch:9200` - Elasticsearch

## Port Mapping

| Service       | Internal Port | External Port |
|--------------|---------------|---------------|
| Nginx        | 80            | 8080          |
| MariaDB      | 3306          | 3306          |
| Redis        | 6379          | 6379          |
| Elasticsearch| 9200          | 9200          |
| Mailpit Web  | 8025          | 8025          |
| Mailpit SMTP | 1025          | 1025          |

## Frontend Services (Non-Docker)

### Next.js Frontend
```bash
cd startup-ph-ui-prod/startup-ph-ui-prod
npm install
npm run dev  # Port 3001
```

### Vite Dashboard
```bash
cd startup-core-ui-prod/startup-core-ui-prod
npm install
npm run dev  # Port 5174
```

## Dockerfile Locations

- **Backend:** `start-up-ws-main/ops/docker/fpm/Dockerfile`
- **Nginx:** `start-up-ws-main/ops/docker/nginx/Dockerfile`
- **Frontend:** `startup-ph-ui-prod/startup-ph-ui-prod/Dockerfile`
- **Dashboard:** `startup-core-ui-prod/startup-core-ui-prod/Dockerfile`

## Troubleshooting

### Port Already in Use
```bash
# Check what's using port 8080
lsof -i :8080

# Stop all containers
docker-compose down

# Start fresh
docker-compose up -d
```

### Database Connection Failed
```bash
# Check if database is running
docker-compose ps

# View database logs
docker-compose logs database

# Restart database
docker-compose restart database
```

### Permission Issues
```bash
# Fix Laravel storage permissions
docker exec start-up-ws-main-app chmod -R 777 storage
docker exec start-up-ws-main-app chmod -R 777 bootstrap/cache
```

### Clear Everything and Start Fresh
```bash
# Stop and remove containers, networks, volumes
docker-compose down -v

# Rebuild
docker-compose build --no-cache

# Start
docker-compose up -d
```

## Production Deployment

### Build for Production
```bash
# Backend
docker-compose -f docker-compose-prod.yml build

# Optimize Laravel
docker exec start-up-ws-main-app php artisan config:cache
docker exec start-up-ws-main-app php artisan route:cache
docker exec start-up-ws-main-app php artisan view:cache

# Frontend
cd startup-ph-ui-prod/startup-ph-ui-prod
npm run build
npm start

# Dashboard
cd startup-core-ui-prod/startup-core-ui-prod
npm run build
npm run preview
```

### Health Checks
```bash
# Backend
curl http://localhost:8080/api/health

# Database
docker exec start-up-ws-main-database mysqladmin ping -u admin -p

# Redis
docker exec start-up-ws-main-redis redis-cli ping

# Elasticsearch
curl http://localhost:9200/_cluster/health
```

## GitHub Container Registry

Docker images are automatically built and pushed to GitHub Container Registry (ghcr.io) on every push to main or tag.

```bash
# Pull images
docker pull ghcr.io/mattxslv/startup-ph-backend:latest
docker pull ghcr.io/mattxslv/startup-ph-frontend:latest
docker pull ghcr.io/mattxslv/startup-ph-dashboard:latest
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Laravel Docker Guide](https://laravel.com/docs/10.x/sail)

# How to Access Your Running System 🚀

**Status:** ✅ YOUR SYSTEM IS ALREADY RUNNING!

---

## 🎯 SYSTEM IS LIVE - ACCESS IT NOW!

### Backend API (Laravel)
```
URL: http://localhost:8000
Status: ✅ RUNNING (28 minutes)
```

**Test it:**
```powershell
# Open in browser
start http://localhost:8000

# Or test with curl
curl http://localhost:8000
```

### Database (MariaDB)
```
Host: localhost
Port: 3306
Database: startup
Username: root
Password: root
Status: ✅ RUNNING (1 hour)
```

**Connect with MySQL client:**
```powershell
docker exec -it start-up-ws-db mysql -uroot -proot startup
```

### Cache (Redis)
```
Host: localhost
Port: 6379
Status: ✅ RUNNING (1 hour)
```

**Test Redis:**
```powershell
docker exec -it start-up-ws-redis redis-cli ping
```

### Search (Elasticsearch)
```
URL: http://localhost:9200
Status: ✅ RUNNING (1 hour)
```

**Test it:**
```powershell
# Open in browser
start http://localhost:9200

# Or test with curl
curl http://localhost:9200
```

---

## 📋 QUICK COMMANDS

### Check What's Running
```powershell
# See all running containers
docker ps

# See container logs
docker logs start-up-ws-backend
docker logs start-up-ws-db
docker logs start-up-ws-redis
docker logs start-up-ws-elasticsearch
```

### Stop the System
```powershell
# Stop all services
cd "C:\Users\azhyg\Documents\Startup Website\Front and Backend\startup-ph-ui-prod"
docker-compose -f docker-compose.dev.yml down
```

### Start the System (if stopped)
```powershell
# Start all services
cd "C:\Users\azhyg\Documents\Startup Website\Front and Backend\startup-ph-ui-prod"
docker-compose -f docker-compose.dev.yml up -d
```

### Restart a Single Service
```powershell
# Restart backend
docker restart start-up-ws-backend

# Restart database
docker restart start-up-ws-db

# Restart Redis
docker restart start-up-ws-redis

# Restart Elasticsearch
docker restart start-up-ws-elasticsearch
```

---

## 🌐 ACCESS URLs (Your System is Running Here!)

### For Testing/Development:

**Backend API:**
- Main: http://localhost:8000
- API v2: http://localhost:8000/api/v2/

**Admin Endpoints (Examples):**
- Login: `POST http://localhost:8000/api/v2/administrator/authenticate`
- Users: `GET http://localhost:8000/api/v2/administrator/administrators`
- Startups: `GET http://localhost:8000/api/v2/administrator/startups`
- Programs: `GET http://localhost:8000/api/v2/administrator/programs`

**Database:**
- Use any MySQL client
- Host: localhost:3306
- Database: startup
- User: root / Password: root

**Elasticsearch:**
- Dashboard: http://localhost:9200
- Search API: http://localhost:9200/_search

---

## 🔍 Test Your System Now

### Test 1: Check Backend is Responding
```powershell
curl http://localhost:8000
```

### Test 2: Check Database
```powershell
docker exec -it start-up-ws-db mysql -uroot -proot -e "SHOW DATABASES;"
```

### Test 3: Check Redis
```powershell
docker exec -it start-up-ws-redis redis-cli ping
```

### Test 4: Check Elasticsearch
```powershell
curl http://localhost:9200
```

---

## 💡 WHAT YOU CAN DO NOW

### 1. Open Backend in Browser
```powershell
start http://localhost:8000
```

### 2. Check API Documentation (if available)
```powershell
start http://localhost:8000/api/documentation
```

### 3. Query Database
```powershell
docker exec -it start-up-ws-db mysql -uroot -proot startup
```
Then run SQL queries:
```sql
-- See all tables
SHOW TABLES;

-- Check address data
SELECT * FROM regions;
SELECT * FROM provinces LIMIT 10;
SELECT * FROM municipalities LIMIT 10;
```

### 4. Test API Endpoints
Use Postman, Insomnia, or curl to test:
```powershell
# Example: Get all administrators
curl http://localhost:8000/api/v2/administrator/administrators
```

---

## 📊 Monitor Your System

### View Logs in Real-Time
```powershell
# Backend logs
docker logs -f start-up-ws-backend

# Database logs
docker logs -f start-up-ws-db

# All services
docker-compose -f startup-ph-ui-prod/docker-compose.dev.yml logs -f
```

### Check System Resources
```powershell
# Container stats
docker stats

# Disk usage
docker system df
```

---

## 🛑 WHEN TO STOP/START

### Stop When:
- Shutting down your computer
- Not using the system for a while
- Need to free up resources
- Making configuration changes

**Command:**
```powershell
cd "C:\Users\azhyg\Documents\Startup Website\Front and Backend\startup-ph-ui-prod"
docker-compose -f docker-compose.dev.yml down
```

### Start When:
- Beginning work
- After computer restart
- Need to test/develop

**Command:**
```powershell
cd "C:\Users\azhyg\Documents\Startup Website\Front and Backend\startup-ph-ui-prod"
docker-compose -f docker-compose.dev.yml up -d
```

---

## 🚨 TROUBLESHOOTING

### If Backend Not Responding:
```powershell
# Check logs
docker logs start-up-ws-backend --tail 50

# Restart
docker restart start-up-ws-backend
```

### If Database Connection Fails:
```powershell
# Check if running
docker ps | findstr "start-up-ws-db"

# Check logs
docker logs start-up-ws-db --tail 50

# Restart
docker restart start-up-ws-db
```

### If Port Already in Use:
```powershell
# Find what's using the port (example: 8000)
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <process_id> /F

# Then restart your containers
docker-compose -f startup-ph-ui-prod/docker-compose.dev.yml restart
```

---

## 🎉 YOUR SYSTEM IS READY!

**Current Status:**
```
✅ Backend:        RUNNING (http://localhost:8000)
✅ Database:       RUNNING (localhost:3306)
✅ Redis:          RUNNING (localhost:6379)
✅ Elasticsearch:  RUNNING (http://localhost:9200)
✅ Queue Workers:  3 ACTIVE
```

**You can:**
1. Access the backend at http://localhost:8000
2. Connect to database at localhost:3306
3. Test APIs with Postman/curl
4. View logs with `docker logs`
5. Monitor with `docker stats`

**Everything is running and ready to use! 🚀**

---

## 📝 QUICK REFERENCE

### Most Used Commands:
```powershell
# Check status
docker ps

# View logs
docker logs start-up-ws-backend

# Open backend
start http://localhost:8000

# Access database
docker exec -it start-up-ws-db mysql -uroot -proot startup

# Stop all
docker-compose -f startup-ph-ui-prod/docker-compose.dev.yml down

# Start all
docker-compose -f startup-ph-ui-prod/docker-compose.dev.yml up -d
```

---

**Your system is live and operational right now! Just open http://localhost:8000 in your browser!** 🎉

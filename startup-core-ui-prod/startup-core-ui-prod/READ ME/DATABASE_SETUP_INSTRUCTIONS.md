# MariaDB Database Setup - Step-by-Step Instructions

## Current Status
✅ Docker is installed (version 28.5.1)  
❌ Docker Desktop is not running  
❌ MariaDB is not set up yet  
⏳ Waiting for backend codebase and database dump  

---

## 🚀 Quick Setup Steps

### Step 1: Start Docker Desktop

1. **Open Docker Desktop** from your Windows Start menu
2. Wait for Docker to fully start (usually takes 30-60 seconds)
3. You'll see the Docker icon in your system tray when it's ready
4. The icon should be solid (not animated) when ready

### Step 2: Start MariaDB Container

Once Docker Desktop is running, execute this command:

```bash
docker-compose -f docker-compose.db.yml up -d
```

**What this does:**
- Downloads MariaDB 10.11 image (if not already downloaded)
- Creates and starts a MariaDB container
- Sets up the database with these credentials:
  - Root Password: `startup_root_2025`
  - Database Name: `startup_core`
  - User: `startup_user`
  - Password: `startup_pass_2025`
- Exposes port 3306 for connections

### Step 3: Verify MariaDB is Running

Check container status:
```bash
docker ps
```

You should see `startup_mariadb` container running.

### Step 4: Test Database Connection

```bash
# Connect to MariaDB container
docker exec -it startup_mariadb mysql -u root -p
# Enter password: startup_root_2025

# Once connected, verify:
SHOW DATABASES;
USE startup_core;
SHOW TABLES;
EXIT;
```

---

## 📥 When Database Dump Arrives

### Option 1: Import from File

If you receive a `.sql` file:

```bash
# Copy dump file to current directory, then:
docker exec -i startup_mariadb mysql -u root -pstartup_root_2025 startup_core < database_dump.sql
```

### Option 2: Import from Compressed File

If you receive a `.sql.gz` file:

```bash
# Windows (using gunzip if available):
gunzip < database_dump.sql.gz | docker exec -i startup_mariadb mysql -u root -pstartup_root_2025 startup_core

# Or decompress first:
gunzip database_dump.sql.gz
docker exec -i startup_mariadb mysql -u root -pstartup_root_2025 startup_core < database_dump.sql
```

### Option 3: Auto-import on Container Start

Place your dump file in the project directory and update `docker-compose.db.yml`:

```yaml
services:
  mariadb:
    # ... existing config ...
    volumes:
      - mariadb_data:/var/lib/mysql
      - ./database_dump.sql:/docker-entrypoint-initdb.d/init.sql  # Add this line
```

Then recreate the container:
```bash
docker-compose -f docker-compose.db.yml down
docker-compose -f docker-compose.db.yml up -d
```

---

## 🔧 Backend Configuration

### For Laravel Backend

When you receive the backend, configure its `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=startup_core
DB_USERNAME=startup_user
DB_PASSWORD=startup_pass_2025
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci
```

### For Node.js Backend

Configure database connection:

```javascript
// config/database.js
module.exports = {
  development: {
    host: '127.0.0.1',
    port: 3306,
    database: 'startup_core',
    username: 'startup_user',
    password: 'startup_pass_2025',
    dialect: 'mysql',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
}
```

---

## 🛠️ Useful Docker Commands

```bash
# Start MariaDB container
docker-compose -f docker-compose.db.yml up -d

# Stop MariaDB container
docker-compose -f docker-compose.db.yml down

# View container logs
docker logs startup_mariadb

# Follow logs in real-time
docker logs -f startup_mariadb

# Restart container
docker-compose -f docker-compose.db.yml restart

# Check container status
docker ps

# Access MariaDB shell
docker exec -it startup_mariadb mysql -u root -pstartup_root_2025

# Backup database
docker exec startup_mariadb mysqldump -u root -pstartup_root_2025 startup_core > backup_$(date +%Y%m%d).sql

# Remove container and volumes (WARNING: deletes all data)
docker-compose -f docker-compose.db.yml down -v
```

---

## 📊 Database Credentials Reference

**For your records (keep secure):**

| Parameter | Value |
|-----------|-------|
| Host | 127.0.0.1 or localhost |
| Port | 3306 |
| Database | startup_core |
| Root User | root |
| Root Password | startup_root_2025 |
| App User | startup_user |
| App Password | startup_pass_2025 |

---

## 🧪 Testing the Full Stack

Once you have MariaDB running, backend set up, and database imported:

### 1. Start MariaDB (if not running)
```bash
docker-compose -f docker-compose.db.yml up -d
```

### 2. Start Backend Server
```bash
# Navigate to backend directory
cd path/to/backend

# For Laravel:
php artisan serve --port=8000

# For Node.js:
npm run start
```

### 3. Start Frontend Server (already running)
```bash
# Your frontend is already running at http://localhost:5174
# If not, run: npm run dev
```

### 4. Test Integration
1. Open browser to http://localhost:5174
2. Try to login with credentials from database
3. Check browser DevTools > Network tab
4. Verify API calls to backend succeed
5. Check that data loads correctly

---

## 🚨 Troubleshooting

### Docker Desktop Won't Start
- Restart your computer
- Reinstall Docker Desktop if needed
- Check Windows Services - ensure Docker services are running

### Port 3306 Already in Use
```bash
# Find what's using port 3306
netstat -ano | findstr :3306

# Kill the process or change port in docker-compose.db.yml
```

### Container Won't Start
```bash
# Check logs
docker logs startup_mariadb

# Remove and recreate
docker-compose -f docker-compose.db.yml down
docker-compose -f docker-compose.db.yml up -d
```

### Can't Connect from Backend
- Verify container is running: `docker ps`
- Check backend credentials match
- Ensure no firewall blocking
- Try connecting with root user first
- Check backend error logs

### Import Fails
```bash
# Check file exists and is readable
# Try importing smaller portions
# Check for syntax errors in dump
# Verify container has enough memory
```

---

## 📝 Pre-Migration Checklist

Before you can complete the setup, you need:

- [ ] Docker Desktop started and running
- [ ] MariaDB container running (this file helps with that)
- [ ] Backend codebase received
- [ ] Database dump file (.sql) received
- [ ] Backend environment configured
- [ ] Backend dependencies installed
- [ ] Backend server started successfully

---

## ✅ What's Ready Now

- ✅ MariaDB Docker configuration created (`docker-compose.db.yml`)
- ✅ Database credentials defined and documented
- ✅ Import procedures documented
- ✅ Troubleshooting guide ready
- ✅ Frontend running at http://localhost:5174
- ✅ All documentation in place

---

## ⏭️ Next Steps

1. **Start Docker Desktop** (if not running)
2. **Run MariaDB container:**
   ```bash
   docker-compose -f docker-compose.db.yml up -d
   ```
3. **Wait for backend and database dump** to be provided
4. **Import database** when dump file arrives
5. **Configure and start backend** server
6. **Test the full application**

---

## 🔐 Security Notes

**Important:** The credentials in this setup are for **development only**. 

For production:
- Use strong, unique passwords
- Store credentials in environment variables
- Never commit passwords to git
- Use SSL/TLS for database connections
- Limit database user permissions
- Enable firewall rules
- Regular security audits

---

**Document Created:** January 2025  
**Author:** Cline AI Assistant  
**Status:** Ready for execution once Docker Desktop is running

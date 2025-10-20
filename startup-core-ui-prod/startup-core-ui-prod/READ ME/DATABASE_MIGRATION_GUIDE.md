# Database Migration & Testing Guide

## Overview
This guide provides step-by-step instructions for setting up MariaDB, importing the database dump, and testing the integration once the backend and database are provided.

---

## 📋 Pre-Migration Checklist

Before starting the database migration, ensure you have:

- [ ] Backend codebase received and reviewed
- [ ] Database dump file (.sql) received
- [ ] Backend API documentation (endpoint list, authentication method)
- [ ] Database credentials and connection details
- [ ] MariaDB installed locally or accessible server
- [ ] Backend environment requirements identified

---

## 🗄️ MariaDB Installation & Setup

### Windows 10/11 Installation

#### Option 1: Direct Installation
```bash
# Download MariaDB from: https://mariadb.org/download/
# Choose Windows x64 MSI Package
# Run the installer and follow the wizard

# During installation:
# - Set root password (remember this!)
# - Enable "Use UTF8 as default server's character set"
# - Install as Windows Service (recommended)
```

#### Option 2: Using Docker (Recommended for Development)
```bash
# Create a docker-compose.yml for MariaDB
docker-compose -f docker-compose.db.yml up -d

# Example docker-compose.db.yml:
# version: '3.8'
# services:
#   mariadb:
#     image: mariadb:10.11
#     container_name: startup_mariadb
#     environment:
#       MYSQL_ROOT_PASSWORD: your_root_password
#       MYSQL_DATABASE: startup_core
#       MYSQL_USER: startup_user
#       MYSQL_PASSWORD: your_password
#     ports:
#       - "3306:3306"
#     volumes:
#       - mariadb_data:/var/lib/mysql
#       - ./database_dump.sql:/docker-entrypoint-initdb.d/init.sql
#     command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
# volumes:
#   mariadb_data:
```

### Verify Installation
```bash
# Check MariaDB is running
mysql --version
# Expected output: mysql  Ver 15.1 Distrib 10.x.x-MariaDB

# Connect to MariaDB
mysql -u root -p
# Enter password when prompted

# In MySQL prompt:
SHOW DATABASES;
SELECT VERSION();
EXIT;
```

---

## 📥 Database Import Process

### Step 1: Prepare the Database

```bash
# Connect to MariaDB as root
mysql -u root -p

# Create the database
CREATE DATABASE IF NOT EXISTS startup_core 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

# Create dedicated user (recommended for security)
CREATE USER 'startup_user'@'localhost' IDENTIFIED BY 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON startup_core.* TO 'startup_user'@'localhost';

# If backend will connect from Docker or another machine:
GRANT ALL PRIVILEGES ON startup_core.* TO 'startup_user'@'%' IDENTIFIED BY 'your_secure_password';

# Flush privileges
FLUSH PRIVILEGES;

# Verify user creation
SELECT User, Host FROM mysql.user WHERE User = 'startup_user';

# Exit
EXIT;
```

### Step 2: Import Database Dump

```bash
# Method 1: Direct import
mysql -u root -p startup_core < database_dump.sql

# Method 2: With progress monitoring (if pv is installed)
pv database_dump.sql | mysql -u root -p startup_core

# Method 3: From MySQL prompt (for smaller dumps)
mysql -u root -p startup_core
SOURCE /path/to/database_dump.sql;
EXIT;

# Method 4: If dump is compressed
gunzip < database_dump.sql.gz | mysql -u root -p startup_core
# OR
zcat database_dump.sql.gz | mysql -u root -p startup_core
```

### Step 3: Verify Import

```bash
# Connect to database
mysql -u root -p startup_core

# Check tables were imported
SHOW TABLES;

# Check table counts
SELECT 
    TABLE_NAME, 
    TABLE_ROWS 
FROM 
    information_schema.TABLES 
WHERE 
    TABLE_SCHEMA = 'startup_core'
ORDER BY 
    TABLE_ROWS DESC;

# Verify critical tables exist (adjust based on your schema)
SHOW TABLES LIKE '%users%';
SHOW TABLES LIKE '%administrators%';
SHOW TABLES LIKE '%startups%';
SHOW TABLES LIKE '%programs%';

# Check sample data from key tables
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM administrators;
SELECT * FROM users LIMIT 5;

# Check for any errors in import
SHOW WARNINGS;

# Exit
EXIT;
```

---

## 🔧 Backend Database Configuration

### Laravel Backend Configuration

If the backend is Laravel-based, configure `config/database.php` or `.env`:

```env
# Backend .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=startup_core
DB_USERNAME=startup_user
DB_PASSWORD=your_secure_password

# Optional optimizations
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci
```

### Node.js Backend Configuration

If using Node.js with Sequelize/TypeORM:

```javascript
// config/database.js or similar
module.exports = {
  development: {
    host: '127.0.0.1',
    port: 3306,
    database: 'startup_core',
    username: 'startup_user',
    password: 'your_secure_password',
    dialect: 'mysql', // Use 'mysql' for MariaDB
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    logging: console.log,
  }
}
```

### Test Backend Database Connection

```bash
# For Laravel
php artisan migrate:status
php artisan tinker
# In tinker: DB::connection()->getPdo();

# For Node.js
# Create test connection script:
# node test-db-connection.js

# Check backend logs for successful connection
# Look for messages like:
# - "Database connected successfully"
# - "MySQL connection established"
```

---

## 🧪 Testing & Validation

### Database Integrity Tests

```sql
-- Connect to database
mysql -u startup_user -p startup_core

-- 1. Check for orphaned records (adjust based on your schema)
SELECT COUNT(*) FROM startup_applications sa
LEFT JOIN startups s ON sa.startup_id = s.id
WHERE s.id IS NULL;

-- 2. Verify foreign key constraints
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME
FROM 
    information_schema.KEY_COLUMN_USAGE
WHERE 
    TABLE_SCHEMA = 'startup_core'
    AND REFERENCED_TABLE_NAME IS NOT NULL;

-- 3. Check for NULL values in required fields
SELECT * FROM users WHERE email IS NULL OR password IS NULL;
SELECT * FROM administrators WHERE username IS NULL;

-- 4. Verify indexes exist
SHOW INDEX FROM users;
SHOW INDEX FROM administrators;

-- 5. Check database size
SELECT 
    table_schema "Database",
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) "Size (MB)"
FROM 
    information_schema.TABLES
WHERE 
    table_schema = 'startup_core'
GROUP BY 
    table_schema;
```

### Backend API Tests

```bash
# 1. Start the backend server
# For Laravel:
php artisan serve --port=8000

# For Node.js:
npm run start
# or
node server.js

# 2. Test health/status endpoint
curl http://localhost:8000/api/health
# or
curl http://localhost:8000/api/status

# 3. Test authentication endpoint
curl -X POST http://localhost:8000/api/v2/administrator/authenticate \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password"}'

# Expected response should include a token
```

### Frontend Integration Tests

```bash
# 1. Update frontend .env
VITE_WS_ENDPOINT=http://localhost:8000

# 2. Start frontend dev server
npm run dev

# 3. Open browser to http://localhost:5173

# 4. Open DevTools (F12) > Network tab

# 5. Attempt login with test credentials

# 6. Verify:
#    - Request to /api/v2/administrator/authenticate succeeds
#    - Response includes token
#    - Token is stored in localStorage
#    - User is redirected to dashboard
#    - Dashboard loads data from backend

# 7. Check console for errors
#    - No CORS errors
#    - No 404 errors
#    - No authentication errors
```

---

## 🔄 Database Migration Scenarios

### Scenario 1: Clean Import (Fresh Start)

```bash
# 1. Drop existing database (if any)
mysql -u root -p -e "DROP DATABASE IF EXISTS startup_core;"

# 2. Create fresh database
mysql -u root -p -e "CREATE DATABASE startup_core CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 3. Import dump
mysql -u root -p startup_core < database_dump.sql

# 4. Verify import
mysql -u root -p startup_core -e "SHOW TABLES;"
```

### Scenario 2: Incremental Updates

```bash
# If you receive database updates later:

# 1. Backup current database first
mysqldump -u root -p startup_core > backup_before_update_$(date +%Y%m%d).sql

# 2. Apply migration/update script
mysql -u root -p startup_core < update_migration.sql

# 3. Verify changes
mysql -u root -p startup_core -e "SHOW TABLES;"
```

### Scenario 3: Schema Changes

```bash
# If backend has migration files (Laravel example):

# 1. Check migration status
php artisan migrate:status

# 2. Run pending migrations
php artisan migrate

# 3. If migrations fail, rollback
php artisan migrate:rollback

# 4. Check for migration conflicts
php artisan migrate --pretend
```

---

## 🚨 Troubleshooting

### Common Issues & Solutions

#### Issue 1: Character Encoding Problems
```sql
-- Symptoms: Special characters display incorrectly
-- Solution: Convert tables to UTF8MB4

ALTER DATABASE startup_core CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- For each table:
ALTER TABLE table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- For specific columns with text:
ALTER TABLE table_name MODIFY column_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Issue 2: Import Errors
```bash
# Error: "ERROR 1046 (3D000): No database selected"
# Solution: Specify database in command
mysql -u root -p --database=startup_core < database_dump.sql

# Error: "Access denied for user"
# Solution: Grant proper privileges
GRANT ALL PRIVILEGES ON startup_core.* TO 'startup_user'@'localhost';
FLUSH PRIVILEGES;

# Error: "Unknown table engine 'InnoDB'"
# Solution: Check MariaDB configuration
SHOW ENGINES;
```

#### Issue 3: Connection Issues
```bash
# Backend can't connect to database

# Check 1: MariaDB is running
# Windows:
sc query mysql

# Check 2: Port is open
netstat -an | findstr :3306

# Check 3: Test connection manually
mysql -h 127.0.0.1 -P 3306 -u startup_user -p

# Check 4: Firewall settings
# Allow port 3306 in Windows Firewall
```

#### Issue 4: Performance Issues
```sql
-- Check slow queries
SHOW PROCESSLIST;

-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Add indexes to improve performance
SHOW INDEX FROM table_name;
CREATE INDEX idx_column_name ON table_name(column_name);

-- Optimize tables
OPTIMIZE TABLE table_name;
```

---

## 📊 Post-Migration Validation Checklist

After completing the migration, verify:

### Database Level
- [ ] All tables imported successfully
- [ ] Row counts match expected values
- [ ] Indexes are present and correct
- [ ] Foreign key constraints are intact
- [ ] No orphaned records exist
- [ ] Character encoding is UTF8MB4
- [ ] Database user has correct permissions

### Backend Level
- [ ] Backend connects to database successfully
- [ ] No connection errors in logs
- [ ] Migration status is up-to-date
- [ ] Seeders run successfully (if applicable)
- [ ] API endpoints respond correctly
- [ ] Authentication works
- [ ] CRUD operations work

### Frontend Level
- [ ] Frontend connects to backend API
- [ ] No CORS errors
- [ ] Login functionality works
- [ ] Dashboard loads data
- [ ] All pages accessible
- [ ] Data displays correctly
- [ ] Forms submit successfully
- [ ] File uploads work

---

## 🔐 Security Best Practices

### Database Security
```sql
-- 1. Remove test/demo accounts
DELETE FROM users WHERE email LIKE '%test%' OR email LIKE '%demo%';

-- 2. Ensure strong passwords
-- Check for weak passwords (adjust as needed)
SELECT id, username FROM administrators WHERE LENGTH(password) < 60;

-- 3. Limit remote access
-- Only allow specific IPs if needed
UPDATE mysql.user SET Host='localhost' WHERE User='startup_user';
FLUSH PRIVILEGES;

-- 4. Enable binary logging for recovery
SET GLOBAL log_bin = ON;
```

### Backup Strategy
```bash
# Daily backup script (save as backup.sh or backup.bat)

# Windows batch script example:
@echo off
set BACKUP_DIR=C:\backups\mariadb
set DATE=%date:~-4,4%%date:~-10,2%%date:~-7,2%
mysqldump -u root -p[password] startup_core > %BACKUP_DIR%\startup_core_%DATE%.sql
echo Backup completed: %BACKUP_DIR%\startup_core_%DATE%.sql

# Schedule using Task Scheduler (Windows)
# Or cron (if using WSL/Linux)
```

---

## 📈 Performance Optimization

### Recommended MariaDB Configuration

```ini
# Add to my.cnf or my.ini
[mysqld]
# InnoDB settings
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# Query cache (if using MariaDB < 10.5)
query_cache_type = 1
query_cache_size = 64M

# Connection settings
max_connections = 200
connect_timeout = 10

# Character set
character_set_server = utf8mb4
collation_server = utf8mb4_unicode_ci
```

### Monitoring Queries

```sql
-- Enable query logging
SET GLOBAL general_log = 'ON';
SET GLOBAL general_log_file = '/var/log/mysql/queries.log';

-- Check for missing indexes
SELECT * FROM sys.schema_tables_with_full_table_scans;

-- Monitor connections
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Threads_running';
```

---

## 📝 Documentation Template

Create a file documenting your specific database schema:

```markdown
# Database Schema Documentation

## Connection Details
- Host: 127.0.0.1
- Port: 3306
- Database: startup_core
- User: startup_user

## Key Tables
1. **users** - User accounts
   - Primary key: id
   - Indexes: email (unique)

2. **administrators** - Admin accounts
   - Primary key: id
   - Foreign keys: role_id

3. **startups** - Startup profiles
   - Primary key: id
   - Foreign keys: user_id

[Add more tables as discovered]

## Test Accounts
- Admin: admin@example.com / [password]
- User: user@example.com / [password]

## Migration History
- 2025-01-XX: Initial import from production backup
- [Add subsequent changes]
```

---

## 🎯 Summary

This guide covers:
- ✅ MariaDB installation and setup
- ✅ Database import procedures
- ✅ Backend configuration
- ✅ Testing and validation
- ✅ Troubleshooting common issues
- ✅ Security best practices
- ✅ Performance optimization

**Next Steps:**
1. Install MariaDB
2. Wait for database dump
3. Follow import process
4. Configure backend
5. Test integration
6. Validate data integrity
7. Deploy to production (when ready)

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Author:** Cline AI Assistant

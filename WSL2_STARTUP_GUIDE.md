# 🚀 StartupPH WSL2 Development Setup Guide

## Overview
This guide shows you how to start your StartupPH development environment using WSL2 for **maximum performance**. 

**Performance Improvement:** API responses went from **3-5 seconds** to **1-28 milliseconds** (100x faster!)

---

## 📋 Prerequisites
- ✅ Windows 10/11 with WSL2 installed
- ✅ Docker Desktop with WSL2 integration enabled
- ✅ Ubuntu distribution installed in WSL2
- ✅ VS Code with "Remote - WSL" extension

---

## 🔧 Every Time You Start Your Laptop

### **Step 1: Start Docker Desktop**
1. **Open Docker Desktop** (Windows application)
2. **Wait** for it to fully start (green whale icon in system tray)
3. Verify **WSL Integration** is enabled:
   - Settings → Resources → WSL Integration
   - Ubuntu toggle should be **ON**

### **Step 2: Open Ubuntu Terminal**

**Option A: Windows Terminal (Recommended)**
```powershell
# Press Win + X → Click "Windows Terminal"
# Click dropdown arrow next to + → Select "Ubuntu"
```

**Option B: Direct WSL Command**
```powershell
# Press Win + R → Type: wsl -d Ubuntu
wsl -d Ubuntu
```

### **Step 3: Start Backend (Docker Containers)**
```bash
cd ~/projects/startupph/start-up-ws-main/start-up-ws-main
docker-compose up -d
```

**Expected Output:**
```
[+] Running 6/6
 ✔ Container start-up-ws-main-redis     Running
 ✔ Container start-up-ws-main-mailpit   Running  
 ✔ Container start-up-ws-main-database  Started
 ✔ Container start-up-ws-main-es        Started
 ✔ Container start-up-ws-main-app       Started
 ✔ Container start-up-ws-main-nginx     Running
```

### **Step 4: Start Frontend (Next.js)**
```bash
cd ~/projects/startupph/startup-ph-ui-prod/startup-ph-ui-prod
npm run dev
```

**Expected Output:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully
```

**⚠️ Keep this terminal open** - it's running your frontend server

### **Step 5: Open VS Code in WSL Mode**

**Option A: From Ubuntu Terminal**
```bash
cd ~/projects/startupph
code .
```

**Option B: From VS Code Command Palette**
1. Open VS Code
2. Press `Ctrl+Shift+P`
3. Type: `WSL: Open Folder in WSL`
4. Navigate to: `/home/tonky/projects/startupph`

**✅ Verify:** Look for **"WSL: Ubuntu"** in the bottom-left corner of VS Code

### **Step 6: Access Your Applications**
| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend Website** | http://localhost:3000 | Main StartupPH application |
| **Backend API** | http://localhost:8080 | Laravel API endpoints |
| **Email Testing** | http://localhost:8025 | Mailpit - view sent emails |

---

## ⚡ Quick Start Commands

### **All-in-One Startup (Copy & Paste)**
```bash
# Start backend
cd ~/projects/startupph/start-up-ws-main/start-up-ws-main && docker-compose up -d

# Start frontend (run in separate terminal tab)
cd ~/projects/startupph/startup-ph-ui-prod/startup-ph-ui-prod && npm run dev

# Open VS Code
cd ~/projects/startupph && code .
```

### **Status Check Commands**
```bash
# Check Docker containers
docker ps

# Test backend API (should respond in ~1ms)
curl -w "Time: %{time_total}s\n" -s http://localhost:8080 -o /dev/null

# Test frontend
curl -s http://localhost:3000 | head -5
```

### **Stop Everything**
```bash
# Stop frontend: Press Ctrl+C in the npm terminal

# Stop backend containers
cd ~/projects/startupph/start-up-ws-main/start-up-ws-main
docker-compose down
```

---

## 📁 File Structure in WSL2

```
/home/tonky/projects/startupph/
├── README.md
├── config-backup/           # Environment configuration backups
├── start-up-ws-main/        # Laravel backend + Docker setup
│   └── start-up-ws-main/
│       ├── docker-compose.yml
│       ├── project/         # Laravel application
│       └── .env            # Docker environment variables
├── startup-core-ui-prod/    # Core UI components
└── startup-ph-ui-prod/      # Next.js frontend
    └── startup-ph-ui-prod/
        ├── src/            # React components, pages, hooks
        ├── package.json
        └── .env.local      # Frontend environment variables
```

---

## 🛠️ Development Workflow

### **Making Code Changes**
1. **Edit files** in VS Code (WSL mode)
2. **Frontend:** Changes auto-reload at http://localhost:3000
3. **Backend:** Changes require container restart for some files

### **Git Operations**
```bash
# All git commands work normally in WSL2
cd ~/projects/startupph
git status
git add .
git commit -m "Your commit message"
git push origin main
```

### **Installing New Dependencies**

**Frontend (npm packages):**
```bash
cd ~/projects/startupph/startup-ph-ui-prod/startup-ph-ui-prod
npm install package-name
```

**Backend (Composer packages):**
```bash
cd ~/projects/startupph/start-up-ws-main/start-up-ws-main
docker-compose exec app composer install package-name
```

---

## 🔧 Advanced Setup (Optional)

### **Create Startup Script**
```bash
# Create automated startup script
nano ~/start-startupph.sh
```

**Script Content:**
```bash
#!/bin/bash
echo "🚀 Starting StartupPH Development Environment..."

# Start backend
echo "📦 Starting Docker containers..."
cd ~/projects/startupph/start-up-ws-main/start-up-ws-main
docker-compose up -d

# Wait for containers to be ready
echo "⏳ Waiting for containers to start..."
sleep 10

# Test backend
echo "🔍 Testing backend API..."
curl -s http://localhost:8080 > /dev/null && echo "✅ Backend ready!" || echo "❌ Backend not responding"

# Start frontend in background
echo "🎨 Starting frontend..."
cd ~/projects/startupph/startup-ph-ui-prod/startup-ph-ui-prod
npm run dev &

# Open VS Code
echo "💻 Opening VS Code..."
cd ~/projects/startupph
code .

echo "🎉 StartupPH is ready!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8080"
echo "📧 Email: http://localhost:8025"
```

**Make executable and run:**
```bash
chmod +x ~/start-startupph.sh
bash ~/start-startupph.sh
```

---

## 🐛 Troubleshooting

### **Common Issues**

**❌ Problem:** `docker-compose: command not found`
**✅ Solution:** 
1. Open Docker Desktop → Settings → Resources → WSL Integration
2. Enable toggle for **Ubuntu**
3. Click **Apply & Restart**

**❌ Problem:** `Port 3000 already in use`
**✅ Solution:**
```bash
# Kill process using port 3000
kill -9 $(lsof -ti:3000)
# Or use different port
npm run dev -- -p 3001
```

**❌ Problem:** VS Code not opening in WSL mode
**✅ Solution:**
1. Install "Remote - WSL" extension in VS Code
2. Press `Ctrl+Shift+P` → Type "WSL: Reload Window"

**❌ Problem:** Slow file I/O or "I/O error"
**✅ Solution:** You're probably in Windows filesystem instead of WSL2
```bash
# Make sure you're in WSL2 filesystem
pwd  # Should show /home/tonky/projects/startupph
```

**❌ Problem:** API still slow (>100ms response)
**✅ Solution:** You might be running from Windows instead of WSL2
```bash
# Test from WSL2 terminal
curl -w "Time: %{time_total}s\n" -s http://localhost:8080 -o /dev/null
# Should show: Time: 0.001s or similar
```

### **Performance Verification**

**Test API Speed:**
```bash
# Should be < 50ms from WSL2
time curl -s http://localhost:8080 > /dev/null

# Multiple tests
for i in {1..5}; do
  curl -w "Test $i: %{time_total}s\n" -s http://localhost:8080 -o /dev/null
done
```

**Expected Results:**
- ✅ **WSL2:** 0.001s - 0.050s (1-50ms)
- ❌ **Windows:** 1.000s - 5.000s (1-5 seconds)

---

## 📊 Performance Comparison

| Metric | Windows Filesystem | WSL2 Linux Filesystem | Improvement |
|--------|-------------------|----------------------|-------------|
| API Response Time | 3-5 seconds | 1-28 milliseconds | **100x faster** |
| npm install | 2-5 minutes | 15-30 seconds | **10x faster** |
| File I/O Operations | Slow | Native Linux speed | **5-10x faster** |
| Docker Container Startup | 30-60 seconds | 5-15 seconds | **4x faster** |

---

## 🎯 Tips for Maximum Productivity

### **VS Code Extensions (Install in WSL mode)**
- Remote - WSL ✅ (Required)
- Thunder Client (API testing)
- Docker (Container management)
- GitLens (Enhanced Git)
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

### **Terminal Shortcuts**
```bash
# Add to ~/.bashrc for quick aliases
alias startupph='cd ~/projects/startupph'
alias frontend='cd ~/projects/startupph/startup-ph-ui-prod/startup-ph-ui-prod'
alias backend='cd ~/projects/startupph/start-up-ws-main/start-up-ws-main'
alias logs='docker-compose logs -f'
```

### **Git Configuration**
```bash
# Configure git in WSL2 (one-time setup)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 🔄 Updating the Project

### **Pull Latest Changes**
```bash
cd ~/projects/startupph
git pull origin main

# Update frontend dependencies
cd startup-ph-ui-prod/startup-ph-ui-prod
npm install

# Restart containers to apply backend changes
cd ~/projects/startupph/start-up-ws-main/start-up-ws-main
docker-compose down
docker-compose up -d
```

---

## 📝 Environment Variables

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_END_POINT=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3000
# ... GCS and other config
```

**Backend Docker (.env):**
```env
COMPOSE_PROJECT_NAME=start-up-ws-main
COMPOSE_WEBSERVER_PORT=8080
COMPOSE_ES_PORT=9200
```

**Backend Laravel (project/.env):**
```env
APP_URL=http://localhost:8080
DB_HOST=database
MAIL_HOST=mailpit  # For development
CACHE_DRIVER=redis # For better performance
```

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ **VS Code shows "WSL: Ubuntu"** in bottom-left corner
2. ✅ **API responds in <50ms:** `curl -w "%{time_total}s" http://localhost:8080`
3. ✅ **Frontend loads instantly:** http://localhost:3000
4. ✅ **No file I/O errors** in terminal output
5. ✅ **Hot reload works** - code changes appear immediately in browser

---

**🚀 Enjoy your blazing-fast StartupPH development environment!**

---

*Last Updated: October 30, 2025*  
*Performance: 100x faster than Windows filesystem*  
*Status: Production-ready development setup* ✅
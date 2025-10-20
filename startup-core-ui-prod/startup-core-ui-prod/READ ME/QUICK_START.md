# Quick Start Guide - Startup Core UI

## 🚀 Get Started in 5 Minutes

This is a condensed version of the setup process. For detailed instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md).

---

## Step 1: Install Node.js (if not installed)

Download and install Node.js 16.13.0 or higher from: https://nodejs.org/

Verify installation:
```bash
node --version
npm --version
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

---

## Step 3: Configure Environment

Create `.env` file:
```bash
copy .env.dist .env
```

Edit `.env` and set:
```env
VITE_WS_ENDPOINT=http://localhost:8000
VITE_UCARE_PUBKEY=your_uploadcare_public_key_here
COMPOSE_PROJECT_NAME=start-up-core
COMPOSE_WEBSERVER_PORT=3000
```

> **Note:** Replace `http://localhost:8000` with your backend API URL when available.

---

## Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

---

## 📚 Full Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions, troubleshooting, and project details
- **[DATABASE_MIGRATION_GUIDE.md](DATABASE_MIGRATION_GUIDE.md)** - MariaDB setup and database import guide
- **[.env.example](.env.example)** - Environment variables reference

---

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Start with Docker
docker-compose up --build
```

---

## ⚡ What's Next?

### Right Now (Frontend Only)
- ✅ Start development server
- ✅ Explore the codebase
- ✅ Customize UI components
- ✅ Review project structure

### When Backend Arrives
1. **Receive Backend:**
   - Backend codebase
   - Database dump (.sql file)
   - API documentation
   - Backend credentials

2. **Setup Backend:**
   - Install backend dependencies
   - Configure backend `.env`
   - Start backend server

3. **Setup Database:**
   - Install MariaDB
   - Import database dump
   - Configure connection

4. **Integrate:**
   - Update frontend `VITE_WS_ENDPOINT`
   - Test authentication
   - Verify data flow

See [DATABASE_MIGRATION_GUIDE.md](DATABASE_MIGRATION_GUIDE.md) for detailed instructions.

---

## 🆘 Need Help?

### Common Issues

**Port 5173 already in use:**
```bash
npm run dev -- --port 5174
```

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Backend connection errors:**
- Verify backend is running
- Check `VITE_WS_ENDPOINT` in `.env`
- Check CORS configuration on backend

For more troubleshooting, see [SETUP_GUIDE.md](SETUP_GUIDE.md#troubleshooting).

---

## 📋 Project Info

- **Framework:** React 18.2.0 + TypeScript 4.9.3
- **Build Tool:** Vite 4.1.0
- **Styling:** TailwindCSS 3.2.7
- **State:** React Query 4.24.10
- **Type:** Frontend Only (connects to separate backend API)

---

## 🎯 Current Status

**You Have:**
- ✅ Frontend React application
- ✅ Docker configuration
- ✅ Development environment ready

**You Need:**
- ⏳ Backend API server
- ⏳ MariaDB database dump
- ⏳ Backend documentation

**Ready:**
- ✅ Frontend development can start now
- ✅ Backend integration prepared
- ✅ Database migration documented

---

**Quick Links:**
- Full Setup Guide: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Database Guide: [DATABASE_MIGRATION_GUIDE.md](DATABASE_MIGRATION_GUIDE.md)
- Environment Config: [.env.example](.env.example)

# Desktop Setup Instructions

Follow these steps to set up the Startup PH project on your desktop computer.

---

## Prerequisites

- Git installed
- Node.js installed (v16 or higher)
- Docker Desktop installed and running
- Visual Studio Code (recommended)

---

## Step 1: Clone/Pull the Repository

If you haven't cloned the repository yet:
```powershell
cd C:\Users\YourUsername\Documents\GitHub
git clone https://github.com/DICT-ORG/startupph.git
cd startupph
```

If you already have the repository:
```powershell
cd C:\Users\YourUsername\Documents\GitHub\startupph
git pull origin main
```

---

## Step 2: Install Frontend Dependencies

```powershell
cd startup-ph-ui-prod\startup-ph-ui-prod
npm install
```

This will install all required packages including `@google-cloud/storage`.

---

## Step 3: Set Up Environment Variables (CRITICAL!)

Create a `.env.local` file in `startup-ph-ui-prod\startup-ph-ui-prod\` directory:

**IMPORTANT:** You need to copy this file from your laptop or create it manually.

### Option A: Copy from Laptop
1. On your laptop, copy the `.env.local` file from:
   ```
   C:\Users\DICT PC-User\Documents\GitHub\startupph\startup-ph-ui-prod\startup-ph-ui-prod\.env.local
   ```
2. Transfer it securely to your desktop via:
   - USB drive
   - OneDrive (in a private folder)
   - Email (to yourself only)
3. Place it in the same location on your desktop:
   ```
   C:\Users\YourUsername\Documents\GitHub\startupph\startup-ph-ui-prod\startup-ph-ui-prod\.env.local
   ```

### Option B: Create Manually
Create the file `.env.local` with this content:

```env
NEXT_PUBLIC_UPLOADCARE_PUB_KEY=demopublickey
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v2
NEXT_PUBLIC_ELASTIC_URL=http://localhost:9200

# Google Cloud Storage Configuration
NEXT_PUBLIC_GCS_BUCKET_NAME=startup-ph-uploads-2025
GCS_PROJECT_ID=startup-ph-storage
GCS_CLIENT_EMAIL=storage-uploader@startup-ph-storage.iam.gserviceaccount.com
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_FULL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**⚠️ REPLACE `YOUR_FULL_PRIVATE_KEY_HERE` with the actual private key from your service account JSON file!**

The private key should be the complete multi-line key with `\n` characters preserved.

---

## Step 4: Start Docker Backend Services

```powershell
cd C:\Users\YourUsername\Documents\GitHub\startupph\start-up-ws-main\start-up-ws-main
docker-compose up -d
```

Wait for all containers to start (about 1-2 minutes).

### Verify Docker is running:
```powershell
docker ps
```

You should see containers for:
- MySQL database
- Elasticsearch
- Laravel backend
- Nginx

---

## Step 5: Start the Frontend Development Server

```powershell
cd C:\Users\YourUsername\Documents\GitHub\startupph\startup-ph-ui-prod\startup-ph-ui-prod
npm run dev
```

Wait for the server to start. You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from C:\...\startup-ph-ui-prod\.env.local
```

---

## Step 6: Access the Application

Open your browser and go to:
```
http://localhost:3000
```

---

## Verification Checklist

✅ All npm packages installed (including `@google-cloud/storage`)  
✅ `.env.local` file created with correct Google Cloud credentials  
✅ Docker containers running (check with `docker ps`)  
✅ Backend API responding at `http://localhost:8080`  
✅ Frontend running at `http://localhost:3000`  
✅ `.env.local` loaded (check terminal output)

---

## Testing the Setup

1. **Test File Upload:**
   - Go to http://localhost:3000/profile
   - Try uploading a logo (PNG/JPG)
   - Try uploading proof of registration (PDF or DOCX)
   - Files should upload to Google Cloud Storage

2. **Check Upload Success:**
   - Uploads should show progress bar
   - Files should appear in your Google Cloud Storage bucket
   - Visit: https://console.cloud.google.com/storage/browser/startup-ph-uploads-2025

---

## Troubleshooting

### Problem: "Module not found: @google-cloud/storage"
**Solution:** Run `npm install` again in the `startup-ph-ui-prod\startup-ph-ui-prod` directory.

### Problem: Docker containers not starting
**Solution:** 
```powershell
docker-compose down
docker-compose up -d
```

### Problem: Port 3000 already in use
**Solution:**
```powershell
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Problem: Environment variables not loading
**Solution:**
- Make sure `.env.local` is in the correct directory
- Restart the dev server (Ctrl+C then `npm run dev`)
- Check that the private key has `\n` escape sequences preserved

### Problem: File uploads failing
**Solution:**
- Verify `.env.local` has correct GCS credentials
- Check Google Cloud Console that the bucket exists
- Make sure the private key is properly formatted with quotes

---

## Important Notes

### Security
- **NEVER** commit `.env.local` to Git (already protected by `.gitignore`)
- **NEVER** share your Google Cloud private key publicly
- Keep the service account JSON file secure

### Google Cloud Storage
- **Bucket Name:** startup-ph-uploads-2025
- **Region:** asia-southeast1 (Singapore)
- **Estimated Cost:** ~$2/month
- All uploaded files are publicly accessible at:
  ```
  https://storage.googleapis.com/startup-ph-uploads-2025/uploads/filename
  ```

### Development Workflow
1. Always pull latest changes: `git pull origin main`
2. Start Docker: `docker-compose up -d`
3. Start frontend: `npm run dev`
4. Work on your changes
5. Commit and push: `git add .` → `git commit -m "message"` → `git push origin main`

---

## Quick Commands Reference

```powershell
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Start Docker
docker-compose up -d

# Check Docker status
docker ps

# Start dev server
npm run dev

# Stop Docker
docker-compose down

# Kill node processes
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
```

---

## Need Help?

- Check the `GOOGLE_CLOUD_STORAGE_SETUP.md` for GCS details
- Check the `GCS_QUICK_START.md` for troubleshooting
- Review the README files in each project folder

---

**Last Updated:** January 24, 2025  
**Project:** Startup PH Platform  
**Setup Type:** Google Cloud Storage with Next.js Frontend

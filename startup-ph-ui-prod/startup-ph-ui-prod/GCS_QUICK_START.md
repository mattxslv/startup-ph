# ✅ Google Cloud Storage - Quick Start

## What We Did

Replaced Uploadcare with Google Cloud Storage for file uploads. This gives you:

- ✅ **Full control** over file storage
- ✅ **Better pricing** - Much cheaper than Uploadcare
- ✅ **No file type restrictions** - Upload any file type
- ✅ **Faster uploads** - Direct browser-to-cloud uploads
- ✅ **Philippine hosting** - Can use Singapore servers (asia-southeast1)

## Files Created/Modified

### New Files:
1. **GOOGLE_CLOUD_STORAGE_SETUP.md** - Complete setup instructions
2. **src/pages/api/upload/generate-signed-url.ts** - API for secure uploads
3. **src/hooks/useGCSFileUploader.tsx** - Upload hook
4. **.env.gcs.example** - Environment variable template

### Modified Files:
1. **src/ui/file-uploader/UploadcareFileUploader.tsx** - Now uses GCS
2. **src/ui/file-uploader/LogoUploader.tsx** - Now uses GCS
3. **.gitignore** - Added protection for service account files

## Next Steps (Required!)

### 1. Set Up Google Cloud (30 minutes)

Follow the detailed instructions in **GOOGLE_CLOUD_STORAGE_SETUP.md**:

```bash
1. Create Google Cloud account (free tier available)
2. Create new project: "startup-ph-storage"
3. Enable Cloud Storage API
4. Create storage bucket: "startup-ph-uploads"
5. Configure CORS for browser uploads
6. Make bucket public
7. Create service account
8. Download service account JSON key
```

### 2. Install Dependencies

Already done! The package is installed:
```bash
✅ @google-cloud/storage
```

### 3. Configure Environment Variables

Add to your `.env.local`:

```env
# Public bucket name
NEXT_PUBLIC_GCS_BUCKET_NAME=startup-ph-uploads

# Server-side credentials (from service account JSON)
GCS_PROJECT_ID=your-project-id
GCS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-key-here\n-----END PRIVATE KEY-----\n"
```

**Important:** Get these values from the service account JSON file you download in step 7.

### 4. Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## How It Works

### Before (Uploadcare):
```
Browser → Uploadcare Servers → Your Database
         (Limited file types, expensive)
```

### After (Google Cloud Storage):
```
Browser → Your API (generate signed URL) → Google Cloud Storage → Public URL
         (Any file type, cheap, fast)
```

### The Upload Flow:

1. **User selects file** in browser
2. **Frontend requests signed URL** from `/api/upload/generate-signed-url`
3. **API generates secure upload URL** (valid for 15 minutes)
4. **Browser uploads directly** to Google Cloud Storage
5. **Public URL returned** to save in database

## Testing

After setup, test by:

1. Go to `/profile` page
2. Try uploading:
   - Logo (PNG/JPG)
   - Banner (PNG/JPG)
   - Proof of registration (PDF/DOCX) ← This was failing before!
3. Check files appear in Google Cloud Console

## Pricing Comparison

### Uploadcare (Current):
- Free tier: Very limited
- Paid: $25/month minimum
- File restrictions: Yes

### Google Cloud Storage (New):
- Free tier: 5GB storage + 1GB transfer/month
- After free tier: ~$1-3/month for typical usage
- File restrictions: None (you control it)

### Example Monthly Cost:
- **10 GB storage**: $0.20
- **100,000 uploads**: $0.50
- **10 GB downloads**: $1.20
- **Total**: ~$2/month vs $25/month! 💰

## Security Notes

🔒 **Important Security Practices:**

1. ✅ Service account JSON file is in `.gitignore`
2. ✅ Environment variables are server-side only
3. ✅ Signed URLs expire after 15 minutes
4. ✅ File size limits enforced (25MB general, 50MB banners)
5. ✅ File type validation on upload

## Troubleshooting

### "Cannot find module '@google-cloud/storage'"
```bash
npm install @google-cloud/storage
```

### "Invalid credentials"
- Check `.env.local` has correct values from service account JSON
- Ensure `GCS_PRIVATE_KEY` has `\n` escaped properly
- Restart dev server after changing env variables

### "Bucket not found"
- Verify bucket name in Google Cloud Console
- Check `NEXT_PUBLIC_GCS_BUCKET_NAME` matches exactly

### "Upload failed"
- Check CORS is configured on bucket
- Verify bucket is public (allUsers has Storage Object Viewer role)
- Check browser console for detailed error

## Support

If you encounter issues:
1. Check `GOOGLE_CLOUD_STORAGE_SETUP.md` for detailed setup
2. Verify all environment variables are set
3. Check Google Cloud Console for bucket/permissions
4. Test API endpoint: http://localhost:3000/api/upload/generate-signed-url

---

**Ready to go!** Follow the setup guide and you'll have full control over file uploads with no restrictions! 🚀

# Google Cloud Storage Setup Guide

## Prerequisites
1. Google Cloud Account (free tier available)
2. Credit card for verification (won't be charged on free tier)

## Step 1: Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click "Select a Project" → "New Project"
3. Name it: `startup-ph-storage`
4. Click "Create"

## Step 2: Enable Cloud Storage API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Cloud Storage API"
3. Click "Enable"

## Step 3: Create Storage Bucket

1. Go to "Cloud Storage" → "Buckets"
2. Click "Create Bucket"
3. Configure:
   - **Name**: `startup-ph-uploads` (must be globally unique)
   - **Location type**: Region
   - **Region**: `asia-southeast1` (Singapore - closest to Philippines)
   - **Storage class**: Standard
   - **Access control**: Fine-grained
   - **Protection tools**: None (for now)
4. Click "Create"

## Step 4: Configure CORS (Allow browser uploads)

1. Click on your bucket name
2. Go to "Permissions" tab
3. Click "Add" under CORS configuration
4. Add this configuration:

```json
[
  {
    "origin": ["http://localhost:3000", "https://yourdomain.com"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```

Or use Google Cloud Shell:
```bash
echo '[{"origin": ["*"],"method": ["GET", "POST", "PUT", "DELETE"],"responseHeader": ["Content-Type"],"maxAgeSeconds": 3600}]' > cors.json
gsutil cors set cors.json gs://startup-ph-uploads
```

## Step 5: Make Bucket Public (for CDN-like access)

1. In your bucket, click "Permissions"
2. Click "Grant Access"
3. Add:
   - **New principals**: `allUsers`
   - **Role**: Storage Object Viewer
4. Click "Save"

## Step 6: Create Service Account

1. Go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Configure:
   - **Name**: `storage-uploader`
   - **Description**: `Service account for file uploads`
4. Click "Create and Continue"
5. Grant role: "Storage Object Creator" and "Storage Object Viewer"
6. Click "Continue" → "Done"

## Step 7: Generate Service Account Key

1. Click on your service account email
2. Go to "Keys" tab
3. Click "Add Key" → "Create New Key"
4. Choose "JSON"
5. Click "Create" - a JSON file will download
6. **IMPORTANT**: Keep this file secure!

## Step 8: Add to Your Project

1. Save the JSON file to your project as:
   ```
   startup-ph-ui-prod/startup-ph-ui-prod/gcs-service-account.json
   ```

2. Add to `.gitignore`:
   ```
   gcs-service-account.json
   ```

3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GCS_BUCKET_NAME=startup-ph-uploads
   GCS_PROJECT_ID=your-project-id
   GCS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

## Step 9: Install Dependencies

```bash
npm install @google-cloud/storage
```

## Pricing (Very Affordable!)

**Free Tier:**
- 5 GB storage per month
- 1 GB network egress per month
- 5,000 Class A operations (writes)
- 50,000 Class B operations (reads)

**After Free Tier:**
- Storage: $0.020/GB/month (Asia region)
- Class A operations: $0.05 per 10,000 operations
- Class B operations: $0.004 per 10,000 operations
- Network egress: $0.12/GB (to Asia)

**Example Cost:**
- 10 GB storage + 100,000 uploads/month = ~$1.50/month

## Security Best Practices

1. ✅ Never commit service account JSON to git
2. ✅ Use environment variables for credentials
3. ✅ Set bucket lifecycle rules to delete old files
4. ✅ Enable object versioning for important files
5. ✅ Use signed URLs for private file access

## Next Steps

After setup, the code will automatically:
- Upload files directly to Google Cloud Storage
- Generate public URLs for uploaded files
- Handle progress tracking
- Validate file types and sizes
- Clean up failed uploads

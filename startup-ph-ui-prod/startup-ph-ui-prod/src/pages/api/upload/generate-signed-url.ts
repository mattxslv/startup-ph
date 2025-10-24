import { Storage } from '@google-cloud/storage';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucket = storage.bucket(process.env.NEXT_PUBLIC_GCS_BUCKET_NAME!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, contentType } = req.body;

    if (!fileName || !contentType) {
      return res.status(400).json({ error: 'fileName and contentType are required' });
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `uploads/${timestamp}-${sanitizedFileName}`;

    // Create file reference
    const file = bucket.file(uniqueFileName);

    // Generate signed URL for upload (valid for 15 minutes)
    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType,
    });

    // Generate public URL (after upload completes)
    const publicUrl = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_GCS_BUCKET_NAME}/${uniqueFileName}`;

    return res.status(200).json({
      signedUrl,
      publicUrl,
      fileName: uniqueFileName,
    });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return res.status(500).json({ error: 'Failed to generate upload URL' });
  }
}

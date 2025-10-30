<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * Generate a signed URL for Google Cloud Storage upload
     */
    public function generateSignedUrl(Request $request)
    {
        $request->validate([
            'fileName' => 'required|string',
            'contentType' => 'required|string',
        ]);

        $bucketName = env('GCS_BUCKET_NAME', 'startup-ph-uploads-2025');
        $fileName = time() . '-' . Str::slug(pathinfo($request->fileName, PATHINFO_FILENAME)) . '.' . pathinfo($request->fileName, PATHINFO_EXTENSION);
        $filePath = 'uploads/' . $fileName;

        // For development/testing, we'll generate a simple URL structure
        // In production, you would use Google Cloud Storage SDK to generate actual signed URLs
        $publicUrl = "https://storage.googleapis.com/{$bucketName}/{$filePath}";
        
        // Note: For actual GCS signed URLs, you would need to:
        // 1. Install google/cloud-storage package
        // 2. Use StorageClient to generate proper signed URLs
        // This is a simplified version for development

        return response()->json([
            'signedUrl' => $publicUrl, // This would be a time-limited signed URL in production
            'publicUrl' => $publicUrl,
            'fileName' => $fileName,
            'filePath' => $filePath,
        ]);
    }

    /**
     * Handle direct file upload (fallback)
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:' . (50 * 1024), // 50MB
        ]);

        $file = $request->file('file');
        
        // Generate unique filename
        $fileName = time() . '-' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
        
        // Store in public storage
        $path = $file->storeAs('uploads', $fileName, 'public');
        
        $url = url('storage/' . $path);

        return response()->json([
            'data' => [
                'file_name' => $fileName,
                'file_size' => $file->getSize(),
                'file_size_human' => $this->formatBytes($file->getSize()),
                'mime_type' => $file->getMimeType(),
                'url' => $url,
            ],
        ]);
    }

    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));
        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}

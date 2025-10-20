<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class EgovUploadService
{
    /**
     * @var string
     */
    protected $url;

    /**
     * @var string
     */
    protected $apiKey;

    /**
     * EtravelService constructor
     */
    public function __construct()
    {
        $this->url = config('egov.upload.egov_upload_access_url');

        $this->apiKey = config('egov.upload.egov_upload_api_key');
    }

    /**
     * Upload
     *
     * @param string $fileUrl
     * @return void
     */
    public function upload(string $fileUrl)
    {
        $file = Http::get($fileUrl);
        $extName = '.' . $this->getExtensionName($file);
        $fileName = trim(basename($fileUrl), $extName) . $extName;

        $response = Http::withHeader('X-Api-Key', $this->apiKey)
            ->attach('file', $file->body(), $fileName)
            ->post($this->url);

        if ($response->failed()) {
            $response->throw();
        }

        return $response->json()['data']['url'];
    }

    /**
     * Get extension name
     *
     * @param mixed $file
     * @return string
     */
    protected function getExtensionName($file): string
    {
        $contentType = $file->header('Content-Type');
        $sections = explode('/', $contentType);
        return end($sections);
    }
}

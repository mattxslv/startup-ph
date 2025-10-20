<?php

namespace App\Models\Startups\Traits;

use App\Services\EgovUploadService;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

trait StartupHasFileUploads
{
    /**
     * @inheritDoc
     */
    public function getFileColumns(): array
    {
        return [
            'logo_url',
            'proof_of_registration_url',
            'photo_url',
            'presentation_url',
            'video_url',
            'content',
        ];
    }

    /**
     * @inheritDoc
     */
    public function queryFileRecords(int $limit, int $offset = 0, string $column = null): Collection
    {
        $applications = self::select('id')
            // ->whereNotNull($column)
            ->where($column, 'like', "%ucarecdn.com%")
            ->limit($limit)
            ->offset($offset);
        // dd($applications->toSql());
        return $applications->get();
    }

    /**
     * @inheritDoc
     */
    public function reuploadFiles(string $column = null): void
    {
        if ($column != 'content') {
            try {
                if ($fileUrl = $this->$column) {
                    if (str_contains($fileUrl, 'ucarecdn.com')) {
                        $this->$column = (new EgovUploadService())->upload($fileUrl);
                    }
                }
            } catch (\Throwable $e) {
                Log::error([
                    'model' => 'StartUp',
                    'id' => $this->id,
                    'column' => $column,
                    'file_url' => $fileUrl,
                    'error' => $e->getMessage(),
                ]);

                throw $e;
            }
        }

        if ($column == 'content') {
            $this->content = collect($this->content)
                ->map(function ($value) {
                    return $this->processContentValues($value);
                })
                ->toArray();
        }

        $this->save();
    }

    /**
     * Process content values
     *
     * @param mixed $value
     * @return mixed
     */
    protected function processContentValues($value)
    {
        try {
            if (is_array($value)) {
                return collect($value)->map(function ($value) {
                    return $this->processContentValues($value);
                })
                ->toArray();
            }

            if (is_string($value) && str_contains($value, 'ucarecdn.com')) {
                return (new EgovUploadService())->upload($value);
            }

            return $value;
        } catch (\Throwable $e) {
            Log::error([
                'model' => 'StartUp',
                'id' => $this->id,
                'column' => 'content',
                'value' => $value,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }
}

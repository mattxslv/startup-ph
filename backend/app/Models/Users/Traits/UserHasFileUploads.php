<?php

namespace App\Models\Users\Traits;

use App\Models\Users\User;
use App\Services\EgovUploadService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

trait UserHasFileUploads
{
    /**
     * @inheritDoc
     */
    public function getFileColumns(): array
    {
        return [
            'photo_url',
            'identification_url',
        ];
    }

    /**
     * @inheritDoc
     */
    public function queryFileRecords(int $limit, int $offset = 0, string $column = null): Collection
    {
        $users = User::select('id')
            // ->whereNotNull($column)
            ->where($column, 'like', "%ucarecdn.com%")
            ->limit($limit)
            ->offset($offset);
        // dd($users->toSql());
        return $users->get();
    }

    /**
     * @inheritDoc
     */
    public function reuploadFiles(string $column = null): void
    {
        try {
            if ($fileUrl = $this->$column) {
                if (str_contains($fileUrl, 'ucarecdn.com')) {
                    $this->$column = (new EgovUploadService())->upload($fileUrl);
                }
            }
        } catch (\Throwable $e) {
            Log::error([
                'model' => 'user',
                'id' => $this->id,
                'column' => $column,
                'file_url' => $fileUrl,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }

        $this->save();
    }
}

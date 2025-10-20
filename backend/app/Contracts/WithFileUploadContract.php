<?php

namespace App\Contracts;

use Illuminate\Support\Collection;

interface WithFileUploadContract
{
    /**
     * Get file columns
     *
     * @return array
     */
    public function getFileColumns(): array;

    /**
     * Query file records
     *
     * @param integer $limit
     * @param integer $offset
     * @param string|null $column
     * @return Collection
     */
    public function queryFileRecords(int $limit, int $offset = 0, string $column = null): Collection;

    /**
     * Reupload files
     *
     * @param string|null $column
     * @return void
     */
    public function reuploadFiles(string $column = null): void;
}

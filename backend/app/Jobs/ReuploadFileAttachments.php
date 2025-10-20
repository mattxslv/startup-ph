<?php

namespace App\Jobs;

use App\Contracts\WithFileUploadContract;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ReuploadFileAttachments implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected WithFileUploadContract $record,
        protected string $column
    ) {
        $this->onQueue('files');
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->record->reuploadFiles($this->column);
    }
}

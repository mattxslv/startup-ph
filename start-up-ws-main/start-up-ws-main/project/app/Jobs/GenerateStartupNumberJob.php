<?php

namespace App\Jobs;

use App\Models\Startups\Startup;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateStartupNumberJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(protected string $id)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($startup = Startup::getById($this->id)) {
            $startup->generateStartupNumber();
        }
    }
}

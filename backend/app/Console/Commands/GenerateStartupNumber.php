<?php

namespace App\Console\Commands;

use App\Jobs\GenerateStartupNumberJob;
use App\Models\Startups\Startup;
use Illuminate\Console\Command;

class GenerateStartupNumber extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:startup:number';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate startup number';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->line('Number generation started!');

        $startups = Startup::query()
            ->whereNull('startup_number')
            ->get('id');

        $bar = $this->output->createProgressBar($startups->count());

        $startups->each(function ($startup) use ($bar) {
            GenerateStartupNumberJob::dispatch($startup->id);

            $bar->advance();
        });

        $bar->finish();
        $this->newLine();
        $this->info('Generation queueing finished!');
    }
}

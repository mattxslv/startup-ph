<?php

namespace App\Console\Commands;

use App\Contracts\WithFileUploadContract;
use App\Jobs\ReuploadFileAttachments;
use App\Models\Startups\Startup;
use App\Models\Users\User;
use Illuminate\Console\Command;

class MigrateFileUploads extends Command
{
    protected $models = [
        'user' => User::class,
        'startup' => Startup::class,
    ];

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $limit = 10000;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:file:uploads {model : Select Model} {column : Select column} {--batch=1 : Batch}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate File Uploads';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!$className = ($this->models[$this->argument('model')] ?? null)) {
            $this->error('Invalid model selected!');
            return;
        }

        $model = new $className();
        $column = $this->argument('column');

        if (!in_array($column, $model->getFileColumns())) {
            $this->error('Invalid column selected!');
            return;
        }

        $this->line('Files migration started!');

        $records = $model->queryFileRecords(
            $this->limit,
            (intval($this->option('batch')) - 1) * $this->limit,
            $column
        );

        $bar = $this->output->createProgressBar(count($records));
        $bar->start();

        $records->each(function (WithFileUploadContract $record) use ($bar, $column) {
            try {
                ReuploadFileAttachments::dispatch($record, $column);
            } catch (\Throwable $e) {
                throw $e;
                $this->error('Record ID:' . $record->id);
            }

            $bar->advance();
        });

        $bar->finish();

        $this->newLine();
        $this->info('File migration successful!');
    }
}

<?php
declare(strict_types=1);

use ElasticAdapter\Indices\Mapping;
use ElasticAdapter\Indices\Settings;
use ElasticMigrations\Facades\Index;
use ElasticMigrations\MigrationInterface;

final class AddStartupNumberInStartupsIndex implements MigrationInterface
{
    /**
     * Run the migration.
     */
    public function up(): void
    {
        Index::putMapping('startups', function (Mapping $mapping) {
            $mapping->keyword('startup_number');
        });
    }

    /**
     * Reverse the migration.
     */
    public function down(): void
    {
        //
    }
}

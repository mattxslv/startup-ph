<?php
declare(strict_types=1);

use ElasticAdapter\Indices\Mapping;
use ElasticAdapter\Indices\Settings;
use ElasticMigrations\Facades\Index;
use ElasticMigrations\MigrationInterface;

final class CreateResourcesIndex implements MigrationInterface
{
    /**
     * Run the migration.
     */
    public function up(): void
    {
        Index::create('resources', function (Mapping $mapping, Settings $settings) {
            $mapping->keyword('id');
            $mapping->keyword('posted_by_id');
            $mapping->keyword('publish_date');
            $mapping->keyword('published_at');
            $mapping->keyword('created_at');
            $mapping->keyword('updated_at');
        });
    }

    /**
     * Reverse the migration.
     */
    public function down(): void
    {
        Index::drop('resources');
    }
}

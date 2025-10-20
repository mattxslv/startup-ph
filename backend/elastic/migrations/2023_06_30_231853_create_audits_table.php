<?php
declare(strict_types=1);

use ElasticAdapter\Indices\Mapping;
use ElasticAdapter\Indices\Settings;
use ElasticMigrations\Facades\Index;
use ElasticMigrations\MigrationInterface;

final class CreateAuditsTable implements MigrationInterface
{
    /**
     * Run the migration.
     */
    public function up(): void
    {
        Index::create('audits', function (Mapping $mapping, Settings $settings) {
            $mapping->keyword('id');
            $mapping->keyword('user_type');
            $mapping->keyword('user_id');
            $mapping->text('user_name');
            $mapping->keyword('event');
            $mapping->keyword('auditable_id');
            $mapping->keyword('auditable_type');
            $mapping->text('old_values');
            $mapping->text('new_values');
            $mapping->text('url');
            $mapping->text('ip_address');
            $mapping->text('user_agent');
            $mapping->text('tags');
            $mapping->keyword('created_at');
            $mapping->keyword('updated_at');
        });
    }

    /**
     * Reverse the migration.
     */
    public function down(): void
    {
        Index::drop('audits');
    }
}

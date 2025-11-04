<?php

namespace Tests;

use Laravel\Lumen\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /**
     * @inheritDoc
     */
    public function createApplication()
    {
        return require __DIR__ . '/bootstrap.php';
    }

    /**
     * @inheritDoc
     */
    public function setUp(): void
    {
        parent::setUp();
        $this->runDatabaseMigrations();
    }

    /**
     * Run the database migrations for the application.
     *
     * @return void
     */
    public function runDatabaseMigrations()
    {
        $migrationPath = __DIR__ . '/../database/migrations';

        $this->artisan(
            'migrate:fresh --realpath --path="'
            . $migrationPath
            . '"'
        );

        $this->beforeApplicationDestroyed(function () use ($migrationPath) {
            $this->artisan(
                'migrate:rollback --realpath --path="'
                . $migrationPath
                . '"'
            );
        });
    }
}

<?php
declare(strict_types=1);

use ElasticAdapter\Indices\Mapping;
use ElasticAdapter\Indices\Settings;
use ElasticMigrations\Facades\Index;
use ElasticMigrations\MigrationInterface;

final class CreateStartupsIndex implements MigrationInterface
{
    /**
     * Run the migration.
     */
    public function up(): void
    {
        Index::create('startups', function (Mapping $mapping, Settings $settings) {
            $mapping->keyword('id');
            $mapping->keyword('user_id');
            $mapping->keyword('startup_id');
            $mapping->keyword('slug');
            $mapping->keyword('tin');
            $mapping->keyword('status');
            $mapping->keyword('submitted_at');
            $mapping->keyword('verified_at');
            $mapping->keyword('returned_at');
            $mapping->keyword('rejected_at');
            $mapping->keyword('created_at');
            $mapping->keyword('updated_at');

            // $mapping->text('founder');
            // $mapping->text('organization');
            // $mapping->text('name');
            // $mapping->text('contact_no');
            // $mapping->text('short_description');
            // $mapping->text('description');
            // $mapping->text('photo_url');
            // $mapping->text('icon_url');
            // $mapping->text('presentation_url');
            // $mapping->text('video_url');
            // $mapping->text('region_code');
            // $mapping->text('province_code');
            // $mapping->text('municipality_code');
            // $mapping->text('barangay_code');
            // $mapping->text('street');
            // $mapping->text('postal_code');
            // $mapping->text('address_geoloc');
            // $mapping->text('address_label');
            // $mapping->keyword('classification');
            // $mapping->text('business_name');
            // $mapping->text('business_no');
            // $mapping->text('business_type');
            // $mapping->text('founding_year');
            // $mapping->text('social_website_url');
            // $mapping->text('social_instagram_url');
            // $mapping->text('social_facebook_url');
            // $mapping->text('social_twitter_url');

            // $mapping->text('remarks');
            // $mapping->keyword('is_active');
            // $mapping->keyword('is_application_completed');
            // $mapping->keyword('submitted_at');
            // $mapping->keyword('approved_at');
            // $mapping->keyword('returned_at');
            // $mapping->text('return_remarks');
            // $mapping->keyword('flagged_at');
            // $mapping->nested('flag');
            // $mapping->keyword('is_published');
            // $mapping->keyword('is_featured');
            // $mapping->keyword('feature_sequence');
            

            // $mapping->nested('requirements');
            // $mapping->nested('sectors');
        });
    }

    /**
     * Reverse the migration.
     */
    public function down(): void
    {
        Index::drop('startups');
    }
}

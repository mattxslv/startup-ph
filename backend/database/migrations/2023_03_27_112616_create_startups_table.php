<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('startups', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->bigInteger('owner_id')->index();
            $table->string('startup_id')->nullable()->index();
            // $table->string('application_type', 20)->nullable()->index();
            $table->string('founder', 100)->nullable();
            $table->string('organization', 100)->nullable();
            $table->string('name', 100);
            $table->string('slug', 100)->index();
            $table->string('tin', 100)->nullable()->index();
            $table->string('contact_no', 100)->nullable();
            $table->string('short_description', 100)->nullable();
            $table->text('description')->nullable();
            $table->string('photo_url', 255)->nullable();
            $table->string('icon_url', 255)->nullable();
            $table->string('presentation_url', 255)->nullable();
            $table->string('video_url', 255)->nullable();
            $table->string('region_code', 10)->nullable()->index();
            $table->string('province_code', 10)->nullable()->index();
            $table->string('municipality_code', 10)->nullable()->index();
            $table->string('barangay_code', 10)->nullable()->index();
            $table->string('street', 200)->nullable();
            $table->string('postal_code', 10)->nullable();
            $table->string('address_geoloc', 100)->nullable();
            $table->string('address_label', 255)->nullable();
            $table->string('classification', 100)->nullable();
            $table->string('business_name', 100)->nullable();
            $table->string('business_no', 100)->nullable();
            $table->string('business_type', 100)->nullable();
            $table->year('founding_year')->nullable();
            $table->string('social_website_url', 255)->nullable();
            $table->string('social_instagram_url', 255)->nullable();
            $table->string('social_facebook_url', 255)->nullable();
            $table->string('social_twitter_url', 255)->nullable();
            // -------------
            $table->string('status', 50)->nullable();
            $table->text('remarks', 255)->nullable();
            $table->boolean('is_active')->default(0);
            // $table->boolean('is_application_completed')->default(0)->index();
            $table->dateTime('submitted_at')->nullable();
            $table->dateTime('approved_at')->nullable()->index();
            // $table->dateTime('flagged_at')->nullable()->index();
            // $table->text('flag', 255)->nullable();
            $table->boolean('is_published')->default(0)->index();
            $table->boolean('is_featured')->default(0)->index();
            $table->integer('feature_sequence')->nullable()->index();
            // ------
            $table->text('requirements')->nullable();
            // ------
            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('startups');
    }
};

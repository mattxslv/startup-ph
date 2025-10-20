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
        Schema::table('startups', function (Blueprint $table) {
            $table->renameColumn('owner_id', 'user_id');
            $table->renameColumn('icon_url', 'logo_url');
            $table->renameColumn('founder', 'founder_name');
            $table->renameColumn('classification', 'business_classification');
            $table->renameColumn('approved_at', 'verified_at');
            $table->renameColumn('requirements', 'old_requirements');

            $table->longText('content')->nullable()->after('social_twitter_url');
            $table->longText('sectors')->nullable()->after('content');
            $table->string('development_phase', 100)->nullable()->after('sectors');
            $table->boolean('is_verified')->default(0)->index()->after('is_application_completed');
            $table->dateTime('oath_accepted_at')->nullable()->after('submitted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('startups', function (Blueprint $table) {
            $table->renameColumn('user_id', 'owner_id');
            $table->renameColumn('logo_url', 'icon_url');
            $table->renameColumn('founder_name', 'founder');
            $table->renameColumn('business_classification', 'classification');
            $table->renameColumn('verified_at', 'approved_at');
            $table->renameColumn('old_requirements', 'requirements');

            $table->dropColumn(['content', 'sectors', 'development_phase', 'oath_accepted_at', 'is_verified']);
        });
    }
};

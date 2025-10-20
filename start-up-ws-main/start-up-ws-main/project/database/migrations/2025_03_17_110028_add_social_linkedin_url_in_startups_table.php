<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('startups', function (Blueprint $table) {
            $table->renameColumn('social_twitter_url', 'social_linkedin_url');
            $table->renameColumn('startup_id', 'startup_number');

            $table->boolean('has_funding')->nullable()->after('development_phase');
            $table->text('fundings')->nullable()->after('has_funding');

            $table->date('business_certificate_expiration_date')->nullable()->after('proof_of_registration_url');
        });

        DB::table('startups')->update([
            'startup_number' => null
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('startups', function (Blueprint $table) {
            $table->renameColumn('social_linkedin_url', 'social_twitter_url');
            $table->renameColumn('startup_number', 'startup_id');

            $table->dropColumn([
                'has_funding',
                'fundings',
                'business_certificate_expiration_date',
            ]);
        });
    }
};

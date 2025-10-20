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
            $table->text('remarks')->nullable()->change();

            $table->string('application_type', 20)->nullable()->index()->after('startup_id');
            $table->boolean('is_application_completed')->default(0)->index()->after('is_active');
            $table->dateTime('returned_at')->nullable()->index()->after('approved_at');
            $table->text('return_remarks')->nullable()->after('returned_at');
            $table->dateTime('flagged_at')->nullable()->index()->after('return_remarks');
            $table->text('flag')->nullable()->after('flagged_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('startups', function (Blueprint $table) {
            $table->dropColumn([
                'application_type',
                'is_application_completed',
                'returned_at',
                'return_remarks',
                'flagged_at',
                'flag',
            ]);
        });
    }
};

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
        Schema::create('assessment_tags', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->index();
            $table->string('description', 255);
            $table->text('notes')->nullable();
            $table->longtext('meta')->nullable();
            $table->boolean('is_active')->index()->default(0);
            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_tags');
    }
};

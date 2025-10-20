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
        Schema::create('requirements', function (Blueprint $table) {
            $table->id();
            $table->string('label', 255);
            $table->text('notes')->nullable();
            $table->string('file_type', 100)->nullable();
            $table->string('template_url', 255)->nullable();
            $table->string('template_label', 255)->nullable();
            $table->boolean('for_enthusiast')->index()->default(0);
            $table->boolean('for_startup')->index()->default(0);
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
        Schema::dropIfExists('requirements');
    }
};

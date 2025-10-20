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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('agency', 50)->index()->nullable();
            $table->string('name', 100);
            $table->string('thumbnail_url')->nullable();
            $table->string('banner_url')->nullable();
            $table->string('type', 100);
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();
            $table->text('description');
            $table->longtext('content');
            $table->boolean('is_verified_required')->default(0)->index();
            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};

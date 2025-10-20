<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('startup_requirements', function (Blueprint $table) {
            $table->id();
            $table->string('startup_id', 36)->index();
            $table->bigInteger('requirement_id')->index();
            $table->string('requirement_code', 100)->index();
            $table->string('requirement_name');
            $table->text('value');
            $table->boolean('is_active')->default(0)->index();
            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('startup_requirements');
    }
};

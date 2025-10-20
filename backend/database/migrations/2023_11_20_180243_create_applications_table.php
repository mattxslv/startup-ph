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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->index();
            $table->string('startup_id', 36)->index();
            $table->string('startup_name', 100);
            $table->bigInteger('program_id')->index();
            $table->string('program_name', 100);
            $table->string('status', 50)->nullable()->index();
            $table->text('remarks')->nullable();
            $table->dateTime('submitted_at')->nullable();
            $table->dateTime('returned_at')->nullable();
            $table->dateTime('approved_at')->nullable();
            $table->dateTime('rejected_at')->nullable();
            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};

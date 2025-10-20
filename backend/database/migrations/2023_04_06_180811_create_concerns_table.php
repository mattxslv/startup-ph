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
        Schema::create('concerns', function (Blueprint $table) {
            $table->id();
            $table->string('email', 100)->index()->nullable();
            $table->string('mobile_no', 20)->index()->nullable();
            $table->string('name', 100)->nullable();
            $table->string('subject', 100)->nullable();
            $table->text('body')->nullable();
            $table->dateTime('sent_at')->nullable();
            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concerns');
    }
};

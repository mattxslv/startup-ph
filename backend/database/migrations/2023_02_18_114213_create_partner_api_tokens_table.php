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
        Schema::create('partner_api_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('partner');
            $table->string('name', 100);
            $table->string('secret')->index();
            $table->text('scope');
            $table->dateTime('last_used')->nullable();
            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partner_api_tokens');
    }
};

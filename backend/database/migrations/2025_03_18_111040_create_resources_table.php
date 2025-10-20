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
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('agency', 50)->nullable();
            $table->string('title', 100);
            $table->string('sub_title', 255)->nullable();
            $table->date('publish_date')->nullable();
            $table->string('publish_by', 255)->nullable();
            $table->string('thumbnail_url', 255)->nullable();
            $table->text('body');
            $table->text('tags');
            $table->boolean('is_published')->default(0)->index();
            $table->dateTime('published_at')->nullable()->index();
            $table->bigInteger('posted_by_id')->nullable()->index();

            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};

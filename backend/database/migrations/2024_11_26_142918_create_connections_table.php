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
        Schema::create('connections', function (Blueprint $table) {
            $table->id();
            $table->string('type', 100)->index();
            $table->string('reference', 100)->index()->nullable();
            $table->string('method', 10)->index()->nullable();
            $table->string('url');
            $table->text('headers');
            $table->text('payload');
            $table->text('params');
            $table->string('code')->nullable();
            $table->text('response')->nullable();
            $table->text('exception')->nullable();
            $table->text('error')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('connections');
    }
};

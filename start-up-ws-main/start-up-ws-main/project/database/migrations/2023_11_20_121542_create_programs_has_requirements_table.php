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
        Schema::create('programs_has_requirements', function (Blueprint $table) {
            $table->unsignedBigInteger('program_id')->index();
            $table->unsignedBigInteger('requirement_id')->index();
            $table->boolean('is_required')->index()->default(0);

            $table->primary(
                ['program_id', 'requirement_id'],
                'programs_has_requirements_primary'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs_has_requirements');
    }
};

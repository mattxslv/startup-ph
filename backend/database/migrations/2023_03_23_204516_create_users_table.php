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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email', 100)->index()->nullable();
            $table->dateTime('email_verified_at')->nullable();
            $table->string('mobile_no', 20)->index()->nullable();
            $table->dateTime('mobile_no_verified_at')->nullable();
            $table->string('first_name', 100)->nullable();
            $table->string('middle_name', 100)->nullable();
            $table->string('last_name', 100)->nullable();
            $table->string('suffix_name', 20)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('birth_place', 100)->nullable();
            $table->string('gender', 5)->nullable();
            $table->string('photo_url', 255)->nullable();
            $table->string('identification_type', 50)->index()->nullable();
            $table->string('identification_no', 100)->index()->nullable();
            $table->string('identification_url', 255)->nullable();
            $table->string('profile_type', 20)->nullable();
            $table->string('citizenship', 100)->nullable();
            $table->string('social_classification', 100)->nullable();
            $table->string('region_code', 10)->nullable();
            $table->string('province_code', 10)->nullable();
            $table->string('municipality_code', 10)->nullable();
            $table->string('barangay_code', 10)->nullable();
            $table->string('street', 200)->nullable();
            $table->string('postal_code', 10)->nullable();
            $table->string('address_geoloc', 100)->nullable();
            $table->string('password')->nullable();
            $table->dateTime('registered_at')->nullable();
            $table->dateTime('profile_completed_at')->nullable();
            $table->dateTime('last_login_at')->nullable();
            $table->boolean('is_registered_from_sso')->default(0)->index();
            $table->string('egovapp_sso_id', 64)->index()->nullable();

            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

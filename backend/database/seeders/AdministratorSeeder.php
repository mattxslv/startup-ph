<?php

namespace Database\Seeders;

use App\Models\Administrators\Administrator;
use Illuminate\Database\Seeder;

class AdministratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Administrator::truncate();

        Administrator::create([
            'email' => 'admin@dict.gov.ph',
            'password' => '$2y$10$.qgYP51J0Om6c4gW4UkLbeBC5b3BgRlzmAr.FQGyVrpdZHclbLrfW', // Dict2023!
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'photo_url' => 'https://ucarecdn.com/626d46ba-7ede-4a6f-ab9a-6fe7a121a989/-/resize/128x128/-/resize/128x/',
        ]);
    }
}

<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AddressSeeder::class);
        $this->call(UpdateAddressSeeder::class);
        $this->call(CountryNationalitySeeder::class);
        $this->call(AdministratorSeeder::class);
        $this->call(RolesPermissionsSeeder::class);
        $this->call(SectorSeeder::class);
    }
}

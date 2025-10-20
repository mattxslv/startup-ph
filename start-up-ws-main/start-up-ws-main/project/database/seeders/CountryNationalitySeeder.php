<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountryNationalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('countries')->truncate();

        $countries = collect(json_decode(file_get_contents(resource_path('json/countries.json'), 1)));

        $countries->each(function ($country) {
            DB::table('countries')->insert([
                'code' => $country->alpha_2_code,
                'name' => $country->en_short_name,
                'nationality' => $country->nationality,
            ]);
        });
    }
}

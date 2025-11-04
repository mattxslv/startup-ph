<?php

namespace Database\Seeders;

use Dmn\PhAddress\Models\Country;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        $file = __DIR__ . '/countries.csv';

        if (Country::count() > 0) {
            return;
        }

        ini_set('auto_detect_line_endings', true);
        $handle = fopen($file, 'r');
        while (($data = fgetcsv($handle)) !== false) {
            Country::create([
                'code' => $data[1],
                'name' => $data[0],
            ]);
        }

        ini_set('auto_detect_line_endings', false);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdateAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('provinces')
            ->whereIn('code', ['137400000', '137500000', '137600000'])
            ->delete();

        DB::table('provinces')
            ->where('code', '133900000')
            ->update([
                'name' => 'NCR, CITY OF MANILA',
                // 'is_active' => 1
            ]);

        DB::table('municipalities')
            ->where('region_code', '130000000')
            ->update(['province_code' => '133900000']);
    }
}

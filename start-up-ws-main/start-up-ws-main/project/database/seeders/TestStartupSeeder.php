<?php

namespace Database\Seeders;

use App\Models\Addresses\Barangays\Barangay;
use App\Models\Misc\Industries\Industry;
use App\Models\Startups\Startup;
use App\Models\Users\User;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestStartupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $this->reset();

        $faker = Factory::create();
        $barangays = Barangay::get();
        $industries = Industry::get();

        for ($i = 0; $i < 50; $i++) {
            $barangay = $barangays->random();
            $industry = $industries->random();
            $date = new Carbon($faker->dateTimeBetween('-1 year', 'now'));
            $street = $faker->streetName();
            $startUpName = $faker->company();
            $approved = random_int(1, 10) > 1;

            $user = [
                'email' => $faker->safeEmail(),
                'first_name' => $faker->firstName(),
                'last_name' => $faker->lastName(),
                'region_code' => $barangay->region_code,
                'province_code' => $barangay->province_code,
                'municipality_code' => $barangay->municipality_code,
                'barangay_code' => $barangay->code,
                'street' => $street,
                'registered_at' => $date,
                'profile_completed_at' => $date,
                'password' => bcrypt('123456')
            ];

            $startup = [
                'industry_id' => $industry->id,
                'founder' => $faker->firstName() . ' ' . $faker->lastName(),
                'organization' => $faker->company(),
                'name' => $startUpName,
                'slug' => \Str::slug(request('name')),
                'tin' => $faker->randomNumber(9),
                'short_description' => $faker->sentence(),
                'description' => $faker->paragraph(),
                'photo_url' => $faker->imageUrl(320, 240, null, false, $startUpName),
                'presentation_url' => $faker->imageUrl(640, 480, null, false, $startUpName),
                'video_url' => $faker->imageUrl(640, 480, null, false, $startUpName),
                'icon_url' => $faker->imageUrl(32, 32, null, false, substr($startUpName, 0, 1)),
                'region_code' => $barangay->region_code,
                'province_code' => $barangay->province_code,
                'municipality_code' => $barangay->municipality_code,
                'barangay_code' => $barangay->code,
                'street' => $street,
                'postal_code' => $faker->randomNumber(4),
                'is_active' => 1,
                'submitted_at' => $date,
                'approved_at' => $approved ? $date->addMinutes(5) : null,
                'flagged_at' => $approved ? null : $date->addMinutes(5),
                'flag' => $approved ? null : $faker->sentence(),
            ];

            (User::create($user))->startups()->create($startup);
        }
    }

    /**
     * Reset
     *
     * @return void
     */
    protected function reset(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        User::truncate();
        Startup::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
}

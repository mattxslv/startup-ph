<?php

namespace Database\Seeders;

use App\Models\News\News;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Seeder;

class TestNewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 20; $i++) {
            News::create([
                'title' => $faker->sentence(),
                'sub_title' => $faker->sentence(),
                'body' => $faker->paragraphs(5, 1),
                'posted_at' => (new Carbon($faker->dateTimeBetween('-1 month', 'now')))->format('Y-m-d h:i:s'),
                'banner_url' => $faker->imageUrl(640, 480),
                'is_active' => 1,
            ]);
        }
    }
}

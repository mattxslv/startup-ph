<?php

namespace Database\Seeders;

use App\Models\Partners\ApiTokens\Enums\PartnerApiTokenEnum;
use App\Models\Partners\ApiTokens\PartnerApiToken;
use App\Models\Partners\Partner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

class TestPartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Partner::truncate();
        PartnerApiToken::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $partner = Partner::create([
            'code' => 'TEST_PARTNER',
            'name' => 'Test Partner',
            'photo_url' => 'https://ucarecdn.com/626d46ba-7ede-4a6f-ab9a-6fe7a121a989/-/resize/128x128/-/resize/128x/',
        ]);

        $partner->tokens()->create([
            'name' => 'Test Api Token',
            'secret' => str_replace('-', '', Uuid::uuid4()),
            'scope' => array_keys(PartnerApiTokenEnum::ACCESS_SCOPES),
        ]);
    }
}

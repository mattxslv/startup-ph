<?php

namespace Database\Seeders;

use App\Models\Misc\Requirements\Requirement;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RequirementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::statement('SET FOREIGN_KEY_CHECKS=0');
        // DB::table('requirements')->truncate();
        // DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $requirements = [
            [
                'name' => 'Proof of Registration',
                'code' => 'proof_of_registration',
                'type' => 'document',
                'meta' => json_encode([
                    'file_types' => ['jpg', 'jpeg', 'png'],
                    'description' => 'Official proof of business registration',
                ]),
            ],
            [
                'name' => 'Business Consent',
                'code' => 'business_consent',
                'type' => 'document',
                'meta' => json_encode([
                    'file_types' => ['jpg', 'jpeg', 'png'],
                    'description' => 'Business consent documentation',
                ]),
            ],
            [
                'name' => 'Oath of Undertaking and Consent Form',
                'code' => 'oath_undertaking_consent',
                'type' => 'document',
                'meta' => json_encode([
                    'file_types' => ['jpg', 'jpeg', 'png'],
                    'template_url' => 'https://ucarecdn.com/c9478efe-800b-40dc-b074-92902d733e53/',
                    'template_label' => 'Download Oath of Undertaking and Consent Form',
                    'description' => 'Official oath of undertaking and consent form',
                ]),
            ],
        ];

        foreach ($requirements as $requirement) {
            Requirement::create($requirement);
        }
    }
}

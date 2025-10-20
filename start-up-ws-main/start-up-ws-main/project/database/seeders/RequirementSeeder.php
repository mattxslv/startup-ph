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
                'label' => 'Proof of Registration',
                'notes' => '',
            ],
            [
                'label' => 'Business Consent',
                'notes' => '',
            ],
            [
                'label' => 'Oath of Undertaking and Consent Form',
                'notes' => '',
                'template_url' => 'https://ucarecdn.com/c9478efe-800b-40dc-b074-92902d733e53/',
                'template_label' => 'Download Oath of Undertaking and Consent Form',
            ],
        ];

        foreach ($requirements as $requirement) {
            Requirement::create([
                ...$requirement,
                'file_type' => 'jpg, jpeg, png',
                'for_enthusiast' => 1,
                'for_startup' => 1,
                'is_active' => 1,
            ]);
        }
    }
}

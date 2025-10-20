<?php

namespace Database\Seeders;

use App\Models\Misc\AssessmentTags\AssessmentTag;
use App\Models\Startups\Startup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssessmentTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::statement('SET FOREIGN_KEY_CHECKS=0');
        // DB::table('assessment_tags')->truncate();
        // DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $assessmentTags = [
            // [
            //     'code' => 'insufficient_information',
            //     'description' => 'Flag for Insufficiency of information.',
            // ],
            // [
            //     'code' => 'mismatched_information_in_documents',
            //     'description' => 'Information provided in the Startup Philippines Website data fields does not match the info on the document/s uploaded.',
            // ],
            // [
            //     'code' => 'document_viewing_error',
            //     'description' => 'Error in viewing the uploaded documents by startups.',
            // ],
            // [
            //     'code' => 'missing_information_in_documents',
            //     'description' => 'Information provided in the Startup Philippines Website data fields is not shown on the document/s uploaded.',
            // ],
            // [
            //     'code' => 'additional_unncessary_information',
            //     'description' => 'Information provided in the Startup Philippines Website has additional unnecessary information.',
            // ],
            // [
            //     'code' => 'for_information_correction',
            //     'description' => 'Information provided in the Startup Philippines Website is for revision or correction.',
            // ],
            // [
            //     'code' => 'missing_information_in_websites',
            //     'description' => 'Mismatch in the provided information on the Startup Philippines Website against the information on their websites.',
            // ],
            // [
            //     'code' => 'non_compliant_document',
            //     'description' => '(Business registration document/Valid ID) uploaded is not compliant with the required document in the Startup Philippines Website.',
            // ],
            [
                'code' => 'not_a_startup',
                'description' => 'The applicant does not meet the requirements as defined by R.A. No. 11337.',
                'meta' => [
                    'pdf_url' => 'https://files.e.gov.ph/startup/9e7394b5-0e9d-4095-9ee7-6c04e3348b65.pdf'
                ]
            ],
        ];

        foreach ($assessmentTags as $assessmentTag) {
            AssessmentTag::query()->updateOrCreate(
                ['code' => $assessmentTag['code']],
                $assessmentTag
            );
        }

        // Note: This is to update
        $startups = Startup::query()
            ->where('assessment_tags', 'like', '%not_a_startup%')
            ->get()
            ->each(function (Startup $startup) {
                $startup->assessment_tags = collect($startup->assessment_tags)->map(function ($tag) {
                    if ($tag['code'] == 'not_a_startup') {
                        $tag['meta'] = [
                            'pdf_url' => 'https://files.e.gov.ph/startup/9e7394b5-0e9d-4095-9ee7-6c04e3348b65.pdf'
                        ];
                    }

                    return $tag;
                })
                ->toArray();

                $startup->save();
            });
    }
}

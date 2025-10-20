<?php

namespace Database\Seeders;

use App\Models\Misc\Remarks\Remark;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RemarkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('remarks')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $remarks = [
            [
                'concern' => 'Information provided in the Startup Philippines Website data fields does not match the info on the document/s uploaded.',
                'recommendation' => 'Please match the information provided in the Website data fields with the information on the documents you have uploaded.',
            ],
            [
                'concern' => 'Error in viewing the uploaded documents by startups.',
                'recommendation' => 'Please ensure that the documents are not corrupted and re-upload them in the system for resubmission.',
            ],
            [
                'concern' => 'Information provided in the Startup Philippines Website data fields is not shown on the document/s uploaded.',
                'recommendation' => 'Please resubmit the documents reflecting you provided information in the Website data fields.',
            ],
            [
                'concern' => 'Information provided in the Startup Philippines Website has additional unnecessary information.',
                'recommendation' => 'Please omit any unnecessary information you have input in the Website data fields.',
            ],
            [
                'concern' => 'Information provided in the Startup Philippines Website is for revision or correction.',
                'recommendation' => 'Please revise or correct any information you have incorrectly input in the Website data fields.',
            ],
            [
                'concern' => 'Mismatch in the provided information on the Startup Philippines Website against the information on their websites.',
                'recommendation' => 'Please match the information provided in the Website data fields with the information on the submitted websites and social media platforms.',
            ],
            [
                'concern' => '(Business registration document/Valid ID) uploaded is not compliant with the required document in the Startup Philippines Website.',
                'recommendation' => 'Kindly comply with the requirement of uploading a copy of your valid document in the Website.',
            ],
        ];

        foreach ($remarks as $remark) {
            Remark::create([
                ...$remark,
                'is_active' => 1,
            ]);
        }
    }
}

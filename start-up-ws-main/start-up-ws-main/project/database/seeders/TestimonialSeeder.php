<?php

namespace Database\Seeders;

use App\Models\Testimonials\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('testimonials')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $testimonials = [
            [
                'label' => 'Our happy startup stories',
                'photo_url' => 'https://ucarecdn.com/04feea71-30a0-4466-a9c3-da817521d48a/',
                'body' => '"Since IdeaSpace Foundation\'s inception, we have been the ecosystem\'s funnel-transforming tech-enabled ventures into stable, scalable, and sustainable businesses while identifying high-potential startups for VCs, investors, and corporations to explore synergies and funding opportunities with.
                
With DICT\'s newly launched Startup Portal, we look forward to working alongside innovators, industry experts, and ecosystem players in exploring investment opportunities, empowering founders, and accelerating startups across the Philippines."',
                'rep_name' => 'Rene "Butch" Meily',
                'rep_position' => 'President of IdeaSpace Foundation',
            ],
            [
                'label' => 'Our happy startup stories',
                'photo_url' => 'https://ucarecdn.com/4a96c658-170d-4727-b50a-3aa3e95153ae/',
                'body' => '"QBO Innovation Hub is all about QLLABORATION as it is set to scale tech-enabled startups and bring Filipino ingenuity to a global audience.

With DICT\'s central platform featuring relevant startup data, resources, and its comprehensive network of innovators and ecosystem stakeholders, it helps us stay true to our mission to catalyze the local tech scene, develop the entrepreneurial talent pool, and build a robust, inclusive innovation and entrepreneurship ecosystem across the Philippines."',
                'rep_name' => 'Katrina Rausa Chan',
                'rep_position' => 'Executive Director of QBO Innovation Hub',
            ],
            [
                'label' => 'Our happy startup stories',
                'photo_url' => 'https://ucarecdn.com/17a66a14-4bbf-4dd2-a76f-fb2a25b90773/',
                'body' => '"Building a robust and resilient innovation ecosystem requires world-class entreprenuerial mindset that begin from creating  ecosytems that nurture homegrown startup ideas. The DICT, as a digital innovation leader of the Philippines, seeks to help build ecosystems where startups can grow and scale into Filipino enterprises that provide solutions for communities and the world. Let us all join hands in achieving this mission."',
                'rep_name' => 'Atty. Jocelle Batapa-Sigue',
                'rep_position' => 'Undersecretary for ICT Industry Development, DICT',
            ]
        ];

        foreach ($testimonials as $testimonial) {
            $testimonial['is_active'] = 1;

            Testimonial::create($testimonial);
        }
    }
}

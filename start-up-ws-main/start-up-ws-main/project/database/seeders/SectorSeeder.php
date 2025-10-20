<?php

namespace Database\Seeders;

use App\Models\Misc\Sectors\Sector;
use Illuminate\Database\Seeder;

class SectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sectors = [
            'AdTech',
            'AeroSpace',
            'Agritech',
            'AI',
            'AR/VR',
            'BigData',
            'BioTech',
            'BlockChain',
            'Cloud',
            'Complementary Health Products',
            'Consumer Electronics',
            'Data Analysis',
            'Digital Health',
            'E-Commerce',
            'Education',
            'Enterprise Solutions',
            'Entertainment',
            'Events',
            'FinTech',
            'Food & Beverage',
            'Food Manufacturing & Processing',
            'Food Science & Technology',
            'Gaming',
            'Hardware',
            'HealthCare',
            'Healthcare Services',
            'Industrial Electronics',
            'InfoComm Tech',
            'InfoTech',
            'IoT',
            'LifeStyle',
            'Manufacturing & Engineering',
            'Marine & Fffshore',
            'Maritime',
            'Media',
            'MedTech',
            'NanoTechnology',
            'Pharmaceutical',
            'Precision Engineering',
            'Real Estate',
            'Retail',
            'Robotics',
            'SaaS',
            'SemiConductor',
            'Supply Chain & Logistics',
            'Telecom',
            'Transport',
            'Travel & Hospitality',
            'Urban Solutions',
        ];

        foreach ($sectors as $sector) {
            Sector::create([
                'name' => $sector,
                'is_active' => 1,
            ]);
        }
    }
}

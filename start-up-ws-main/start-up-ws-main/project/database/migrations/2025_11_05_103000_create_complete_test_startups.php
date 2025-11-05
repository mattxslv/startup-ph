<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        // Delete existing test startups
        DB::table('startups')->where('is_test_account', 1)->delete();
        
        $userId = DB::table('users')->first()->id ?? 1;
        
        $sectors = ['SaaS', 'Robotics', 'AI', 'FinTech', 'HealthCare', 'E-Commerce', 'EdTech', 'Agritech', 'IoT', 'BlockChain'];
        $companies = [
            'SaaS' => ['CloudSync Pro', 'BizFlow Solutions', 'DataVault Systems', 'TeamCollab Platform', 'ProjectFlow Manager', 'CustomerHub CRM', 'InvoiceGenius', 'TimeTrack Plus', 'EmailMaster Pro', 'DocuShare Cloud'],
            'Robotics' => ['AutoBot Industries', 'RoboFactory Systems', 'SmartRobotics PH', 'AutoAssist Technologies', 'Industrial Robotics Corp', 'RoboServe Solutions', 'MechBot Innovations', 'RoboClean Systems', 'AutoWarehouse Robotics', 'RoboHealth Assistants'],
            'AI' => ['NeuralNet Solutions', 'DeepMind Analytics', 'AIVision Systems', 'SmartPredict AI', 'VoiceBot Technologies', 'FaceRecog Security', 'AIChat Assistant', 'DataMind Analytics', 'AutoLearn Platform', 'AIOptimize Systems'],
            'FinTech' => ['DigitalWallet PH', 'CryptoTrade Platform', 'LendFast Microfinance', 'PayEasy Gateway', 'InvestSmart App', 'BankTech Solutions', 'MoneyFlow Platform', 'CreditScore Plus', 'BudgetMaster App', 'WealthBuilder Platform'],
            'HealthCare' => ['TeleMed Philippines', 'HealthTrack App', 'MediRecord Systems', 'PharmaCare Delivery', 'WellnessHub Platform', 'FitLife Tracker', 'MentalHealth Support', 'DoctorOnCall App', 'LabResults Online', 'HealthInsure Tech'],
            'E-Commerce' => ['ShopNow Marketplace', 'BuyLocal Platform', 'FlashDeal Philippines', 'OnlineRetail Hub', 'QuickCart Solutions', 'MarketConnect PH', 'SellerHub Platform', 'EasyShop Express', 'DigitalStore Builder', 'MultiVendor Marketplace'],
            'EdTech' => ['LearnOnline PH', 'SmartClass Platform', 'EduTech Solutions', 'VirtualCampus App', 'SkillBoost Academy', 'OnlineTutor Connect', 'LearningHub Pro', 'EduStream Platform', 'CourseBuilder App', 'StudyBuddy Platform'],
            'Agritech' => ['SmartFarm Solutions', 'CropMonitor AI', 'FarmData Analytics', 'AgriMarket Connect', 'PlantHealth Tracker', 'HarvestPredict AI', 'FarmERP Systems', 'SoilSense Technology', 'AgriDrone Services', 'GreenGrow Platform'],
            'IoT' => ['SmartHome Philippines', 'IoTConnect Platform', 'SensorNet Systems', 'DeviceHub Solutions', 'SmartCity Tech', 'ConnectedDevices PH', 'IoTMonitor Platform', 'SmartSensors Corp', 'AutoControl Systems', 'IoTCloud Solutions'],
            'BlockChain' => ['CryptoChain PH', 'BlockSecure Systems', 'SmartContract Platform', 'ChainLink Solutions', 'TokenVault Systems', 'BlockTrade Platform', 'CryptoLedger Tech', 'ChainVerify Solutions', 'BlockData Analytics', 'CryptoWallet Secure']
        ];
        
        $regions = ['13', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '16', '14', '15'];
        $phases = ['Ideation', 'Validation', 'Early Traction', 'Scaling'];
        $statuses = ['verified', 'for verification', 'for resubmission'];
        
        $count = 0;
        foreach ($sectors as $sector) {
            $names = $companies[$sector];
            foreach ($names as $name) {
                try {
                    DB::table('startups')->insert([
                        'id' => (string)Str::uuid(),
                        'user_id' => $userId,
                        'name' => $name,
                        'business_name' => $name,
                        'short_description' => 'Innovative ' . $sector . ' solutions for Philippine businesses',
                        'description' => $name . ' is a leading ' . $sector . ' company in the Philippines, dedicated to providing innovative solutions.',
                        'sectors' => json_encode([$sector]),
                        'development_phase' => $phases[array_rand($phases)],
                        'address_label' => rand(1, 999) . ' Innovation Drive, Metro Manila',
                        'region_code' => $regions[array_rand($regions)],
                        'postal_code' => (string)rand(1000, 9999),
                        'business_mobile_no' => '0917' . rand(1000000, 9999999),
                        'dti_permit_number' => 'DTI-2025-' . rand(100000, 999999),
                        'founding_year' => now()->subYears(rand(1, 5))->year,
                        'status' => $statuses[array_rand($statuses)],
                        'is_verified' => rand(0, 1),
                        'is_active' => 1,
                        'is_published' => 1,
                        'is_test_account' => 1,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $count++;
                } catch (\Exception $e) {
                    // Log and continue
                    echo "Error inserting $name: " . $e->getMessage() . "\n";
                }
            }
        }
        
        echo "✅ Created $count test startups!\n";
    }

    public function down(): void
    {
        DB::table('startups')->where('is_test_account', 1)->delete();
    }
};

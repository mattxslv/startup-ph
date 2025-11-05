<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations - Add test startups for map visualization
     */
    public function up(): void
    {
        $sectors = ['Technology', 'Agriculture', 'E-commerce', 'Healthcare', 'Education', 'Finance', 'Manufacturing'];
        $developmentPhases = ['Ideation', 'Validation', 'Early Traction', 'Scaling'];
        $statuses = ['verified', 'for verification', 'for resubmission'];
        
        // Get regions, provinces, and municipalities
        $regions = DB::table('regions')->get();
        
        $testUsers = [];
        $testStartups = [];
        
        $userId = (int)DB::table('users')->max('id') + 1;
        
        // Create 100 test startups distributed across Philippines
        for ($i = 0; $i < 100; $i++) {
            $region = $regions->random();
            $province = DB::table('provinces')->where('region_code', $region->code)->inRandomOrder()->first();
            $municipality = $province ? DB::table('municipalities')->where('province_code', $province->code)->inRandomOrder()->first() : null;
            
            if (!$municipality) continue;
            
            $sector = $sectors[array_rand($sectors)];
            $phase = $developmentPhases[array_rand($developmentPhases)];
            $status = $statuses[array_rand($statuses)];
            $userType = ['visitor', 'startup', 'enabler'][array_rand(['visitor', 'startup', 'enabler'])];
            
            // Create user
            $testUsers[] = [
                'id' => $userId,
                'email' => "test_startup_{$i}@example.com",
                'email_verified_at' => now(),
                'mobile_no' => '09' . str_pad($i, 9, '0', STR_PAD_LEFT),
                'mobile_no_verified_at' => now(),
                'first_name' => 'Test',
                'middle_name' => 'User',
                'last_name' => "Startup{$i}",
                'suffix_name' => 'N/A',
                'birth_date' => '1990-01-01',
                'gender' => ['M', 'F'][array_rand(['M', 'F'])],
                'user_type' => $userType,
                'password' => bcrypt('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ];
            
            // Create startup  
            $testStartups[] = [
                'id' => \Illuminate\Support\Str::uuid()->toString(),
                'user_id' => $userId,
                'name' => "Test Startup {$i} - {$sector}",
                'slug' => \Illuminate\Support\Str::slug("Test Startup {$i} {$sector}"),
                'description' => "A test {$sector} startup in {$municipality->name}",
                'short_description' => "Test {$sector} startup",
                'sectors' => $sector,
                'development_phase' => $phase,
                'status' => $status,
                'region_code' => $region->code,
                'province_code' => $province->code,
                'municipality_code' => $municipality->code,
                'verified_at' => $status === 'verified' ? now() : null,
                'is_published' => 1,
                'is_active' => 1,
                'created_at' => now()->subDays(rand(1, 90)),
                'updated_at' => now(),
            ];
            
            $userId++;
            
            // Insert in batches of 10
            if (count($testUsers) >= 10) {
                DB::table('users')->insert($testUsers);
                DB::table('startups')->insert($testStartups);
                $testUsers = [];
                $testStartups = [];
            }
        }
        
        // Insert remaining
        if (count($testUsers) > 0) {
            DB::table('users')->insert($testUsers);
            DB::table('startups')->insert($testStartups);
        }
        
        echo "✅ Created 100 test startups across all regions!\n";
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Delete test startups and users
        DB::table('startups')->where('name', 'like', 'Test Startup%')->delete();
        DB::table('users')->where('email', 'like', 'test_startup_%@example.com')->delete();
    }
};

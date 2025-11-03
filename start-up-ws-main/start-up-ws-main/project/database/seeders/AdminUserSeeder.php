<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'email' => 'admin@startup.ph',
            'password' => Hash::make('admin123'),
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email_verified_at' => now(),
            'registered_at' => now(),
            'profile_completed_at' => now(),
        ]);
        
        echo "Admin user created: admin@startup.ph / admin123\n";
    }
}

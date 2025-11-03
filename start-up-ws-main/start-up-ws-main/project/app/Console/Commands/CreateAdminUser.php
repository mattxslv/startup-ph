<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Command
{
    protected $signature = 'user:create-admin';
    protected $description = 'Create an admin user';

    public function handle()
    {
        $user = new User();
        $user->email = 'admin@startup.ph';
        $user->password = Hash::make('admin123');
        $user->first_name = 'Super';
        $user->last_name = 'Admin';
        $user->email_verified_at = now();
        $user->registered_at = now();
        $user->profile_completed_at = now();
        $user->save();

        $this->info('Admin user created successfully!');
        $this->info('Email: admin@startup.ph');
        $this->info('Password: admin123');
    }
}

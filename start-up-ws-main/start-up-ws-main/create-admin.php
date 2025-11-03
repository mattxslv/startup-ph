<?php
// Create admin user script
$user = new App\Models\User();
$user->email = 'admin@startup.ph';
$user->password = bcrypt('admin123');
$user->first_name = 'Super';
$user->last_name = 'Admin';
$user->email_verified_at = now();
$user->registered_at = now();
$user->profile_completed_at = now();
$user->save();

echo "Admin user created successfully!\n";
echo "Email: admin@startup.ph\n";
echo "Password: admin123\n";

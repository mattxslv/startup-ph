<?php
// Create admin user script
require_once __DIR__ . '/project/vendor/autoload.php';

$app = require_once __DIR__ . '/project/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Check if admin already exists
$existingAdmin = App\Models\User::where('email', 'admin@startup.ph')->first();
if ($existingAdmin) {
    echo "Admin user already exists!\n";
    echo "Email: admin@startup.ph\n";
    echo "Password: admin123\n";
    
    // Ensure they have the Super-Administrator role
    $role = Spatie\Permission\Models\Role::where('name', 'Super-Administrator')->first();
    if ($role && !$existingAdmin->hasRole('Super-Administrator')) {
        $existingAdmin->assignRole('Super-Administrator');
        echo "Super-Administrator role assigned!\n";
    }
    exit;
}

$user = new App\Models\User();
$user->email = 'admin@startup.ph';
$user->password = bcrypt('admin123');
$user->first_name = 'Super';
$user->last_name = 'Admin';
$user->user_type = 'enabler';
$user->email_verified_at = now();
$user->registered_at = now();
$user->profile_completed_at = now();
$user->save();

// Assign Super-Administrator role
$role = Spatie\Permission\Models\Role::where('name', 'Super-Administrator')->first();
if ($role) {
    $user->assignRole('Super-Administrator');
    echo "Super-Administrator role assigned!\n";
} else {
    echo "Warning: Super-Administrator role not found!\n";
}

echo "Admin user created successfully!\n";
echo "Email: admin@startup.ph\n";
echo "Password: admin123\n";

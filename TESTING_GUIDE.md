# Testing Guide - New Features

This guide will help you verify that all newly implemented features are working correctly.

---

## Prerequisites

1. **Backend is running**: Docker containers should be up
2. **Database is accessible**: MySQL container running
3. **Admin account exists**: You need admin credentials
4. **Test startup account**: You need a startup user account

---

## Test 1: Automatic Permit Expiry System

### Step 1: Check the command exists
```bash
cd /home/tonky/projects/startupph/start-up-ws-main/start-up-ws-main/project
docker-compose exec php php artisan list | grep expired
```
**Expected output**: Should show `startups:check-expired-permits`

### Step 2: Run in dry-run mode (safe - doesn't modify data)
```bash
docker-compose exec php php artisan startups:check-expired-permits --dry-run
```
**Expected output**: 
- List of startups with expired permits (if any)
- List of startups with permits expiring in 7 days (if any)
- "DRY RUN MODE - No changes made" message

### Step 3: Check scheduler configuration
```bash
docker-compose exec php php artisan schedule:list
```
**Expected output**: Should show the `startups:check-expired-permits` command scheduled at 02:00

### Step 4: Create test data with expired permit
```bash
docker-compose exec php php artisan tinker
```
Then in tinker:
```php
// Find a verified startup
$startup = \App\Models\Startups\Startup::where('status', 'VERIFIED')->first();

if ($startup) {
    // Set permit expiration to yesterday
    $startup->update([
        'business_certificate_expiration_date' => now()->subDay()->format('Y-m-d')
    ]);
    echo "Test startup created: {$startup->name} (ID: {$startup->id})\n";
    echo "Expiry date: {$startup->business_certificate_expiration_date}\n";
} else {
    echo "No verified startup found. Create one first.\n";
}
exit;
```

### Step 5: Run the command for real
```bash
docker-compose exec php php artisan startups:check-expired-permits
```
**Expected output**:
- Should find the test startup
- Should update status to FOR_RESUBMISSION
- Should show "Sent expired notification to: [email]"

### Step 6: Verify in database
```bash
docker-compose exec mysql mysql -u root -proot startup_ph -e "
SELECT id, name, status, business_certificate_expiration_date 
FROM startups 
WHERE business_certificate_expiration_date < CURDATE() 
LIMIT 5;"
```
**Expected output**: Status should be "FOR RESUBMISSION" for expired permits

### Step 7: Check email logs (if mail is configured)
```bash
docker-compose exec php tail -n 50 storage/logs/laravel.log | grep -i mail
```

---

## Test 2: Regional Focal Access Control

### Step 1: Run the migration
```bash
cd /home/tonky/projects/startupph/start-up-ws-main/start-up-ws-main/project
docker-compose exec php php artisan migrate
```
**Expected output**: Should show the migration ran successfully or "Nothing to migrate"

### Step 2: Verify database columns exist
```bash
docker-compose exec mysql mysql -u root -proot startup_ph -e "
DESCRIBE administrators;" | grep -E "region_code|is_regional_focal"
```
**Expected output**: Should show both columns exist

### Step 3: Create a test regional focal admin
```bash
docker-compose exec php php artisan tinker
```
Then in tinker:
```php
// Find or create an admin
$admin = \App\Models\Administrators\Administrator::first();

if ($admin) {
    $admin->update([
        'region_code' => '01', // NCR region code - adjust as needed
        'is_regional_focal' => true
    ]);
    echo "Regional focal admin created:\n";
    echo "Email: {$admin->email}\n";
    echo "Region: {$admin->region_code}\n";
    echo "Is Regional Focal: {$admin->is_regional_focal}\n";
} else {
    echo "No admin found. Create one first.\n";
}
exit;
```

### Step 4: Check available regions
```bash
docker-compose exec mysql mysql -u root -proot startup_ph -e "
SELECT code, name FROM regions ORDER BY code LIMIT 10;"
```

### Step 5: Test API filtering
First, get an admin auth token (you'll need to login via the API or get existing token).

Then test:
```bash
# Replace YOUR_ADMIN_TOKEN with actual token
TOKEN="YOUR_ADMIN_TOKEN"

# Test as regional focal admin - should only see startups from assigned region
curl -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     "http://localhost/api/v2/administrator/startups" | jq '.data[] | {id, name, region_code}'
```

### Step 6: Verify middleware is registered
```bash
docker-compose exec php php artisan route:list | grep "regional.focal"
```
**Expected output**: Should show routes with the regional.focal middleware

---

## Test 3: Admin Data Export Tools

### Step 1: Verify export routes exist
```bash
cd /home/tonky/projects/startupph/start-up-ws-main/start-up-ws-main/project
docker-compose exec php php artisan route:list | grep export
```
**Expected output**: Should show:
- GET /api/v2/administrator/export/startups/csv
- GET /api/v2/administrator/export/statistics/csv
- GET /api/v2/administrator/export/report/pdf

### Step 2: Test CSV export via command line
```bash
# Replace YOUR_ADMIN_TOKEN with actual admin token
TOKEN="YOUR_ADMIN_TOKEN"

# Test startups export
curl -H "Authorization: Bearer $TOKEN" \
     "http://localhost/api/v2/administrator/export/startups/csv" \
     --output /tmp/startups_export.csv

# Check if file was created
ls -lh /tmp/startups_export.csv
head -n 5 /tmp/startups_export.csv
```

### Step 3: Test statistics export
```bash
curl -H "Authorization: Bearer $TOKEN" \
     "http://localhost/api/v2/administrator/export/statistics/csv" \
     --output /tmp/statistics_export.csv

# View the file
cat /tmp/statistics_export.csv
```

### Step 4: Test frontend export buttons

**For startup-core-ui (Admin Dashboard):**

1. Start the admin UI if not running:
```bash
cd /home/tonky/projects/startupph/startup-core-ui-prod/startup-core-ui-prod
npm run dev
```

2. Open browser: http://localhost:5173 (or your configured port)

3. Login as admin

4. Navigate to Dashboard

5. Click the "Export" button in the Overview section

6. Verify you see:
   - Export Startups to CSV button
   - Export Statistics to CSV button
   - Export Dashboard as Image button

7. Click "Export Startups to CSV"
   - Should show loading state
   - Should download a CSV file
   - Filename format: `startups_YYYY-MM-DD_HHMMSS.csv`

8. Click "Export Statistics to CSV"
   - Should download statistics CSV
   - Should contain multiple sections

9. Open the CSV files in Excel or text editor to verify data

### Step 5: Check browser console
- Open Developer Tools (F12)
- Go to Console tab
- Click export buttons
- **Expected**: No errors, should see download initiated

---

## Test 4: Edit Registration During Verification

### Step 1: Create a test startup and submit for verification

Using the frontend (startup-ph-ui):
1. Login as a startup user
2. Complete the startup registration
3. Go to "Get Verified" page
4. Submit the application
5. Status should change to "FOR VERIFICATION"

### Step 2: Verify you can still edit

1. While status is "FOR VERIFICATION", go to "My Startup" page
2. Try to edit any field (name, description, etc.)
3. Click "Save Changes"
4. **Expected**: Changes should save successfully
5. Status should remain "FOR VERIFICATION" (not reset to "UNVERIFIED")

### Step 3: Test with FOR_RESUBMISSION status

Login as admin and return the application:
1. Find the startup in admin panel
2. Click "Return for Resubmission"
3. Add return reason
4. Status changes to "FOR RESUBMISSION"

Login as startup user again:
1. Go to "My Startup"
2. Edit fields
3. Save changes
4. **Expected**: Can still edit, status stays "FOR RESUBMISSION"

### Step 4: Verify via API
```bash
# Get startup user token
USER_TOKEN="YOUR_USER_TOKEN"

# Try to update startup data
curl -X POST "http://localhost/api/v2/user/startup" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Startup Name",
    "description": "Updated description"
  }'
```
**Expected**: Should return 200 OK with updated data

### Step 5: Check database
```bash
docker-compose exec mysql mysql -u root -proot startup_ph -e "
SELECT id, name, status, updated_at 
FROM startups 
WHERE status IN ('FOR VERIFICATION', 'FOR RESUBMISSION') 
ORDER BY updated_at DESC 
LIMIT 5;"
```

---

## Quick Test Script

Save this as `test_features.sh` and make it executable:

```bash
#!/bin/bash

echo "=== Testing New Features ==="
echo ""

cd /home/tonky/projects/startupph/start-up-ws-main/start-up-ws-main/project

echo "1. Testing Permit Expiry Command..."
docker-compose exec php php artisan startups:check-expired-permits --dry-run
echo ""

echo "2. Checking Scheduler..."
docker-compose exec php php artisan schedule:list | grep expired
echo ""

echo "3. Checking Migration Status..."
docker-compose exec php php artisan migrate:status | tail -5
echo ""

echo "4. Verifying Export Routes..."
docker-compose exec php php artisan route:list | grep export
echo ""

echo "5. Checking Regional Focal Columns..."
docker-compose exec mysql mysql -u root -proot startup_ph -e "DESCRIBE administrators;" | grep -E "region_code|is_regional_focal"
echo ""

echo "=== Test Complete ==="
echo ""
echo "Next steps:"
echo "1. Get admin token and test CSV exports"
echo "2. Test frontend export buttons in browser"
echo "3. Test editing during verification"
echo ""
```

Run it:
```bash
chmod +x test_features.sh
./test_features.sh
```

---

## Common Issues and Solutions

### Issue: Command not found
**Solution**: Make sure you're inside the php container:
```bash
docker-compose exec php bash
php artisan list | grep expired
```

### Issue: Migration already ran
**Solution**: This is fine! Check the table exists:
```bash
docker-compose exec mysql mysql -u root -proot startup_ph -e "SHOW COLUMNS FROM administrators;"
```

### Issue: CSV export returns 401 Unauthorized
**Solution**: Get a fresh admin token:
1. Login via admin UI
2. Check browser Developer Tools → Network tab
3. Copy the Bearer token from any API request
4. Use it in curl commands

### Issue: Export buttons not visible
**Solution**: 
1. Check browser console for errors
2. Verify you're logged in as admin
3. Check that you have 'startups-view' permission
4. Clear browser cache and reload

### Issue: Emails not sending
**Solution**: 
1. Check .env mail configuration
2. Use `--dry-run` flag first
3. Check Laravel logs: `docker-compose exec php tail -f storage/logs/laravel.log`

---

## Verification Checklist

Copy and mark as you test:

### Permit Expiry System
- [ ] Command exists and shows in artisan list
- [ ] Dry-run mode works without errors
- [ ] Command finds expired permits
- [ ] Status updates to FOR_RESUBMISSION
- [ ] Console shows email notification attempts
- [ ] Scheduler shows command is registered

### Regional Focal Control
- [ ] Migration ran successfully
- [ ] Database columns exist (region_code, is_regional_focal)
- [ ] Can set regional focal admin
- [ ] Middleware is registered
- [ ] Routes show regional.focal middleware
- [ ] API filters startups by region (test with token)

### Data Export
- [ ] Export routes exist
- [ ] CSV exports download successfully via curl
- [ ] Frontend export buttons visible
- [ ] Startups CSV downloads with correct data
- [ ] Statistics CSV has multiple sections
- [ ] Files open correctly in Excel
- [ ] No console errors in browser

### Edit During Verification
- [ ] Can edit startup when status is FOR_VERIFICATION
- [ ] Status doesn't reset after editing
- [ ] Can edit when status is FOR_RESUBMISSION
- [ ] API allows POST to /user/startup
- [ ] Database shows updated_at changes
- [ ] No validation errors

---

## Getting Admin/User Tokens for Testing

### Method 1: Via Browser DevTools
1. Open admin/user UI in browser
2. Login
3. Press F12 to open DevTools
4. Go to Network tab
5. Make any API call (like viewing dashboard)
6. Click the request
7. Look for "Authorization" header
8. Copy the token after "Bearer "

### Method 2: Via Database (development only)
```bash
docker-compose exec php php artisan tinker
```
```php
// For admin
$admin = \App\Models\Administrators\Administrator::first();
$token = $admin->createToken('test-token')->plainTextToken;
echo "Admin Token: $token\n";

// For user
$user = \App\Models\Users\User::first();
$token = $user->createToken('test-token')->plainTextToken;
echo "User Token: $token\n";
exit;
```

---

## Full Integration Test

1. **Create test startup with expiring permit**
2. **Assign regional focal admin for that startup's region**
3. **Run permit check command**
4. **Login as regional admin**
5. **Export CSV - should only see that region's startups**
6. **Login as startup user**
7. **Edit startup data while FOR_RESUBMISSION**
8. **Verify all changes in database and exports**

This tests all 4 features working together!

---

## Need Help?

If something doesn't work:
1. Check Docker containers are running: `docker-compose ps`
2. Check Laravel logs: `docker-compose exec php tail -100 storage/logs/laravel.log`
3. Check database connection: `docker-compose exec php php artisan tinker` then `DB::select('SELECT 1');`
4. Verify .env configuration
5. Check the FEATURES_IMPLEMENTATION.md for detailed troubleshooting


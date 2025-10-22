# Database Import Script - Handles large SQL files safely
# This script imports the database in a way that won't crash Docker/WSL

$sqlFile = "C:\Users\azhyg\Documents\Startup Website\startup.sql"
$containerName = "start-up-ws-database"
$dbUser = "admin"
$dbPass = "secret"
$dbName = "start-up"

Write-Host "Starting database import process..." -ForegroundColor Green
Write-Host "SQL File: $sqlFile" -ForegroundColor Cyan
Write-Host "File Size: $((Get-Item $sqlFile).Length / 1GB) GB" -ForegroundColor Cyan

# Check if Docker container is running
Write-Host "`nChecking Docker container status..." -ForegroundColor Yellow
$containerStatus = docker inspect -f '{{.State.Running}}' $containerName 2>$null
if ($containerStatus -ne "true") {
    Write-Host "ERROR: Container $containerName is not running!" -ForegroundColor Red
    exit 1
}
Write-Host "Container is running!" -ForegroundColor Green

# Copy SQL file to container if not already there
Write-Host "`nChecking if SQL file is in container..." -ForegroundColor Yellow
$fileExists = docker exec $containerName test -f /startup.sql 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Copying SQL file to container (this may take a few minutes)..." -ForegroundColor Yellow
    docker cp $sqlFile ${containerName}:/startup.sql
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to copy SQL file to container!" -ForegroundColor Red
        exit 1
    }
    Write-Host "File copied successfully!" -ForegroundColor Green
} else {
    Write-Host "SQL file already in container!" -ForegroundColor Green
}

# Start the import with progress monitoring
Write-Host "`nStarting SQL import..." -ForegroundColor Green
Write-Host "This will take a while. Monitoring progress every 60 seconds..." -ForegroundColor Yellow

# Start import in background
$job = Start-Job -ScriptBlock {
    param($container, $user, $pass, $db)
    docker exec $container sh -c "mysql -u$user -p$pass $db < /startup.sql 2>&1"
} -ArgumentList $containerName, $dbUser, $dbPass, $dbName

# Monitor progress
$startSize = 0
$previousSize = 0
$startTime = Get-Date

while ($job.State -eq "Running") {
    Start-Sleep -Seconds 60
    
    # Get current database size
    $sizeOutput = docker exec $containerName sh -c "du -sb /var/lib/mysql/start@002dup 2>/dev/null" 2>$null
    if ($sizeOutput -match '(\d+)') {
        $currentSize = [long]$matches[1]
        $currentSizeGB = [math]::Round($currentSize / 1GB, 2)
        
        if ($startSize -eq 0) {
            $startSize = $currentSize
            $previousSize = $currentSize
        }
        
        $importedGB = [math]::Round(($currentSize - $startSize) / 1GB, 2)
        $speedMBps = [math]::Round((($currentSize - $previousSize) / 1MB) / 60, 2)
        $elapsed = (Get-Date) - $startTime
        
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Database size: $currentSizeGB GB | Imported: $importedGB GB | Speed: $speedMBps MB/s | Elapsed: $($elapsed.ToString('hh\:mm\:ss'))" -ForegroundColor Cyan
        
        $previousSize = $currentSize
    } else {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Checking status..." -ForegroundColor Yellow
    }
}

# Wait for job to complete
$result = Receive-Job -Job $job -Wait
$job | Remove-Job

# Check if import was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "`nImport completed successfully!" -ForegroundColor Green
    
    # Verify data
    Write-Host "`nVerifying imported data..." -ForegroundColor Yellow
    $userCount = docker exec $containerName mysql -u$dbUser -p$dbPass $dbName -e "SELECT COUNT(*) as count FROM users" -s -N 2>$null
    Write-Host "Users in database: $userCount" -ForegroundColor Cyan
    
    # Clean up SQL file from container to save space
    Write-Host "`nCleaning up temporary files..." -ForegroundColor Yellow
    docker exec $containerName rm /startup.sql
    Write-Host "Import process complete!" -ForegroundColor Green
} else {
    Write-Host "`nImport failed! Error output:" -ForegroundColor Red
    Write-Host $result -ForegroundColor Red
    exit 1
}

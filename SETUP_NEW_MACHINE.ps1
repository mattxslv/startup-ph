# ============================================================
# StartupPH Development Environment Setup Script
# For Windows Desktop Computers
# ============================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  StartupPH Development Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "WARNING: Not running as Administrator. Some operations may fail." -ForegroundColor Yellow
    Write-Host "Consider right-clicking and selecting 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
}

# ============================================================
# Step 1: Check Prerequisites
# ============================================================
Write-Host "Step 1: Checking prerequisites..." -ForegroundColor Green

# Check Docker
Write-Host "  Checking Docker..." -NoNewline
try {
    $dockerVersion = docker --version 2>$null
    if ($dockerVersion) {
        Write-Host " OK" -ForegroundColor Green
        Write-Host "    $dockerVersion" -ForegroundColor Gray
    } else {
        throw "Docker not found"
    }
} catch {
    Write-Host " MISSING" -ForegroundColor Red
    Write-Host "    Please install Docker Desktop from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y') { exit 1 }
}

# Check Node.js
Write-Host "  Checking Node.js..." -NoNewline
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host " OK" -ForegroundColor Green
        Write-Host "    Node.js $nodeVersion" -ForegroundColor Gray
    } else {
        throw "Node.js not found"
    }
} catch {
    Write-Host " MISSING" -ForegroundColor Red
    Write-Host "    Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y') { exit 1 }
}

# Check npm
Write-Host "  Checking npm..." -NoNewline
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host " OK" -ForegroundColor Green
        Write-Host "    npm v$npmVersion" -ForegroundColor Gray
    } else {
        throw "npm not found"
    }
} catch {
    Write-Host " MISSING" -ForegroundColor Red
    Write-Host "    npm should come with Node.js. Please reinstall Node.js" -ForegroundColor Yellow
    exit 1
}

# Check Git
Write-Host "  Checking Git..." -NoNewline
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        Write-Host " OK" -ForegroundColor Green
        Write-Host "    $gitVersion" -ForegroundColor Gray
    } else {
        throw "Git not found"
    }
} catch {
    Write-Host " MISSING" -ForegroundColor Red
    Write-Host "    Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y') { exit 1 }
}

Write-Host ""

# ============================================================
# Step 2: Setup Backend (Docker)
# ============================================================
Write-Host "Step 2: Setting up Backend (Docker)..." -ForegroundColor Green

$backendPath = ".\start-up-ws-main\start-up-ws-main"
if (Test-Path $backendPath) {
    Push-Location $backendPath
    
    Write-Host "  Starting Docker containers..." -ForegroundColor Cyan
    docker-compose up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Docker containers started successfully" -ForegroundColor Green
        
        # Wait for containers to be ready
        Write-Host "  Waiting for containers to be ready (15 seconds)..." -ForegroundColor Cyan
        Start-Sleep -Seconds 15
        
        # Check if database dump exists
        $dumpFile = ".\dumps\PSCC-latest.sql"
        if (Test-Path $dumpFile) {
            Write-Host "  Database dump found. Do you want to import it?" -ForegroundColor Cyan
            $importDb = Read-Host "  Import database? (y/n)"
            
            if ($importDb -eq 'y') {
                Write-Host "  Importing database (this may take a few minutes)..." -ForegroundColor Cyan
                
                # Try using the import script first
                if (Test-Path ".\import-database.ps1") {
                    .\import-database.ps1
                } else {
                    # Manual import
                    Get-Content $dumpFile | docker exec -i start-up-ws-mysql mysql -u root -proot start_up
                }
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "  Database imported successfully" -ForegroundColor Green
                } else {
                    Write-Host "  WARNING: Database import may have failed" -ForegroundColor Yellow
                }
            }
        } else {
            Write-Host "  WARNING: Database dump not found at $dumpFile" -ForegroundColor Yellow
        }
        
        # Delete PM2 workers that cause issues
        Write-Host "  Removing PM2 queue workers (they cause registration errors)..." -ForegroundColor Cyan
        docker exec start-up-ws-app pm2 delete all 2>$null
        docker exec start-up-ws-app pm2 save --force 2>$null
        Write-Host "  PM2 workers removed" -ForegroundColor Green
        
        # Clear Laravel caches
        Write-Host "  Clearing Laravel caches..." -ForegroundColor Cyan
        docker exec start-up-ws-app php artisan config:clear
        docker exec start-up-ws-app php artisan route:clear
        docker exec start-up-ws-app php artisan view:clear
        Write-Host "  Laravel caches cleared" -ForegroundColor Green
        
    } else {
        Write-Host "  ERROR: Failed to start Docker containers" -ForegroundColor Red
    }
    
    Pop-Location
} else {
    Write-Host "  WARNING: Backend path not found: $backendPath" -ForegroundColor Yellow
}

Write-Host ""

# ============================================================
# Step 3: Setup Frontend (Next.js)
# ============================================================
Write-Host "Step 3: Setting up Frontend (Next.js)..." -ForegroundColor Green

$frontendPath = ".\startup-ph-ui-prod\startup-ph-ui-prod"
if (Test-Path $frontendPath) {
    Push-Location $frontendPath
    
    # Check if .env.local exists
    if (-not (Test-Path ".env.local")) {
        Write-Host "  WARNING: .env.local not found!" -ForegroundColor Yellow
        Write-Host "  You need to create .env.local with your API configuration" -ForegroundColor Yellow
        Write-Host "  Example content:" -ForegroundColor Gray
        Write-Host "    NEXT_PUBLIC_API_URL=http://localhost:8080" -ForegroundColor Gray
        Write-Host ""
        $createEnv = Read-Host "  Create basic .env.local now? (y/n)"
        if ($createEnv -eq 'y') {
            @"
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3001
"@ | Out-File -FilePath .env.local -Encoding utf8
            Write-Host "  Created .env.local" -ForegroundColor Green
        }
    }
    
    # Create .babelrc to fix Next.js SWC crash on Windows
    Write-Host "  Creating .babelrc (fixes Windows compatibility issue)..." -ForegroundColor Cyan
    @"
{
  "presets": ["next/babel"]
}
"@ | Out-File -FilePath .babelrc -Encoding utf8
    Write-Host "  .babelrc created" -ForegroundColor Green
    
    # Check if node_modules exists
    if (-not (Test-Path "node_modules")) {
        Write-Host "  Installing npm dependencies (this may take several minutes)..." -ForegroundColor Cyan
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  npm dependencies installed successfully" -ForegroundColor Green
        } else {
            Write-Host "  ERROR: npm install failed" -ForegroundColor Red
        }
    } else {
        Write-Host "  node_modules already exists, skipping npm install" -ForegroundColor Gray
        Write-Host "  Run 'npm install' manually if you want to update dependencies" -ForegroundColor Gray
    }
    
    Pop-Location
} else {
    Write-Host "  WARNING: Frontend path not found: $frontendPath" -ForegroundColor Yellow
}

Write-Host ""

# ============================================================
# Step 4: Summary and Next Steps
# ============================================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Services Status:" -ForegroundColor Green
Write-Host "  Backend API:  http://localhost:8080" -ForegroundColor White
Write-Host "  MySQL:        localhost:3307 (user: root, pass: root)" -ForegroundColor White
Write-Host "  Frontend:     Ready to start" -ForegroundColor White
Write-Host ""

Write-Host "To start the frontend server:" -ForegroundColor Green
Write-Host "  cd startup-ph-ui-prod\startup-ph-ui-prod" -ForegroundColor Yellow
Write-Host "  npm run dev -- -p 3001" -ForegroundColor Yellow
Write-Host ""

Write-Host "To view Docker containers:" -ForegroundColor Green
Write-Host "  docker ps" -ForegroundColor Yellow
Write-Host ""

Write-Host "To stop Docker containers:" -ForegroundColor Green
Write-Host "  cd start-up-ws-main\start-up-ws-main" -ForegroundColor Yellow
Write-Host "  docker-compose down" -ForegroundColor Yellow
Write-Host ""

Write-Host "Known Issues:" -ForegroundColor Yellow
Write-Host "  - Next.js may crash with filesystem casing errors on Windows" -ForegroundColor Gray
Write-Host "    Just restart with: npm run dev -- -p 3001" -ForegroundColor Gray
Write-Host "  - PM2 workers auto-start on container restart (already removed)" -ForegroundColor Gray
Write-Host "    If issues persist, run: docker exec start-up-ws-app pm2 delete all" -ForegroundColor Gray
Write-Host ""

Write-Host "Happy coding! 🚀" -ForegroundColor Green

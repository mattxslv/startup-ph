param(
  [Parameter(Mandatory=$true)]
  [string]$Command
)

# Default backend container name pattern. Adjust if your backend container uses a different name.
$project = ${env:COMPOSE_PROJECT_NAME}
if ([string]::IsNullOrEmpty($project)) { $project = 'start-up-ws' }
$backendContainerName = "$project-backend"

Write-Host "Looking for running container matching: $backendContainerName"

$containers = docker ps --format "{{.Names}}"
$match = $containers | Where-Object { $_ -like "*$backendContainerName*" } | Select-Object -First 1

if (-not $match) {
  Write-Host "No running backend container found matching '$backendContainerName'." -ForegroundColor Yellow
  Write-Host "Start your backend container or edit this script to match its name." -ForegroundColor Yellow
  exit 1
}

Write-Host "Running: php artisan $Command in container: $match"
docker exec -it $match sh -c "php artisan $Command"

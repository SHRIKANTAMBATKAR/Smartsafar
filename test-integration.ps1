# SmartSafar Integration Test Script (PowerShell)
# This script helps verify frontend and backend are running correctly

Write-Host "=== SmartSafar Integration Test ===" -ForegroundColor Cyan
Write-Host ""

# Test Backend
Write-Host "1. Testing Backend (http://localhost:8082)..." -ForegroundColor Yellow
try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:8082/api/routes" -Method GET -UseBasicParsing -ErrorAction Stop
    if ($backendResponse.StatusCode -eq 200) {
        Write-Host "   ✓ Backend is running!" -ForegroundColor Green
        Write-Host "   Response: $($backendResponse.Content)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ✗ Backend is NOT running or not accessible" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Please start the backend: cd cms && ./mvnw.cmd spring-boot:run" -ForegroundColor Yellow
}

Write-Host ""

# Test Frontend
Write-Host "2. Testing Frontend (http://localhost:8080)..." -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:8080" -Method GET -UseBasicParsing -ErrorAction Stop -TimeoutSec 5
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "   ✓ Frontend is running!" -ForegroundColor Green
    }
} catch {
    Write-Host "   ✗ Frontend is NOT running or not accessible" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Please start the frontend: cd Frontends && npm run dev" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Test Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Open http://localhost:8080 in your browser" -ForegroundColor White
Write-Host "  2. Test registration: http://localhost:8080/register" -ForegroundColor White
Write-Host "  3. Test login: http://localhost:8080/login" -ForegroundColor White
Write-Host "  4. Test search: http://localhost:8080/search" -ForegroundColor White
Write-Host ""


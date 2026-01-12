$baseUrl = "http://127.0.0.1:8082/api/auth"
$email = "testrunner_" + (Get-Random) + "@example.com"
$password = "TestPass123!"
$fullName = "Test Runner"

Write-Host "Testing API Keys / Auth Flow..."
Write-Host "Target URL: $baseUrl"
Write-Host "Test User: $email"

# 0. Pre-check
$portCheck = Test-NetConnection -ComputerName 127.0.0.1 -Port 8082
if (-not $portCheck.TcpTestSucceeded) {
    Write-Host "CRITICAL: Port 8082 is NOT accessible on 127.0.0.1!" -ForegroundColor Red
    exit 1
} else {
    Write-Host "Port 8082 is accessible." -ForegroundColor Green
}

# 1. Register
$registerBody = @{
    fullName = $fullName
    email = $email
    password = $password
} | ConvertTo-Json

Write-Host "`n[1] Attempting Registration..."
try {
    $regResponse = Invoke-RestMethod -Uri "$baseUrl/register" -Method Post -Body $registerBody -ContentType "application/json"
    Write-Host "Registration Successful!" -ForegroundColor Green
} catch {
    Write-Host "Registration Failed!" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
        Write-Host "Body: $($reader.ReadToEnd())"
    }
    exit 1
}

# 2. Login
$loginBody = @{
    email = $email
    password = $password
} | ConvertTo-Json

Write-Host "`n[2] Attempting Login..."
try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/login" -Method Post -Body $loginBody -ContentType "application/json"
    
    if ($loginResponse.token) {
        Write-Host "Login Successful!" -ForegroundColor Green
        Write-Host "Token received (First 20 chars): $($loginResponse.token.Substring(0, 20))..."
        Write-Host "API Keys/JWT Secret verified as WORKING." -ForegroundColor Cyan
    } else {
        Write-Host "Login succeeded but NO TOKEN returned." -ForegroundColor Yellow
        Write-Host ($loginResponse | Out-String)
    }
} catch {
    Write-Host "Login Failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
        Write-Host "Body: $($reader.ReadToEnd())"
    }
    exit 1
}

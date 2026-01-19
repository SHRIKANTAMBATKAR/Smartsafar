# Troubleshooting Frontend-Backend Connection Issues

## Common Connection Errors & Solutions

### 1. CORS Error (Cross-Origin Request Blocked)

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:8082/api/...' from origin 'http://localhost:8080' 
has been blocked by CORS policy
```

**Solution:**
- Verify backend is running on port 8082
- Check `CrosConfig.java` allows `http://localhost:8080`
- Restart backend after changing CORS config

### 2. Network Error / Connection Refused

**Error Message:**
```
Network Error
Cannot connect to server
```

**Solution:**
1. **Check Backend is Running:**
   ```bash
   # Test backend endpoint
   curl http://localhost:8082/api/routes
   # OR open in browser
   http://localhost:8082/api/routes
   ```

2. **Verify Port 8082 is not in use:**
   ```powershell
   # Windows
   netstat -ano | findstr :8082
   ```

3. **Check Backend Logs:**
   - Look for "Started CmsApplication" message
   - Check for any startup errors

### 3. 404 Not Found Errors

**Error Message:**
```
404 (Not Found)
/api/xxx endpoint not found
```

**Solution:**
- Verify API endpoint path matches backend controller
- Check controller has `@RequestMapping("/api/...")`
- Ensure backend is fully started (not just starting)

### 4. 500 Internal Server Error

**Error Message:**
```
500 (Internal Server Error)
```

**Solution:**
- Check backend console for error stack trace
- Verify database connection in `application.properties`
- Check database exists: `smartsafar_db`
- Verify MySQL is running

### 5. 401 Unauthorized (After Login)

**Error Message:**
```
401 (Unauthorized)
```

**Solution:**
- Check JWT token is stored in localStorage
- Verify token format: `Bearer <token>`
- Check token expiration
- Ensure backend security config allows endpoint

## Step-by-Step Connection Test

### Step 1: Verify Backend is Running

```bash
# Test in browser or curl
http://localhost:8082/api/routes
```

**Expected:** Should return `[]` (empty array) or JSON data

**If fails:**
- Start backend: `cd cms && ./mvnw.cmd spring-boot:run`
- Check MySQL is running
- Verify database credentials

### Step 2: Verify Frontend API Configuration

Check `Frontends/src/lib/api.js`:
```javascript
baseURL: "http://localhost:8082/api"
```

### Step 3: Test from Browser Console

Open browser DevTools (F12) → Console tab, run:

```javascript
// Test API connection
fetch('http://localhost:8082/api/routes')
  .then(r => r.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
```

**Expected:** Should log success or show CORS error

### Step 4: Check CORS Configuration

Backend file: `cms/src/main/java/com/smartsafar/config/CrosConfig.java`

Should include:
```java
.allowedOrigins("http://localhost:8080")
```

### Step 5: Check Network Tab

1. Open DevTools → Network tab
2. Make an API call (e.g., search buses)
3. Check request:
   - **URL:** Should be `http://localhost:8082/api/...`
   - **Status:** Should be 200 (not CORS error)
   - **Headers:** Should include `Authorization: Bearer ...` if logged in

## Quick Fixes

### Fix 1: Use Vite Proxy (Recommended)

Change API base URL to relative:
```javascript
// In Frontends/src/lib/api.js
baseURL: "/api"  // Relative URL uses Vite proxy
```

Then restart frontend dev server.

### Fix 2: Ensure Both Servers Running

**Terminal 1 - Backend:**
```powershell
cd cms
.\mvnw.cmd spring-boot:run
```

**Terminal 2 - Frontend:**
```powershell
cd Frontends
npm run dev
```

### Fix 3: Check Firewall/Antivirus

- Windows Firewall might block connections
- Antivirus might block localhost connections
- Try disabling temporarily to test

### Fix 4: Clear Browser Cache

- Clear localStorage: `localStorage.clear()` in console
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Try incognito/private window

## Environment-Specific Issues

### Windows Specific

If `localhost` doesn't work, try `127.0.0.1`:
```javascript
baseURL: "http://127.0.0.1:8082/api"
```

### Port Conflicts

If port 8082 is in use:
1. Change backend port in `application.properties`:
   ```properties
   server.port=8083
   ```
2. Update frontend API URL accordingly

### Database Connection Issues

If backend won't start due to database:
1. Verify MySQL is running: `mysql -u root -p`
2. Create database: `CREATE DATABASE smartsafar_db;`
3. Check credentials in `application.properties`

## Testing Connection

Run this PowerShell script to test:

```powershell
# Test Backend
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8082/api/routes" -UseBasicParsing
    Write-Host "✓ Backend is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Backend not accessible: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Frontend
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080" -UseBasicParsing -TimeoutSec 5
    Write-Host "✓ Frontend is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Frontend not accessible" -ForegroundColor Red
}
```

## Still Not Working?

1. **Check Backend Logs:**
   - Look for startup errors
   - Check for database connection errors
   - Verify all dependencies are installed

2. **Check Frontend Console:**
   - Open DevTools → Console
   - Look for error messages
   - Check Network tab for failed requests

3. **Verify All Files:**
   - `api.js` has correct baseURL
   - `CrosConfig.java` allows frontend origin
   - `application.properties` has correct port

4. **Restart Everything:**
   - Stop both servers
   - Clear browser cache
   - Restart backend first
   - Then restart frontend

## Need More Help?

- Check backend console for error stack traces
- Check browser DevTools → Network tab for request details
- Verify both servers are on correct ports
- Ensure no firewall/antivirus blocking connections


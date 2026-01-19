# SmartSafar - Frontend & Backend Testing Guide

This guide will help you test the integrated frontend and backend of the SmartSafar City Bus Management System.

## Prerequisites

1. **Java 17** installed
2. **Node.js** (v18 or higher) and npm installed
3. **MySQL** database running
4. **Maven** (for backend) or use `mvnw` wrapper

## Step 1: Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE smartsafar_db;
```

2. Update database credentials in `cms/src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartsafar_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

## Step 2: Start the Backend (Spring Boot)

### Option A: Using Maven Wrapper (Windows)
```bash
cd cms
./mvnw.cmd spring-boot:run
```

### Option B: Using Maven (if installed)
```bash
cd cms
mvn spring-boot:run
```

### Option C: Using IDE
Run `CmsApplication.java` from your IDE (IntelliJ IDEA, Eclipse, etc.)

**Expected Output:**
- Backend should start on `http://localhost:8082`
- Database tables will be auto-created (due to `spring.jpa.hibernate.ddl-auto=update`)
- You should see "Started CmsApplication" in the console

**Verify Backend:**
- Open browser: `http://localhost:8082/api/routes` (should return empty array `[]` or route data)

## Step 3: Start the Frontend (React + Vite)

```bash
cd Frontends
npm install  # Only needed first time
npm run dev
```

**Expected Output:**
- Frontend should start on `http://localhost:8080` (or next available port)
- You should see Vite dev server running

## Step 4: Testing Checklist

### ✅ Authentication Testing

#### Test 1: User Registration
1. Navigate to `http://localhost:8080/register`
2. Fill in:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Phone: `1234567890`
   - Password: `password123`
   - Confirm Password: `password123`
3. Check "I agree to terms"
4. Click "Create Account"
5. **Expected:** Success message, redirect to login page

#### Test 2: User Login
1. Navigate to `http://localhost:8080/login`
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Sign In"
4. **Expected:** Success, redirect to dashboard with user data

### ✅ Bus Search Testing

#### Test 3: Search Buses
1. Navigate to `http://localhost:8080/search`
2. Enter:
   - From: `Central Station`
   - To: `City Mall`
3. Click "Search Buses"
4. **Expected:** 
   - Loading spinner appears
   - API call to `/api/buses/search?from=Central Station&to=City Mall`
   - Results displayed (or "No buses found" if no data)

**Note:** You may need to seed database with test data first (see below)

### ✅ Routes Page Testing

#### Test 4: View Routes
1. Navigate to `http://localhost:8080/routes`
2. **Expected:**
   - Routes list loads from `/api/routes`
   - Click on a route to see stops loaded from `/api/route-stops/{routeId}`

### ✅ Booking Testing

#### Test 5: Book a Ticket (Requires Login)
1. Login first (Test 2)
2. Search for buses (Test 3)
3. Click "Book Now" on any bus
4. Select passengers (use +/- buttons)
5. Click "Continue to Payment"
6. Select payment method
7. Click "Pay ₹XX.XX"
8. **Expected:**
   - API call to `/api/tickets/book`
   - API call to `/api/payments`
   - Success message and booking confirmation

### ✅ Dashboard Testing

#### Test 6: View User Tickets
1. After login, navigate to `http://localhost:8080/dashboard`
2. **Expected:**
   - User profile displayed
   - Upcoming bookings section loads from `/api/tickets/user/{userId}`
   - Recent trips displayed

## Step 5: Seed Test Data (Optional)

If you want to test with sample data, you can use the backend API or add data directly to the database:

### Using API (via Postman/curl):

```bash
# Add a Route
curl -X POST http://localhost:8082/api/routes \
  -H "Content-Type: application/json" \
  -d '{
    "routeName": "Central Express",
    "source": "Central Station",
    "destination": "City Mall",
    "totalStops": 10,
    "frequencyMinutes": 15
  }'

# Add a Stop
curl -X POST http://localhost:8082/api/stops \
  -H "Content-Type: application/json" \
  -d '{
    "stopName": "Central Station",
    "latitude": 28.6139,
    "longitude": 77.2090
  }'

# Add Route Stop
curl -X POST http://localhost:8082/api/route-stops \
  -H "Content-Type: application/json" \
  -d '{
    "routeId": 1,
    "stopName": "Central Station",
    "stopOrder": 1
  }'
```

## Troubleshooting

### Backend Issues

**Problem: Port 8082 already in use**
- Solution: Change port in `application.properties`: `server.port=8083`

**Problem: Database connection failed**
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `application.properties`

**Problem: CORS errors in browser console**
- Check `CrosConfig.java` allows `http://localhost:8080`
- Verify backend is running on port 8082

### Frontend Issues

**Problem: API calls fail with Network Error**
- Check backend is running
- Verify API base URL in `Frontends/src/lib/api.js` is `http://localhost:8082/api`
- Check browser console for CORS errors

**Problem: 401 Unauthorized errors**
- Ensure user is logged in
- Check token is stored in localStorage
- Verify JWT token is being sent in Authorization header

**Problem: Blank page or white screen**
- Check browser console for errors
- Verify all npm packages installed: `npm install`
- Clear browser cache and reload

### Common API Errors

**404 Not Found**
- Verify endpoint URL matches backend controller paths
- Check if route is defined in backend

**500 Internal Server Error**
- Check backend console logs
- Verify database tables exist
- Check entity relationships are correct

## API Endpoints Reference

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Buses
- `GET /api/buses/search?from={from}&to={to}` - Search buses

### Routes
- `GET /api/routes` - Get all routes
- `POST /api/routes` - Add route

### Route Stops
- `GET /api/route-stops/{routeId}` - Get stops for a route
- `POST /api/route-stops` - Add stop to route

### Tickets
- `POST /api/tickets/book` - Book a ticket
- `GET /api/tickets/user/{userId}` - Get user tickets

### Payments
- `POST /api/payments` - Process payment

## Testing with Browser DevTools

1. **Network Tab**: Monitor API calls
   - Check request/response payloads
   - Verify status codes (200, 401, 404, etc.)
   - Check if JWT token is sent in headers

2. **Console Tab**: Check for JavaScript errors
   - Look for API errors
   - Check for React errors

3. **Application Tab**: Check localStorage
   - Verify `token`, `role`, `userId`, `name` are stored after login

## Quick Test Commands

```bash
# Backend health check
curl http://localhost:8082/api/routes

# Frontend health check
curl http://localhost:8080

# Test login (replace credentials)
curl -X POST http://localhost:8082/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Success Indicators

✅ Backend running without errors  
✅ Frontend loads in browser  
✅ No CORS errors in console  
✅ Login/Register works  
✅ API calls show 200 status codes  
✅ Data displays in UI  
✅ Navigation between pages works  

## Next Steps After Testing

1. If everything works: You're ready for development!
2. If issues found: Check error messages in console/logs
3. For production: Update API base URL to production backend URL
4. For deployment: Build frontend with `npm run build` and serve static files

---

**Need Help?** Check the console logs, backend logs, and verify all dependencies are installed.


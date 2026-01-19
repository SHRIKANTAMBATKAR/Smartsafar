#!/bin/bash
# SmartSafar Integration Test Script (Bash)
# This script helps verify frontend and backend are running correctly

echo "=== SmartSafar Integration Test ==="
echo ""

# Test Backend
echo "1. Testing Backend (http://localhost:8082)..."
if curl -s -f http://localhost:8082/api/routes > /dev/null 2>&1; then
    echo "   ✓ Backend is running!"
    echo "   Response: $(curl -s http://localhost:8082/api/routes)"
else
    echo "   ✗ Backend is NOT running or not accessible"
    echo "   Please start the backend: cd cms && ./mvnw spring-boot:run"
fi

echo ""

# Test Frontend
echo "2. Testing Frontend (http://localhost:8080)..."
if curl -s -f http://localhost:8080 > /dev/null 2>&1; then
    echo "   ✓ Frontend is running!"
else
    echo "   ✗ Frontend is NOT running or not accessible"
    echo "   Please start the frontend: cd Frontends && npm run dev"
fi

echo ""
echo "=== Test Complete ==="
echo ""
echo "Next steps:"
echo "  1. Open http://localhost:8080 in your browser"
echo "  2. Test registration: http://localhost:8080/register"
echo "  3. Test login: http://localhost:8080/login"
echo "  4. Test search: http://localhost:8080/search"
echo ""


# 🚌 SmartSafar – City Bus Management System
SmartSafar is a **full-stack city bus management system** designed to provide a seamless public transport experience for users, conductors, and administrators.  
The platform enables **bus search, route management, ticket booking, secure payments, and real-time tracking**, built using modern backend and frontend technologies.

---

## 🚀 Features

### 👤 User Features
- User registration and login with **JWT authentication**
- Search buses by source and destination
- View routes, stops, and schedules
- Book tickets with QR code generation
- Secure online payment
- View booking history and dashboard

### 🎟️ Conductor Features
- Validate tickets using **QR code**
- Real-time ticket verification

### 🛠️ Admin Features
- Manage routes, stops, and buses
- Create and manage bus schedules
- Monitor active bus trips
- View system-level analytics

### 🚌 System Features
- Role-based access control (USER / ADMIN / CONDUCTOR)
- Secure REST APIs
- Real-time bus trip tracking
- Clean DTO-based backend architecture

---

## 🧰 Tech Stack

| Layer        | Technology / Tools                          |
|--------------|----------------------------------------------|
| Frontend     | React, Vite, Tailwind CSS, Axios              |
| Backend      | Java 17, Spring Boot 3 , Hibernate (JPA)      |
| Security     | Spring Security, JWT, BCrypt                 |
| Database     | MySQL                                        |
| API Style    | RESTful APIs                                 |
| Tools         | Maven, Postman, Git, GitHub, Eclipse        |



---

## 🏗️ Project Architecture

### Backend Architecture
- RESTful API design
- DTO-based service layer
- Global exception handling
- JWT-based authentication and authorization
- Modular package structure
```
com.smartsafar
├── controller
├── service
├── serviceImpl
├── repository
├── entity
├── dto
├── security
├── config
└── exception
```
---

### Frontend Architecture
```
src/
├── pages
├── components
├── context
├── lib
└── assets
```

---

## 🔐 Authentication & Security

- JWT-based authentication
- Passwords encrypted using **BCrypt**
- Role-based authorization
- Secured endpoints using Spring Security
- CORS configured for frontend-backend integration

---

## 🗄️ Database Design

The database is designed with proper normalization and foreign key constraints.

Main tables:
- users
- routes
- stops
- route_stops
- buses
- bus_schedules
- bus_trips
- tickets
- payments

Database schema file is available at:
/database/schema.sql


---

## 📡 API Overview

### Auth APIs
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### User APIs
- `GET /api/users/{id}`

### Route & Bus APIs
- `POST /api/routes`
- `GET /api/routes`
- `POST /api/buses`
- `GET /api/buses/search`

### Ticket & Payment APIs
- `POST /api/tickets/book`
- `GET /api/tickets/user/{id}`
- `POST /api/payments`

### Trip & Tracking APIs
- `POST /api/trips/start`
- `PUT /api/trips/update/{tripId}`
- `GET /api/trips/active/{routeId}`

---

## ▶️ How to Run the Project

### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/SHRIKANTAMBATKAR/Smartsafar.git
```
Configure MySQL database in application.properties
```
spring.datasource.url=jdbc:mysql://localhost:3306/smartsafar
spring.datasource.username=root
spring.datasource.password=yourpassword
```

2. Run the backend
```
mvn spring-boot:run
```

3. Backend runs on:
```
http://localhost:8082
```
## Frontend Setup

1. Navigate to frontend directory
```
cd frontend
```

2. Install dependencies
```
npm install
```

3. Start frontend
```
npm run dev

```
Frontend runs on:
```
http://localhost:5173
```
---

### 🔗 Frontend–Backend Integration

- Axios used for API calls
- JWT token automatically attached using Axios interceptors
- Auth state managed using React Context API
- Protected routes implemented for secured pages

---

### 🧪 API Testing

- APIs tested using Postman
- JWT token passed via Authorization: Bearer <token>
- Error handling validated for authentication and authorization

### 📌 Future Enhancements

- Refresh token mechanism
- Swagger API documentation
- Mobile app integration
- Real-time notifications
- Analytics dashboard
- Dockerization and cloud deployment
---

### 👨‍💻 Author

Shrikant Ambatkar <BR/>
B.Tech Computer Science<BR/>
Full Stack Java Developer

- GitHub: https://github.com/SHRIKANTAMBATKAR
- LinkedIn: https://www.linkedin.com/in/shrikant-ambatkar-803174246/

### ⭐ Acknowledgements

This project was developed as part of academic learning and hands-on practice in building scalable, secure, real-world full-stack applications.

### 📄 License

This project is for educational purposes only.

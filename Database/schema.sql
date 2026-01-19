
-- USERS
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    reward_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ROUTES
CREATE TABLE routes (
    route_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    route_name VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    total_stops INT NOT NULL,
    frequency_minutes INT NOT NULL
);

-- STOPS
CREATE TABLE stops (
    stop_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    stop_name VARCHAR(100) NOT NULL,
    latitude DOUBLE,
    longitude DOUBLE
);

-- ROUTE STOPS 
CREATE TABLE route_stops (
    route_stop_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    route_id BIGINT NOT NULL,
    stop_name VARCHAR(100) NOT NULL,
    stop_order INT NOT NULL,
    FOREIGN KEY (route_id) REFERENCES routes(route_id)
        ON DELETE CASCADE
);

-- BUSES
CREATE TABLE buses (
    bus_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bus_number VARCHAR(50) NOT NULL UNIQUE,
    bus_type VARCHAR(50),
    capacity INT,
    rating DOUBLE,
    fare DOUBLE,
    route_id BIGINT,
    FOREIGN KEY (route_id) REFERENCES routes(route_id)
        ON DELETE SET NULL
);

-- BUS SCHEDULES
CREATE TABLE bus_schedules (
    schedule_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bus_id BIGINT NOT NULL,
    route_id BIGINT NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    fare DOUBLE NOT NULL,
    FOREIGN KEY (bus_id) REFERENCES buses(bus_id)
        ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(route_id)
        ON DELETE CASCADE
);

-- BUS TRIPS (LIVE TRACKING)
CREATE TABLE bus_trips (
    trip_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bus_id BIGINT NOT NULL,
    route_id BIGINT NOT NULL,
    current_lat DOUBLE,
    current_lng DOUBLE,
    current_stop_index INT,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bus_id) REFERENCES buses(bus_id),
    FOREIGN KEY (route_id) REFERENCES routes(route_id)
);

-- TICKETS
CREATE TABLE tickets (
    ticket_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    bus_id BIGINT NOT NULL,
    route_id BIGINT NOT NULL,
    from_stop VARCHAR(100),
    to_stop VARCHAR(100),
    passenger_count INT,
    total_fare DOUBLE,
    status VARCHAR(30),
    qr_token VARCHAR(255) UNIQUE,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (bus_id) REFERENCES buses(bus_id),
    FOREIGN KEY (route_id) REFERENCES routes(route_id)
);

-- PAYMENTS
CREATE TABLE payments (
    payment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticket_id BIGINT NOT NULL,
    amount DOUBLE NOT NULL,
    payment_mode VARCHAR(50),
    payment_status VARCHAR(30),
    transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id)
        ON DELETE CASCADE
);
DROP DATABASE IF EXISTS health_scheduler;

CREATE DATABASE health_scheduler;

USE health_scheduler;

CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    role ENUM("patient", "provider", "admin") DEFAULT "patient",
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    age INT, 
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE medical_hx(
     id INT NOT NULL AUTO_INCREMENT,
     diagnosis TEXT,
     dateOfDiagnosis DATE,
     tx BOOLEAN NOT NULL,
     courseOfTx TEXT,
     patientId INT NOT NULL, 
     PRIMARY KEY(id),
     FOREIGN KEY (patientId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE appointments(
    id INT NOT NULL AUTO_INCREMENT,
    providerId INT NOT NULL,
    patientId INT NOT NULL,
    date DATE NOT NULL,
    status ENUM("booked", "completed", "cancelled") DEFAULT "booked",
    PRIMARY KEY (id),
    FOREIGN KEY (providerId) REFERENCES user(id),
    FOREIGN KEY (patientId) REFERENCES user(id)
);

CREATE TABLE provider_availability(
    id INT NOT NULL AUTO_INCREMENT,
    providerId INT NOT NULL,
    availableDate DATE,
    availableStartTime TIME,
    availableEndTime TIME,
    PRIMARY KEY (id),
    FOREIGN KEY (providerId) REFERENCES user(id) ON DELETE CASCADE
);
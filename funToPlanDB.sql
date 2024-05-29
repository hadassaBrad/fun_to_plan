CREATE DATABASE IF NOT EXISTS funToPlanDB;
USE funToPlanDB;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS difficulty;
DROP TABLE IF EXISTS area;
DROP TABLE IF EXISTS age;
DROP TABLE IF EXISTS sites;

CREATE TABLE passwords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(225) NOT NULL,
    loginAttempts INT NOT NULL,
    lastLogin DATETIME,
    lastFailedLogin DATETIME,
    account_status BOOL NOT NULL
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(225) NOT NULL
);

CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(225) NOT NULL,
    street VARCHAR(225) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    user_name VARCHAR(225) NOT NULL,
    password_id INT NOT NULL,
    email VARCHAR(225) NOT NULL,
    address_id INT,
    FOREIGN KEY (address_id) REFERENCES addresses(id),
    FOREIGN KEY (role_id) REFERENCES permissions(id),
    FOREIGN KEY (password_id) REFERENCES passwords(id)
);

CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(225) NOT NULL,
    name VARCHAR(225) NOT NULL
);

CREATE TABLE difficulty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level VARCHAR(225) NOT NULL
);

CREATE TABLE area (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_area VARCHAR(225) NOT NULL
);

CREATE TABLE age (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age_range VARCHAR(225) NOT NULL
);

CREATE TABLE sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(225) NOT NULL,
    description VARCHAR(225),
    popularity INT NOT NULL,
    id_difficulty INT NOT NULL,
    id_area INT NOT NULL,
    price INT NOT NULL,
    id_age INT NOT NULL,
    opening_hour TIME,
    closing_hour TIME,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    track_length INT,
    FOREIGN KEY (id_difficulty) REFERENCES difficulty(id),
    FOREIGN KEY (id_area) REFERENCES area(id),
    FOREIGN KEY (id_age) REFERENCES age(id)
);

CREATE DATABASE upworks;
use upworks;
-- SELECT * FROM Users;

create table Users (
    userID VARCHAR(300) not null PRIMARY KEY,
    userName VARCHAR(255) not null,
    email VARCHAR(255) not null UNIQUE,
    password VARCHAR(255) not null,
    role varchar(20) DEFAULT 'customer',
    Welcomed bit DEFAULT 0,
    isDeleted bit DEFAULT 0,
    emailSent bit DEFAULT 0,
    expiryTime int,
    resetToken varchar(255) null,
    profilePic varbinary(max) 
)

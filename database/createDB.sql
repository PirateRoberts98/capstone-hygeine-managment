/*Create database*/
CREATE DATABASE capstone

/*Create table USERS*/
CREATE TABLE users (
    userID SERIAL NOT NULL,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255),
    email VARCHAR(255),
    doctor VARCHAR(255),
    bday DATE,
    gender VARCHAR(255),
    pw VARCHAR(255),
    isCaregiver BOOLEAN,
    PRIMARY KEY (userID)
);
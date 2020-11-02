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

/*Create table SensorPressure*/
CREATE TABLE dataSensor (
    sensorId INT NOT NULL,
    userId INT NOT NULL,
    sensorType VARCHAR(255) NOT NULL,
    tStamp INT NOT NULL,
    val INT NOT NULL
);
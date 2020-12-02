/*Create database*/
CREATE DATABASE capstone

/*Create table USERS*/
CREATE TABLE users (
    userID SERIAL NOT NULL,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255),
    bday DATE,
    gender VARCHAR(255),
    doctor VARCHAR(255),
    doctorId INT,
    isCaregiver BOOLEAN,
    isPatient BOOLEAN,
    isDeveloper BOOLEAN,
    email VARCHAR(255),
    pw VARCHAR(255),
    PRIMARY KEY (userID)
);

/*Create table SensorPressure*/
CREATE TABLE dataSensor (
    sensorId INT NOT NULL,
    userId VARCHAR(255) NOT NULL,
    sensorType VARCHAR(255) NOT NULL,
    tStamp INT NOT NULL,
    val INT NOT NULL
);

/*Create table sensors for testing*/
CREATE TABLE dataSensorTest (
    sensorId INT NOT NULL,
    userId VARCHAR(255) NOT NULL,
    sensorType VARCHAR(255) NOT NULL,
    tStamp INT NOT NULL,
    val INT NOT NULL,
    stat VARCHAR(255),
    msg VARCHAR(255)
);

/*Create table Messages*/
CREATE TABLE messages(
    messageId SERIAL NOT NULL,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    messageValue VARCHAR(255) NOT NULL,
    PRIMARY KEY (messageId)
);
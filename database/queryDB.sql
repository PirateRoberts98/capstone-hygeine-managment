/*register(insert) users to db*/
INSERT INTO users(fname, lname, email, doctor, bday, gender, pw, iscaregiver)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

/* Register User to DB*/
INSERT INTO users (userID, fname, lname, bday, gender, doctor, isCaregiver, isPatient, isDeveloper, email, pw)
VALUES (1, 'James', 'Lee', '12/12/1997', 'male', 'James Chui', false, false, true, 'developer@hms.com', 'pass123')

/* Query users in DB*/
SELECT * FROM users

/* Query users in DB*/
SELECT * FROM users
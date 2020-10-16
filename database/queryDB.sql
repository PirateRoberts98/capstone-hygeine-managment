/*register(insert) users to db*/
INSERT INTO users(fname, lname, email, doctor, bday, gender, pw, iscaregiver)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
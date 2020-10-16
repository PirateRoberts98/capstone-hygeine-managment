const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const bcrypt = require('bcrypt');

//Database Connection
let pool = new pg.Pool({
    port: 5432,
    database: 'capstone',
    max: 20,
})

var app = express();

const PORT = 3001;
app.listen(PORT, () => console.log('Listening on port ' + PORT));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/register', function(req, res){
    const salt = bcrypt.genSaltSync();
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password1, salt);;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var bday = req.body.bday;
    var gender = req.body.gender;
    var doctor = req.body.doctor;
    var isCaregiver = req.body.isCaregiver;

    pool.connect((err, db, done) => {
        if(err){
            return res.status(400).send(err);
        } else{
            db.query("INSERT INTO Users(fname, lname, email, doctor, bday, gender, pw, iscaregiver) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [fname, lname, email, doctor, bday, gender, password, isCaregiver], (err, table) => {
                if (err){
                    console.log(err);
                    return res.status(400).send(err);
                }
                else{
                    res.status(201).send({value: true});
                }
            })
        }
    })
})
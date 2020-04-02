'use strict';
var admin = require('firebase-admin');
var serviceAccount = require("../../../ceg4912project-firebase-adminsdk-8qvzs-d95f3a692a.json");
// Get a database reference to our blog
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ceg4912project.firebaseio.com/'
  });
var db = admin.database();
var ref = db.ref("server/");

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    
});

app.post('/alert', function(req,res) {
    let alert = req.body;
    res.send('Received Alert');
    var alertRef = ref.child("alert");
    alertRef.push({
        alert
    });
});

app.post('/sensor/temperature', function(req,res) {
    res.send('Received temperature sensor JSON');
    let senTemp = req.body;
    var senTempRef = ref.child("sensorTemp");
    senTempRef.push({
        senTemp
    });
});

app.post('/sensor/pressure', function(req,res) {
    res.send('Received pressure sensor JSON');
    let senPressure = req.body;
    var senPressureRef = ref.child("sensorPressure");
    senPressureRef.push({
        senPressure
    });
});

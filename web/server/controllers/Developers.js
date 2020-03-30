'use strict';

var utils = require('../utils/writer.js');
var Developers = require('../service/DevelopersService');

module.exports.retrieveAlert = function retrieveAlert (req, res, next, body) {
  Developers.retrieveAlert(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.retrieveSensorPressureID = function retrieveSensorPressureID (req, res, next, body) {
  Developers.retrieveSensorPressureID(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.retrieveSensorTemperatureID = function retrieveSensorTemperatureID (req, res, next, body) {
  Developers.retrieveSensorTemperatureID(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

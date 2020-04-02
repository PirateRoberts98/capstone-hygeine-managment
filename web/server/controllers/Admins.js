'use strict';

var utils = require('../utils/writer.js');
var Admins = require('../service/AdminsService');

module.exports.retrieveAlert = function retrieveAlert (req, res, next, body) {
  Admins.retrieveAlert(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.retrieveSensorPressureID = function retrieveSensorPressureID (req, res, next, body) {
  Admins.retrieveSensorPressureID(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.retrieveSensorTemperatureID = function retrieveSensorTemperatureID (req, res, next, body) {
  Admins.retrieveSensorTemperatureID(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

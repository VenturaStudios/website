var path = require('path');
var express = require('express');
var router = express.Router();
var config = require('../../config/config');
var applicationService = require('../services/application');
var feedbackService = require('../services/feedback');

var wrapResponse = require('../wrappers/wrapResponse');

module.exports = function (app) {
  app.get('*', function (req, res) {
    res.sendFile(path.join(config.root, config.public, 'index.html'));
  });
};

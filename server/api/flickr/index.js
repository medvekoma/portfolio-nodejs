'use strict';

var express = require('express');
var controller = require('./flickr.controller');

var router = express.Router();

router.get('/:userId', controller.index);

module.exports = router;

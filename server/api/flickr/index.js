'use strict';

var express = require('express');
var controller = require('./flickr.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/callback', controller.callback);

module.exports = router;

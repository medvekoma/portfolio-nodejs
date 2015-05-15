'use strict';

var _ = require('lodash');

var Flickr = require('flickrapi');
var flickrOptions = {
  api_key: process.env.FLICKR_APIKEY,
  secret: process.env.FLICKR_SECRET
};

function processPhotos(photos, res){
  var result = photos.map(function (item) {
    var left = (350 - item.width_s) / 2;
    var top = (350 - item.height_s) / 2;
    var userAlias = item.pathalias;
    if (!userAlias) {
      userAlias = item.owner;
    }

    return {
      title: item.title,
      imageUrl: item.url_s,
      height: item.height_s,
      width: item.width_s,
      left: left,
      top: top,
      textTop: top + parseInt(item.height_s) + 5,
      flickrUrl: 'http://flickr.com/photos/' + userAlias + '/' + item.id,
      ownerName: item.ownername,
      userAlias: userAlias
    };
  })
  res.json(result);
}

function getPhotosOf(userId, res){
  Flickr.tokenOnly(flickrOptions, function(err, flickr){
    if (err){
      res.json({error: err});
    } else {
      var options = {
        user_id: userId,
        per_page: 30,
        extras: 'url_s, path_alias, owner_name'};
      flickr.people.getPhotos(options, function(err, response) {
        if (err) {
          console.log(err);
          res.json(404, {});
        } else {
          processPhotos(response.photos.photo, res);
        }
      })
    }
  })
}

function getInterestingPhotos(res){
  Flickr.tokenOnly(flickrOptions, function(err, flickr){
    if (err) {
      res.json({error: err});
    } else {
      var options = {
        per_page: 30,
        extras: 'url_s, path_alias, owner_name'};
      flickr.interestingness.getList(options, function(err, response) {
        if (err) {
          console.log(err);
          res.json(404, {});
        } else {
          processPhotos(response.photos.photo, res);
        }
      })
    }
  })
}

// Get list of flickrs
exports.index = function(req, res) {
  var userId = req.params.userId;

  getPhotosOf(userId, res);
};

exports.home = function(req, res) {
  getInterestingPhotos(res);
}

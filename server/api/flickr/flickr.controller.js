'use strict';

var _ = require('lodash');

var Flickr = require('flickrapi');
var flickrOptions = {
  api_key: process.env.FLICKR_APIKEY,
  secret: process.env.FLICKR_SECRET
};

function getOptions(req)
{
  flickrOptions.callback = 'http://' + req.headers.host + '/api/flickr/callback'; //
  console.log('CALLBACK: ' + flickrOptions.callback);
  return flickrOptions;
}

// Get list of flickrs
exports.index = function(req, res) {
  console.log('UserId: ' + req.params.userId);
  Flickr.tokenOnly(getOptions(req), function(err, flickr){
    var options = {
      user_id: req.params.userId,
      per_page: 30,
      extras: 'url_s, path_alias'};
    flickr.people.getPhotos(options, function(err, response){
      if (err){
        console.log(err);
      } else {
        var result = response.photos.photo.map(function (item) {
          var left = (350 - item.width_s) / 2;
          var top = (350 - item.height_s) / 2;
          var userAlias = item.pathalias;
          if (!userAlias){
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
            flickrUrl: 'http://flickr.com/photos/' + userAlias + '/' + item.id
          };
        })
        res.json(result);
      }
    })
  })
};


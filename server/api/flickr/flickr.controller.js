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
  Flickr.tokenOnly(getOptions(req), function(err, flickr){
    flickr.people.getPhotos({user_id: '27725019@N00', per_page: 30, extras: 'url_s'}, function(err, response){
      if (err){
        console.log(err);
      } else {
        var result = response.photos.photo.map(function (item) {
          var left = (350 - item.width_s) / 2;
          var top = (350 - item.height_s) / 2;
          return {
            title: item.title,
            imageUrl: item.url_s,
            height: item.height_s,
            width: item.width_s,
            left: left,
            top: top,
            textTop: top + parseInt(item.height_s) + 5
          };
        })
        res.json(result);
      }
    })
  })
};

exports.callback = function(req, res){
  console.log('QUERY: ' + req.query);
  flickrOptions.exchange(req.query);
  res.write('');
};

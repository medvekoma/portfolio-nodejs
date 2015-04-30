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
    flickr.people.getPhotos({user_id: '27725019@N00', per_page: 30}, function(err, response){
      if (err){
        console.log(err);
      } else {
        var result = response.photos.photo.map(function (item) {
          return {
            title: item.title,
            imageUrl: 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg'};
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

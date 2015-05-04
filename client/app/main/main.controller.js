'use strict';

angular.module('portfotolioNodejsApp')
  .controller('MainCtrl', function ($http) {
    var self = this;
    self.photos = [];

    $http.get('/api/flickr').success(function(photos) {
      self.photos = photos;
    });

  });

'use strict';

angular.module('portfotolioNodejsApp')
  .controller('MainCtrl', function ($http, $stateParams) {
    var self = this;
    self.photos = [];

    var userId = $stateParams.userId;
    if (!userId){
      userId = '';
    }
    $http.get('/api/flickr/' + userId).success(function(photos) {
      self.photos = photos;
    });

  });

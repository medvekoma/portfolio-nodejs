'use strict';

angular.module('portfotolioNodejsApp')
  .controller('MainCtrl', function ($http, $stateParams) {
    var self = this;
    self.photos = [];

    var userId = '27725019@N00';
    if ($stateParams.userId){
      userId = $stateParams.userId;
    }
    $http.get('/api/flickr/' + userId).success(function(photos) {
      self.photos = photos;
    });

  });

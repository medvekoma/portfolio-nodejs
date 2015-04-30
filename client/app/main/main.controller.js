'use strict';

angular.module('portfotolioNodejsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/flickr').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });

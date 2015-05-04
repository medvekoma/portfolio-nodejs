'use strict';

angular.module('portfotolioNodejsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/:userId',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as controller'
      });
  });

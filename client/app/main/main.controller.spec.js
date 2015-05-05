'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('portfotolioNodejsApp'));

  var $httpBackend, ctrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/flickr/')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    ctrl = $controller('MainCtrl');
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(ctrl.photos.length).toBe(4);
  });
});

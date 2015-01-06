describe('Unit: CarrousselCtrl', function() {
  
  beforeEach(module('CarrouselApp'));
  
  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('CarrousselCtrl', {
      $scope: scope
    });
  }));
  
  it('should generate an image data object', 
    function() {
      expect(scope.imageData).toBeDefined();
  });
  
  it('should have test object', 
    function() {
      scope.testFunction();
      expect(scope.test).toEqual("test");
  });
  
  
})
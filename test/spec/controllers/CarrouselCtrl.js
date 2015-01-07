describe('Unit: CarrouselCtrl', function() {
  
  beforeEach(module('CarrouselApp'));
  
  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('CarrouselCtrl', {
      $scope: scope
    });
  }));
  
  it('should have an image data object with image objects, each having at least a defined, non empty, path property', 
    function() {
      
      expect(scope.imageData).toBeDefined();
            
      for (var i = 0; i < scope.imageData.length; i++) {
        var image = scope.imageData[i];
        expect(image.path).toBeDefined();
        expect(image.path).not.toBe("");
      }
      
      
  });
  
  it('should generate an image data object', 
    function() {
      expect(scope.imageData).toBeDefined();
  });  
  
})
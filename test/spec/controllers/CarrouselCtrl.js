describe('Unit: CarrousselCtrl', function() {
  
  beforeEach(module('CarrouselApp'));
  
  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  
  it('should generate an image data object', 
    function() {
		var $scope = {};
		var controller = $controller('CarrousselCtrl', { $scope: $scope });
		expect($scope.imageData).toBeDefined();
		//scope.testFunction();
      //expect(scope.test).toEqual(true);
  });
  
  it('should have test object', 
    function() {
    	var $scope = {};
		var controller = $controller('CarrousselCtrl', { $scope: $scope });
		$scope.testFunction();
		expect($scope.test).toEqual("test");
  });
  
  
})
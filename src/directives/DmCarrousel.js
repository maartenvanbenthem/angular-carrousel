appDirectives.directive('dmCarrousel', function() {
  return {
    restrict: 'E',
    scope: {
	  data: '=imageData'
	},
	template: '<ul><li ng-repeat="image in data"><div><img ng-src="{{image.path}}" alt="{{image.name}}" /></div></li></ul>',
    compile: function(tElement, tAttributes) {
    	//console.log("compile")
    	
    }
  };
});
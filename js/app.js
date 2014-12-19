'use strict';

var carrouselApp = angular.module('CarrouselApp', [
	'appControllers',
	'appDirectives',
	'ngRoute',
	'ngAnimate',
	'ngTouch'
])
var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);
appControllers.controller('CarrouselCtrl', ['$scope', 
	
	function ($scope) {
				
		$scope.imageData = [];
		
		generateTestImageData($scope.imageData,20);
		
		console.log($scope.imageData.length);
		
		function generateTestImageData(imageDataObject,length) {
		
			for (var i=0; i < length; i++) {
                imageDataObject.push({
	                name: "Image " + (i+1),
	                path: "http://lorempixel.com/600/300/nature/" + ((i + 1) % 10)
                })
            }
        }
  
	}]
)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2R1bGUuanMiLCJzZXJ2aWNlcy9zZXJ2aWNlcy5qcyIsImNvbnRyb2xsZXJzL2NvbnRyb2xsZXJzLmpzIiwiZGlyZWN0aXZlcy9kaXJlY3RpdmVzLmpzIiwiY29udHJvbGxlcnMvQ2Fycm91c2VsQ29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvRG1DYXJyb3VzZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQ0FBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYXJyb3VzZWxBcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ2Fycm91c2VsQXBwJywgW1xuXHQnYXBwQ29udHJvbGxlcnMnLFxuXHQnYXBwRGlyZWN0aXZlcycsXG5cdCduZ1JvdXRlJyxcblx0J25nQW5pbWF0ZScsXG5cdCduZ1RvdWNoJ1xuXSkiLCJ2YXIgYXBwU2VydmljZXMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwU2VydmljZXMnLCBbXSk7IiwidmFyIGFwcENvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2FwcENvbnRyb2xsZXJzJywgW10pOyIsInZhciBhcHBEaXJlY3RpdmVzID0gYW5ndWxhci5tb2R1bGUoJ2FwcERpcmVjdGl2ZXMnLCBbXSk7IiwiYXBwQ29udHJvbGxlcnMuY29udHJvbGxlcignQ2Fycm91c2VsQ3RybCcsIFsnJHNjb3BlJywgXG5cdFxuXHRmdW5jdGlvbiAoJHNjb3BlKSB7XG5cdFx0XHRcdFxuXHRcdCRzY29wZS5pbWFnZURhdGEgPSBbXTtcblx0XHRcblx0XHRnZW5lcmF0ZVRlc3RJbWFnZURhdGEoJHNjb3BlLmltYWdlRGF0YSwyMCk7XG5cdFx0XG5cdFx0Y29uc29sZS5sb2coJHNjb3BlLmltYWdlRGF0YS5sZW5ndGgpO1xuXHRcdFxuXHRcdGZ1bmN0aW9uIGdlbmVyYXRlVGVzdEltYWdlRGF0YShpbWFnZURhdGFPYmplY3QsbGVuZ3RoKSB7XG5cdFx0XG5cdFx0XHRmb3IgKHZhciBpPTA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGltYWdlRGF0YU9iamVjdC5wdXNoKHtcblx0ICAgICAgICAgICAgICAgIG5hbWU6IFwiSW1hZ2UgXCIgKyAoaSsxKSxcblx0ICAgICAgICAgICAgICAgIHBhdGg6IFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzYwMC8zMDAvbmF0dXJlL1wiICsgKChpICsgMSkgJSAxMClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gIFxuXHR9XVxuKSIsImFwcERpcmVjdGl2ZXMuZGlyZWN0aXZlKCdkbUNhcnJvdXNlbCcsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcblx0ICBkYXRhOiAnPWltYWdlRGF0YSdcblx0fSxcblx0dGVtcGxhdGU6ICc8dWw+PGxpIG5nLXJlcGVhdD1cImltYWdlIGluIGRhdGFcIj48ZGl2PjxpbWcgbmctc3JjPVwie3tpbWFnZS5wYXRofX1cIiBhbHQ9XCJ7e2ltYWdlLm5hbWV9fVwiIC8+PC9kaXY+PC9saT48L3VsPicsXG4gICAgY29tcGlsZTogZnVuY3Rpb24odEVsZW1lbnQsIHRBdHRyaWJ1dGVzKSB7XG4gICAgXHQvL2NvbnNvbGUubG9nKFwiY29tcGlsZVwiKVxuICAgIFx0XG4gICAgfVxuICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
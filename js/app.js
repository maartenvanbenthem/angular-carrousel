'use strict';

var carrouselApp = angular.module('CarrouselApp', [
	'appControllers',	
	'ngRoute',
	'ngAnimate',
	'ngTouch'
])
var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2R1bGUuanMiLCJzZXJ2aWNlcy9zZXJ2aWNlcy5qcyIsImNvbnRyb2xsZXJzL2NvbnRyb2xsZXJzLmpzIiwiY29udHJvbGxlcnMvQ2Fycm91c2VsQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQ0FBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2Fycm91c2VsQXBwID0gYW5ndWxhci5tb2R1bGUoJ0NhcnJvdXNlbEFwcCcsIFtcblx0J2FwcENvbnRyb2xsZXJzJyxcdFxuXHQnbmdSb3V0ZScsXG5cdCduZ0FuaW1hdGUnLFxuXHQnbmdUb3VjaCdcbl0pIiwidmFyIGFwcFNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ2FwcFNlcnZpY2VzJywgW10pOyIsInZhciBhcHBDb250cm9sbGVycyA9IGFuZ3VsYXIubW9kdWxlKCdhcHBDb250cm9sbGVycycsIFtdKTsiLCJhcHBDb250cm9sbGVycy5jb250cm9sbGVyKCdDYXJyb3VzZWxDdHJsJywgWyckc2NvcGUnLCBcblx0XG5cdGZ1bmN0aW9uICgkc2NvcGUpIHtcblx0XHRcdFx0XG5cdFx0JHNjb3BlLmltYWdlRGF0YSA9IFtdO1xuXHRcdFxuXHRcdGdlbmVyYXRlVGVzdEltYWdlRGF0YSgkc2NvcGUuaW1hZ2VEYXRhLDIwKTtcblx0XHRcblx0XHRjb25zb2xlLmxvZygkc2NvcGUuaW1hZ2VEYXRhLmxlbmd0aCk7XG5cdFx0XG5cdFx0ZnVuY3Rpb24gZ2VuZXJhdGVUZXN0SW1hZ2VEYXRhKGltYWdlRGF0YU9iamVjdCxsZW5ndGgpIHtcblx0XHRcblx0XHRcdGZvciAodmFyIGk9MDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhT2JqZWN0LnB1c2goe1xuXHQgICAgICAgICAgICAgICAgbmFtZTogXCJJbWFnZSBcIiArIChpKzEpLFxuXHQgICAgICAgICAgICAgICAgcGF0aDogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNjAwLzMwMC9uYXR1cmUvXCIgKyAoKGkgKyAxKSAlIDEwKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgXG5cdH1dXG4pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
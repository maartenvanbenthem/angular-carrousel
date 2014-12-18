console.log("test");

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
			
		console.log("CarrouselCtrl initiated");
		
		$scope.imageData = [];
		
		generateTestImageData($scope.imageData,20);
		
		console.log($scope.imageData.length);
		
		$scope.users = [
                      {
                          name:"Mahesh",
                          description:"A geek",
                          age:"22"
                      },
                      {
                          name:"Ganesh",
                          description:"A nerd",
                          age:"25"
                      },
                      {
                          name:"Ramesh",
                          description:"A noob",
                          age:"27"
                      },
                      {
                          name:"Ketan",
                          description:"A psychopath",
                          age:"26"
                      },
                      {
                          name:"Niraj",
                          description:"Intellectual badass",
                          age:"29"
                      }
                    ];
		
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2R1bGUuanMiLCJzZXJ2aWNlcy9zZXJ2aWNlcy5qcyIsImNvbnRyb2xsZXJzL2NvbnRyb2xsZXJzLmpzIiwiY29udHJvbGxlcnMvQ2Fycm91c2VsQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLmxvZyhcInRlc3RcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYXJyb3VzZWxBcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ2Fycm91c2VsQXBwJywgW1xuXHQnYXBwQ29udHJvbGxlcnMnLFx0XG5cdCduZ1JvdXRlJyxcblx0J25nQW5pbWF0ZScsXG5cdCduZ1RvdWNoJ1xuXSkiLCJ2YXIgYXBwU2VydmljZXMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwU2VydmljZXMnLCBbXSk7IiwidmFyIGFwcENvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2FwcENvbnRyb2xsZXJzJywgW10pOyIsImFwcENvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0NhcnJvdXNlbEN0cmwnLCBbJyRzY29wZScsIFxuXHRcblx0ZnVuY3Rpb24gKCRzY29wZSkge1xuXHRcdFx0XG5cdFx0Y29uc29sZS5sb2coXCJDYXJyb3VzZWxDdHJsIGluaXRpYXRlZFwiKTtcblx0XHRcblx0XHQkc2NvcGUuaW1hZ2VEYXRhID0gW107XG5cdFx0XG5cdFx0Z2VuZXJhdGVUZXN0SW1hZ2VEYXRhKCRzY29wZS5pbWFnZURhdGEsMjApO1xuXHRcdFxuXHRcdGNvbnNvbGUubG9nKCRzY29wZS5pbWFnZURhdGEubGVuZ3RoKTtcblx0XHRcblx0XHQkc2NvcGUudXNlcnMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOlwiTWFoZXNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiQSBnZWVrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFnZTpcIjIyXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpcIkdhbmVzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpcIkEgbmVyZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2U6XCIyNVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6XCJSYW1lc2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246XCJBIG5vb2JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlOlwiMjdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOlwiS2V0YW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246XCJBIHBzeWNob3BhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlOlwiMjZcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOlwiTmlyYWpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246XCJJbnRlbGxlY3R1YWwgYmFkYXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFnZTpcIjI5XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF07XG5cdFx0XG5cdFx0ZnVuY3Rpb24gZ2VuZXJhdGVUZXN0SW1hZ2VEYXRhKGltYWdlRGF0YU9iamVjdCxsZW5ndGgpIHtcblx0XHRcblx0XHRcdGZvciAodmFyIGk9MDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhT2JqZWN0LnB1c2goe1xuXHQgICAgICAgICAgICAgICAgbmFtZTogXCJJbWFnZSBcIiArIChpKzEpLFxuXHQgICAgICAgICAgICAgICAgcGF0aDogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNjAwLzMwMC9uYXR1cmUvXCIgKyAoKGkgKyAxKSAlIDEwKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgXG5cdH1dXG4pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
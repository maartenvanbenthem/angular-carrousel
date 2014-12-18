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
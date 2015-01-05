appControllers.controller('CarrouselCtrl', ['$scope', 
	
	function CarrouselCtrl($scope) {
				
		$scope.imageData = [];
		
		generateTestImageData($scope.imageData,4);
		
		$scope.testFunction = function (){
			
			$scope.test = "test";
			
		}
				
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
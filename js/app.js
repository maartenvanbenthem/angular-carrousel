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
		
		generateTestImageData($scope.imageData,8);

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
appDirectives.directive('dmCarrousel', ['$compile', function($compile) {

  return {
    restrict: 'E',
    scope: {
	  data: '=imageData'
	},
    compile: function(tElement, tAttributes) {
    	
    	return function(scope, iElement, iAttributes, containerCtrl) {
    	
	    	var currentIndex = 0;
	    	var totalSlides = scope.data.length;
	    		    	
	    	var tpl = '<ul class="dm-car">';
	    	
	    	angular.forEach(scope.data,function(image,index) {
		    	tpl += '<li class="dm-car-item"><div><img dm-src="'+image.path+'" alt="'+image.name+'" /></div></li>';
		    		
	    	})
	    	
	    	tpl += "</ul>";
	    	
	    	
	    	iElement.append($compile(angular.element(tpl))(scope));
	    	
	    	var nav = '<div class="dm-car-controls">' +
                '  <span class="dm-car-control dm-car-control-prev" ng-click="goToPrev()">&lsaquo;</span>' +
                '  <span class="dm-car-control dm-car-control-next" ng-click="goToNext()">&rsaquo;</span>' +
                '</div>';
                
            iElement.append($compile(angular.element(nav))(scope));
				    	
	    	var slides = iElement[0].querySelectorAll("li");
	    	var slides2 = angular.element(iElement[0].querySelectorAll("li"));
	    	angular.element(iElement[0].querySelector('.current'))
	    	
	    	if (slides.length > 0) {
		    	
		    	angular.element(slides[slides.length-1]).addClass("prev");
	    	
		    	var prevImage = angular.element(slides[slides.length-1]).find("img");
		    	loadImage(prevImage);
		    	
		    	angular.element(slides[0]).addClass("current");
	    	
		    	var currentImage = angular.element(slides[0]).find("img");
		    	loadImage(currentImage);
		    		    	
		    	angular.element(slides[1]).addClass("next");
		    	
		    	var nextImage = angular.element(slides[1]).find("img");
		    	loadImage(nextImage);
		    		
	    	}
	    		    				
    		scope.goToNext = function() {
	    		
	    		console.log("Go to next slide");
	    		if(currentIndex < totalSlides-1) {
		    		currentIndex ++;
					
	    		}
	    		else {
		    		currentIndex = 0;
	    		}
	    		
	    		goToSlide(currentIndex);	
	    		
    		}
    		
    		scope.goToPrev = function() {
	    		
	    		console.log("Go to previous slide");
	    		if(currentIndex > 0) {
		    		currentIndex --;	
	    		}
	    		else {
		    		currentIndex = slides.length - 1;
		    		console.log(currentIndex)
	    		}
	    		
	    		goToSlide(currentIndex);	
    		}
    		
    		function goToSlide(index) {
    			
    			console.log("Go to slide " + index);
    			
    			//TODO - find a better way to remove class names
    			angular.forEach(slides,function(slide,index){
	    				angular.element(slide).removeClass("current prev next");
    			})
    			
    			if(index < totalSlides && index >= 0) {
    				angular.element(slides[index]).addClass("current");
    			}
    			else {
	    			console.error("Image index out of range");
    			}
    			
    			if(index < totalSlides-1) {
	    			angular.element(slides[index+1]).addClass("next");
	    			var image = angular.element(slides[index+1]).find("img");
					loadImage(image);
    			}
    			else {
	    			angular.element(slides[0]).addClass("next");
	    			var image = angular.element(slides[index+1]).find("img");
					loadImage(image);
    			}
    			
    			if(index > 0) {
	    			angular.element(slides[index-1]).addClass("prev");
	    			var image = angular.element(slides[index-1]).find("img");
					loadImage(image);
    			}
    			else {
	    			angular.element(slides[slides.length-1]).addClass("prev");
	    			var image = angular.element(slides[index-1]).find("img");
					loadImage(image);
    			}
    			
    		}
    		
    		function loadImage(element) {
	    		
	    		if(element.attr('src') === undefined && element.attr("dm-src") != undefined) {

			    	element.attr('src',element.attr("dm-src"));
			    	
		    	}
	    		
    		}
    		
    	}
    	
    }
  };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2R1bGUuanMiLCJzZXJ2aWNlcy9zZXJ2aWNlcy5qcyIsImNvbnRyb2xsZXJzL2NvbnRyb2xsZXJzLmpzIiwiZGlyZWN0aXZlcy9kaXJlY3RpdmVzLmpzIiwiY29udHJvbGxlcnMvQ2Fycm91c2VsQ29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvRG1DYXJyb3VzZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQ0FBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2Fycm91c2VsQXBwID0gYW5ndWxhci5tb2R1bGUoJ0NhcnJvdXNlbEFwcCcsIFtcblx0J2FwcENvbnRyb2xsZXJzJyxcblx0J2FwcERpcmVjdGl2ZXMnLFxuXHQnbmdSb3V0ZScsXG5cdCduZ0FuaW1hdGUnLFxuXHQnbmdUb3VjaCdcbl0pIiwidmFyIGFwcFNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ2FwcFNlcnZpY2VzJywgW10pOyIsInZhciBhcHBDb250cm9sbGVycyA9IGFuZ3VsYXIubW9kdWxlKCdhcHBDb250cm9sbGVycycsIFtdKTsiLCJ2YXIgYXBwRGlyZWN0aXZlcyA9IGFuZ3VsYXIubW9kdWxlKCdhcHBEaXJlY3RpdmVzJywgW10pOyIsImFwcENvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0NhcnJvdXNlbEN0cmwnLCBbJyRzY29wZScsIFxuXHRcblx0ZnVuY3Rpb24gKCRzY29wZSkge1xuXHRcdFx0XHRcblx0XHQkc2NvcGUuaW1hZ2VEYXRhID0gW107XG5cdFx0XG5cdFx0Z2VuZXJhdGVUZXN0SW1hZ2VEYXRhKCRzY29wZS5pbWFnZURhdGEsOCk7XG5cblx0XHRmdW5jdGlvbiBnZW5lcmF0ZVRlc3RJbWFnZURhdGEoaW1hZ2VEYXRhT2JqZWN0LGxlbmd0aCkge1xuXHRcdFxuXHRcdFx0Zm9yICh2YXIgaT0wOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbWFnZURhdGFPYmplY3QucHVzaCh7XG5cdCAgICAgICAgICAgICAgICBuYW1lOiBcIkltYWdlIFwiICsgKGkrMSksXG5cdCAgICAgICAgICAgICAgICBwYXRoOiBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS82MDAvMzAwL25hdHVyZS9cIiArICgoaSArIDEpICUgMTApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICBcblx0fV1cbikiLCJhcHBEaXJlY3RpdmVzLmRpcmVjdGl2ZSgnZG1DYXJyb3VzZWwnLCBbJyRjb21waWxlJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcblx0ICBkYXRhOiAnPWltYWdlRGF0YSdcblx0fSxcbiAgICBjb21waWxlOiBmdW5jdGlvbih0RWxlbWVudCwgdEF0dHJpYnV0ZXMpIHtcbiAgICBcdFxuICAgIFx0cmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBpRWxlbWVudCwgaUF0dHJpYnV0ZXMsIGNvbnRhaW5lckN0cmwpIHtcbiAgICBcdFxuXHQgICAgXHR2YXIgY3VycmVudEluZGV4ID0gMDtcblx0ICAgIFx0dmFyIHRvdGFsU2xpZGVzID0gc2NvcGUuZGF0YS5sZW5ndGg7XG5cdCAgICBcdFx0ICAgIFx0XG5cdCAgICBcdHZhciB0cGwgPSAnPHVsIGNsYXNzPVwiZG0tY2FyXCI+Jztcblx0ICAgIFx0XG5cdCAgICBcdGFuZ3VsYXIuZm9yRWFjaChzY29wZS5kYXRhLGZ1bmN0aW9uKGltYWdlLGluZGV4KSB7XG5cdFx0ICAgIFx0dHBsICs9ICc8bGkgY2xhc3M9XCJkbS1jYXItaXRlbVwiPjxkaXY+PGltZyBkbS1zcmM9XCInK2ltYWdlLnBhdGgrJ1wiIGFsdD1cIicraW1hZ2UubmFtZSsnXCIgLz48L2Rpdj48L2xpPic7XG5cdFx0ICAgIFx0XHRcblx0ICAgIFx0fSlcblx0ICAgIFx0XG5cdCAgICBcdHRwbCArPSBcIjwvdWw+XCI7XG5cdCAgICBcdFxuXHQgICAgXHRcblx0ICAgIFx0aUVsZW1lbnQuYXBwZW5kKCRjb21waWxlKGFuZ3VsYXIuZWxlbWVudCh0cGwpKShzY29wZSkpO1xuXHQgICAgXHRcblx0ICAgIFx0dmFyIG5hdiA9ICc8ZGl2IGNsYXNzPVwiZG0tY2FyLWNvbnRyb2xzXCI+JyArXG4gICAgICAgICAgICAgICAgJyAgPHNwYW4gY2xhc3M9XCJkbS1jYXItY29udHJvbCBkbS1jYXItY29udHJvbC1wcmV2XCIgbmctY2xpY2s9XCJnb1RvUHJldigpXCI+JmxzYXF1bzs8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJyAgPHNwYW4gY2xhc3M9XCJkbS1jYXItY29udHJvbCBkbS1jYXItY29udHJvbC1uZXh0XCIgbmctY2xpY2s9XCJnb1RvTmV4dCgpXCI+JnJzYXF1bzs8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpRWxlbWVudC5hcHBlbmQoJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KG5hdikpKHNjb3BlKSk7XG5cdFx0XHRcdCAgICBcdFxuXHQgICAgXHR2YXIgc2xpZGVzID0gaUVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbChcImxpXCIpO1xuXHQgICAgXHR2YXIgc2xpZGVzMiA9IGFuZ3VsYXIuZWxlbWVudChpRWxlbWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIikpO1xuXHQgICAgXHRhbmd1bGFyLmVsZW1lbnQoaUVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKSlcblx0ICAgIFx0XG5cdCAgICBcdGlmIChzbGlkZXMubGVuZ3RoID4gMCkge1xuXHRcdCAgICBcdFxuXHRcdCAgICBcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbc2xpZGVzLmxlbmd0aC0xXSkuYWRkQ2xhc3MoXCJwcmV2XCIpO1xuXHQgICAgXHRcblx0XHQgICAgXHR2YXIgcHJldkltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1tzbGlkZXMubGVuZ3RoLTFdKS5maW5kKFwiaW1nXCIpO1xuXHRcdCAgICBcdGxvYWRJbWFnZShwcmV2SW1hZ2UpO1xuXHRcdCAgICBcdFxuXHRcdCAgICBcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbMF0pLmFkZENsYXNzKFwiY3VycmVudFwiKTtcblx0ICAgIFx0XG5cdFx0ICAgIFx0dmFyIGN1cnJlbnRJbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbMF0pLmZpbmQoXCJpbWdcIik7XG5cdFx0ICAgIFx0bG9hZEltYWdlKGN1cnJlbnRJbWFnZSk7XG5cdFx0ICAgIFx0XHQgICAgXHRcblx0XHQgICAgXHRhbmd1bGFyLmVsZW1lbnQoc2xpZGVzWzFdKS5hZGRDbGFzcyhcIm5leHRcIik7XG5cdFx0ICAgIFx0XG5cdFx0ICAgIFx0dmFyIG5leHRJbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0ICAgIFx0bG9hZEltYWdlKG5leHRJbWFnZSk7XG5cdFx0ICAgIFx0XHRcblx0ICAgIFx0fVxuXHQgICAgXHRcdCAgICBcdFx0XHRcdFxuICAgIFx0XHRzY29wZS5nb1RvTmV4dCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdFxuXHQgICAgXHRcdGNvbnNvbGUubG9nKFwiR28gdG8gbmV4dCBzbGlkZVwiKTtcblx0ICAgIFx0XHRpZihjdXJyZW50SW5kZXggPCB0b3RhbFNsaWRlcy0xKSB7XG5cdFx0ICAgIFx0XHRjdXJyZW50SW5kZXggKys7XG5cdFx0XHRcdFx0XG5cdCAgICBcdFx0fVxuXHQgICAgXHRcdGVsc2Uge1xuXHRcdCAgICBcdFx0Y3VycmVudEluZGV4ID0gMDtcblx0ICAgIFx0XHR9XG5cdCAgICBcdFx0XG5cdCAgICBcdFx0Z29Ub1NsaWRlKGN1cnJlbnRJbmRleCk7XHRcblx0ICAgIFx0XHRcbiAgICBcdFx0fVxuICAgIFx0XHRcbiAgICBcdFx0c2NvcGUuZ29Ub1ByZXYgPSBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHRcblx0ICAgIFx0XHRjb25zb2xlLmxvZyhcIkdvIHRvIHByZXZpb3VzIHNsaWRlXCIpO1xuXHQgICAgXHRcdGlmKGN1cnJlbnRJbmRleCA+IDApIHtcblx0XHQgICAgXHRcdGN1cnJlbnRJbmRleCAtLTtcdFxuXHQgICAgXHRcdH1cblx0ICAgIFx0XHRlbHNlIHtcblx0XHQgICAgXHRcdGN1cnJlbnRJbmRleCA9IHNsaWRlcy5sZW5ndGggLSAxO1xuXHRcdCAgICBcdFx0Y29uc29sZS5sb2coY3VycmVudEluZGV4KVxuXHQgICAgXHRcdH1cblx0ICAgIFx0XHRcblx0ICAgIFx0XHRnb1RvU2xpZGUoY3VycmVudEluZGV4KTtcdFxuICAgIFx0XHR9XG4gICAgXHRcdFxuICAgIFx0XHRmdW5jdGlvbiBnb1RvU2xpZGUoaW5kZXgpIHtcbiAgICBcdFx0XHRcbiAgICBcdFx0XHRjb25zb2xlLmxvZyhcIkdvIHRvIHNsaWRlIFwiICsgaW5kZXgpO1xuICAgIFx0XHRcdFxuICAgIFx0XHRcdC8vVE9ETyAtIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIHJlbW92ZSBjbGFzcyBuYW1lc1xuICAgIFx0XHRcdGFuZ3VsYXIuZm9yRWFjaChzbGlkZXMsZnVuY3Rpb24oc2xpZGUsaW5kZXgpe1xuXHQgICAgXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoc2xpZGUpLnJlbW92ZUNsYXNzKFwiY3VycmVudCBwcmV2IG5leHRcIik7XG4gICAgXHRcdFx0fSlcbiAgICBcdFx0XHRcbiAgICBcdFx0XHRpZihpbmRleCA8IHRvdGFsU2xpZGVzICYmIGluZGV4ID49IDApIHtcbiAgICBcdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXhdKS5hZGRDbGFzcyhcImN1cnJlbnRcIik7XG4gICAgXHRcdFx0fVxuICAgIFx0XHRcdGVsc2Uge1xuXHQgICAgXHRcdFx0Y29uc29sZS5lcnJvcihcIkltYWdlIGluZGV4IG91dCBvZiByYW5nZVwiKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0XG4gICAgXHRcdFx0aWYoaW5kZXggPCB0b3RhbFNsaWRlcy0xKSB7XG5cdCAgICBcdFx0XHRhbmd1bGFyLmVsZW1lbnQoc2xpZGVzW2luZGV4KzFdKS5hZGRDbGFzcyhcIm5leHRcIik7XG5cdCAgICBcdFx0XHR2YXIgaW1hZ2UgPSBhbmd1bGFyLmVsZW1lbnQoc2xpZGVzW2luZGV4KzFdKS5maW5kKFwiaW1nXCIpO1xuXHRcdFx0XHRcdGxvYWRJbWFnZShpbWFnZSk7XG4gICAgXHRcdFx0fVxuICAgIFx0XHRcdGVsc2Uge1xuXHQgICAgXHRcdFx0YW5ndWxhci5lbGVtZW50KHNsaWRlc1swXSkuYWRkQ2xhc3MoXCJuZXh0XCIpO1xuXHQgICAgXHRcdFx0dmFyIGltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1tpbmRleCsxXSkuZmluZChcImltZ1wiKTtcblx0XHRcdFx0XHRsb2FkSW1hZ2UoaW1hZ2UpO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRcbiAgICBcdFx0XHRpZihpbmRleCA+IDApIHtcblx0ICAgIFx0XHRcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgtMV0pLmFkZENsYXNzKFwicHJldlwiKTtcblx0ICAgIFx0XHRcdHZhciBpbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgtMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0XHRcdFx0bG9hZEltYWdlKGltYWdlKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0ZWxzZSB7XG5cdCAgICBcdFx0XHRhbmd1bGFyLmVsZW1lbnQoc2xpZGVzW3NsaWRlcy5sZW5ndGgtMV0pLmFkZENsYXNzKFwicHJldlwiKTtcblx0ICAgIFx0XHRcdHZhciBpbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgtMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0XHRcdFx0bG9hZEltYWdlKGltYWdlKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0XG4gICAgXHRcdH1cbiAgICBcdFx0XG4gICAgXHRcdGZ1bmN0aW9uIGxvYWRJbWFnZShlbGVtZW50KSB7XG5cdCAgICBcdFx0XG5cdCAgICBcdFx0aWYoZWxlbWVudC5hdHRyKCdzcmMnKSA9PT0gdW5kZWZpbmVkICYmIGVsZW1lbnQuYXR0cihcImRtLXNyY1wiKSAhPSB1bmRlZmluZWQpIHtcblxuXHRcdFx0ICAgIFx0ZWxlbWVudC5hdHRyKCdzcmMnLGVsZW1lbnQuYXR0cihcImRtLXNyY1wiKSk7XG5cdFx0XHQgICAgXHRcblx0XHQgICAgXHR9XG5cdCAgICBcdFx0XG4gICAgXHRcdH1cbiAgICBcdFx0XG4gICAgXHR9XG4gICAgXHRcbiAgICB9XG4gIH07XG59XSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
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
	    	var animating = false;
	    		    	
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
	    		
	    		var index = currentIndex;
	    		
	    		//console.log("Go to next slide");
	    		if(currentIndex < totalSlides-1) {
		    		index ++;
					
	    		}
	    		else {
		    		index = 0;
	    		}
	    		
	    		goToSlide(index);	
	    		
    		}
    		
    		scope.goToPrev = function() {
	    		
	    		var index = currentIndex;
	    		
	    		//console.log("Go to previous slide");
	    		if(currentIndex > 0) {
		    		index --;	
	    		}
	    		else {
		    		index = slides.length - 1;
		    		//console.log(currentIndex)
	    		}
	    		
	    		goToSlide(index);	
    		}
    		
    		function goToSlide(index) {
    			
    			//console.log("Go to slide " + index);
    			
    			//check if the carrousel already is animating
    			if(animating) {
    				//console.error("already animating");
	    			return;
    			}
    			else {
	    			animating = true;
	    			currentIndex = index;
    			}
    			
    			    			    			
    			//TODO - find a better way to remove class names
    			angular.forEach(slides,function(slide,index){
	    				angular.element(slide).removeClass("current prev next");
    			})
    			
    			if(index < totalSlides && index >= 0) {
    				
    				angular.element(slides[index]).addClass("current");
    				
    				var current = slides[index];    				

    				current.addEventListener('webkitTransitionEnd', function(){transitionDone()});
					current.addEventListener('oTransitionEnd', function(){transitionDone()},false);
					current.addEventListener('webkitTransitionEnd', function(){transitionDone()},false);
					
    			}
    			else {
	    			//console.error("Image index out of range");
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
    		
    		function transitionDone() {
				
				animating = false;
				
				var current = slides[currentIndex];    			
				
				current.removeEventListener('webkitTransitionEnd', function(){transitionDone()});
				current.removeEventListener('oTransitionEnd', function(){transitionDone()});
				current.removeEventListener('transitionEnd', function(){transitionDone()});
				
			}
    		
    	}
    	
    }
  };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2R1bGUuanMiLCJzZXJ2aWNlcy9zZXJ2aWNlcy5qcyIsImNvbnRyb2xsZXJzL2NvbnRyb2xsZXJzLmpzIiwiZGlyZWN0aXZlcy9kaXJlY3RpdmVzLmpzIiwiY29udHJvbGxlcnMvQ2Fycm91c2VsQ29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvRG1DYXJyb3VzZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQ0FBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2Fycm91c2VsQXBwID0gYW5ndWxhci5tb2R1bGUoJ0NhcnJvdXNlbEFwcCcsIFtcblx0J2FwcENvbnRyb2xsZXJzJyxcblx0J2FwcERpcmVjdGl2ZXMnLFxuXHQnbmdSb3V0ZScsXG5cdCduZ0FuaW1hdGUnLFxuXHQnbmdUb3VjaCdcbl0pIiwidmFyIGFwcFNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ2FwcFNlcnZpY2VzJywgW10pOyIsInZhciBhcHBDb250cm9sbGVycyA9IGFuZ3VsYXIubW9kdWxlKCdhcHBDb250cm9sbGVycycsIFtdKTsiLCJ2YXIgYXBwRGlyZWN0aXZlcyA9IGFuZ3VsYXIubW9kdWxlKCdhcHBEaXJlY3RpdmVzJywgW10pOyIsImFwcENvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0NhcnJvdXNlbEN0cmwnLCBbJyRzY29wZScsIFxuXHRcblx0ZnVuY3Rpb24gKCRzY29wZSkge1xuXHRcdFx0XHRcblx0XHQkc2NvcGUuaW1hZ2VEYXRhID0gW107XG5cdFx0XG5cdFx0Z2VuZXJhdGVUZXN0SW1hZ2VEYXRhKCRzY29wZS5pbWFnZURhdGEsOCk7XG5cblx0XHRmdW5jdGlvbiBnZW5lcmF0ZVRlc3RJbWFnZURhdGEoaW1hZ2VEYXRhT2JqZWN0LGxlbmd0aCkge1xuXHRcdFxuXHRcdFx0Zm9yICh2YXIgaT0wOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbWFnZURhdGFPYmplY3QucHVzaCh7XG5cdCAgICAgICAgICAgICAgICBuYW1lOiBcIkltYWdlIFwiICsgKGkrMSksXG5cdCAgICAgICAgICAgICAgICBwYXRoOiBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS82MDAvMzAwL25hdHVyZS9cIiArICgoaSArIDEpICUgMTApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICBcblx0fV1cbikiLCJhcHBEaXJlY3RpdmVzLmRpcmVjdGl2ZSgnZG1DYXJyb3VzZWwnLCBbJyRjb21waWxlJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcblx0ICBkYXRhOiAnPWltYWdlRGF0YSdcblx0fSxcbiAgICBjb21waWxlOiBmdW5jdGlvbih0RWxlbWVudCwgdEF0dHJpYnV0ZXMpIHtcbiAgICBcdFxuICAgIFx0cmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBpRWxlbWVudCwgaUF0dHJpYnV0ZXMsIGNvbnRhaW5lckN0cmwpIHtcbiAgICBcdFxuXHQgICAgXHR2YXIgY3VycmVudEluZGV4ID0gMDtcblx0ICAgIFx0dmFyIHRvdGFsU2xpZGVzID0gc2NvcGUuZGF0YS5sZW5ndGg7XG5cdCAgICBcdHZhciBhbmltYXRpbmcgPSBmYWxzZTtcblx0ICAgIFx0XHQgICAgXHRcblx0ICAgIFx0dmFyIHRwbCA9ICc8dWwgY2xhc3M9XCJkbS1jYXJcIj4nO1xuXHQgICAgXHRcblx0ICAgIFx0YW5ndWxhci5mb3JFYWNoKHNjb3BlLmRhdGEsZnVuY3Rpb24oaW1hZ2UsaW5kZXgpIHtcblx0XHQgICAgXHR0cGwgKz0gJzxsaSBjbGFzcz1cImRtLWNhci1pdGVtXCI+PGRpdj48aW1nIGRtLXNyYz1cIicraW1hZ2UucGF0aCsnXCIgYWx0PVwiJytpbWFnZS5uYW1lKydcIiAvPjwvZGl2PjwvbGk+Jztcblx0XHQgICAgXHRcdFxuXHQgICAgXHR9KVxuXHQgICAgXHRcblx0ICAgIFx0dHBsICs9IFwiPC91bD5cIjtcblx0ICAgIFx0XG5cdCAgICBcdFxuXHQgICAgXHRpRWxlbWVudC5hcHBlbmQoJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KHRwbCkpKHNjb3BlKSk7XG5cdCAgICBcdFxuXHQgICAgXHR2YXIgbmF2ID0gJzxkaXYgY2xhc3M9XCJkbS1jYXItY29udHJvbHNcIj4nICtcbiAgICAgICAgICAgICAgICAnICA8c3BhbiBjbGFzcz1cImRtLWNhci1jb250cm9sIGRtLWNhci1jb250cm9sLXByZXZcIiBuZy1jbGljaz1cImdvVG9QcmV2KClcIj4mbHNhcXVvOzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnICA8c3BhbiBjbGFzcz1cImRtLWNhci1jb250cm9sIGRtLWNhci1jb250cm9sLW5leHRcIiBuZy1jbGljaz1cImdvVG9OZXh0KClcIj4mcnNhcXVvOzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlFbGVtZW50LmFwcGVuZCgkY29tcGlsZShhbmd1bGFyLmVsZW1lbnQobmF2KSkoc2NvcGUpKTtcblx0XHRcdFx0ICAgIFx0XG5cdCAgICBcdHZhciBzbGlkZXMgPSBpRWxlbWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XG5cdCAgICBcdHZhciBzbGlkZXMyID0gYW5ndWxhci5lbGVtZW50KGlFbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVwiKSk7XG5cdCAgICBcdGFuZ3VsYXIuZWxlbWVudChpRWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpKVxuXHQgICAgXHRcblx0ICAgIFx0aWYgKHNsaWRlcy5sZW5ndGggPiAwKSB7XG5cdFx0ICAgIFx0XG5cdFx0ICAgIFx0YW5ndWxhci5lbGVtZW50KHNsaWRlc1tzbGlkZXMubGVuZ3RoLTFdKS5hZGRDbGFzcyhcInByZXZcIik7XG5cdCAgICBcdFxuXHRcdCAgICBcdHZhciBwcmV2SW1hZ2UgPSBhbmd1bGFyLmVsZW1lbnQoc2xpZGVzW3NsaWRlcy5sZW5ndGgtMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0ICAgIFx0bG9hZEltYWdlKHByZXZJbWFnZSk7XG5cdFx0ICAgIFx0XG5cdFx0ICAgIFx0YW5ndWxhci5lbGVtZW50KHNsaWRlc1swXSkuYWRkQ2xhc3MoXCJjdXJyZW50XCIpO1xuXHQgICAgXHRcblx0XHQgICAgXHR2YXIgY3VycmVudEltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1swXSkuZmluZChcImltZ1wiKTtcblx0XHQgICAgXHRsb2FkSW1hZ2UoY3VycmVudEltYWdlKTtcblx0XHQgICAgXHRcdCAgICBcdFxuXHRcdCAgICBcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbMV0pLmFkZENsYXNzKFwibmV4dFwiKTtcblx0XHQgICAgXHRcblx0XHQgICAgXHR2YXIgbmV4dEltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1sxXSkuZmluZChcImltZ1wiKTtcblx0XHQgICAgXHRsb2FkSW1hZ2UobmV4dEltYWdlKTtcblx0XHQgICAgXHRcdFxuXHQgICAgXHR9XG5cdCAgICBcdFx0ICAgIFx0XHRcdFx0XG4gICAgXHRcdHNjb3BlLmdvVG9OZXh0ID0gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0XG5cdCAgICBcdFx0dmFyIGluZGV4ID0gY3VycmVudEluZGV4O1xuXHQgICAgXHRcdFxuXHQgICAgXHRcdC8vY29uc29sZS5sb2coXCJHbyB0byBuZXh0IHNsaWRlXCIpO1xuXHQgICAgXHRcdGlmKGN1cnJlbnRJbmRleCA8IHRvdGFsU2xpZGVzLTEpIHtcblx0XHQgICAgXHRcdGluZGV4ICsrO1xuXHRcdFx0XHRcdFxuXHQgICAgXHRcdH1cblx0ICAgIFx0XHRlbHNlIHtcblx0XHQgICAgXHRcdGluZGV4ID0gMDtcblx0ICAgIFx0XHR9XG5cdCAgICBcdFx0XG5cdCAgICBcdFx0Z29Ub1NsaWRlKGluZGV4KTtcdFxuXHQgICAgXHRcdFxuICAgIFx0XHR9XG4gICAgXHRcdFxuICAgIFx0XHRzY29wZS5nb1RvUHJldiA9IGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdFxuXHQgICAgXHRcdHZhciBpbmRleCA9IGN1cnJlbnRJbmRleDtcblx0ICAgIFx0XHRcblx0ICAgIFx0XHQvL2NvbnNvbGUubG9nKFwiR28gdG8gcHJldmlvdXMgc2xpZGVcIik7XG5cdCAgICBcdFx0aWYoY3VycmVudEluZGV4ID4gMCkge1xuXHRcdCAgICBcdFx0aW5kZXggLS07XHRcblx0ICAgIFx0XHR9XG5cdCAgICBcdFx0ZWxzZSB7XG5cdFx0ICAgIFx0XHRpbmRleCA9IHNsaWRlcy5sZW5ndGggLSAxO1xuXHRcdCAgICBcdFx0Ly9jb25zb2xlLmxvZyhjdXJyZW50SW5kZXgpXG5cdCAgICBcdFx0fVxuXHQgICAgXHRcdFxuXHQgICAgXHRcdGdvVG9TbGlkZShpbmRleCk7XHRcbiAgICBcdFx0fVxuICAgIFx0XHRcbiAgICBcdFx0ZnVuY3Rpb24gZ29Ub1NsaWRlKGluZGV4KSB7XG4gICAgXHRcdFx0XG4gICAgXHRcdFx0Ly9jb25zb2xlLmxvZyhcIkdvIHRvIHNsaWRlIFwiICsgaW5kZXgpO1xuICAgIFx0XHRcdFxuICAgIFx0XHRcdC8vY2hlY2sgaWYgdGhlIGNhcnJvdXNlbCBhbHJlYWR5IGlzIGFuaW1hdGluZ1xuICAgIFx0XHRcdGlmKGFuaW1hdGluZykge1xuICAgIFx0XHRcdFx0Ly9jb25zb2xlLmVycm9yKFwiYWxyZWFkeSBhbmltYXRpbmdcIik7XG5cdCAgICBcdFx0XHRyZXR1cm47XG4gICAgXHRcdFx0fVxuICAgIFx0XHRcdGVsc2Uge1xuXHQgICAgXHRcdFx0YW5pbWF0aW5nID0gdHJ1ZTtcblx0ICAgIFx0XHRcdGN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRcbiAgICBcdFx0XHQgICAgXHRcdFx0ICAgIFx0XHRcdFxuICAgIFx0XHRcdC8vVE9ETyAtIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIHJlbW92ZSBjbGFzcyBuYW1lc1xuICAgIFx0XHRcdGFuZ3VsYXIuZm9yRWFjaChzbGlkZXMsZnVuY3Rpb24oc2xpZGUsaW5kZXgpe1xuXHQgICAgXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoc2xpZGUpLnJlbW92ZUNsYXNzKFwiY3VycmVudCBwcmV2IG5leHRcIik7XG4gICAgXHRcdFx0fSlcbiAgICBcdFx0XHRcbiAgICBcdFx0XHRpZihpbmRleCA8IHRvdGFsU2xpZGVzICYmIGluZGV4ID49IDApIHtcbiAgICBcdFx0XHRcdFxuICAgIFx0XHRcdFx0YW5ndWxhci5lbGVtZW50KHNsaWRlc1tpbmRleF0pLmFkZENsYXNzKFwiY3VycmVudFwiKTtcbiAgICBcdFx0XHRcdFxuICAgIFx0XHRcdFx0dmFyIGN1cnJlbnQgPSBzbGlkZXNbaW5kZXhdOyAgICBcdFx0XHRcdFxuXG4gICAgXHRcdFx0XHRjdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpe3RyYW5zaXRpb25Eb25lKCl9KTtcblx0XHRcdFx0XHRjdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ29UcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKXt0cmFuc2l0aW9uRG9uZSgpfSxmYWxzZSk7XG5cdFx0XHRcdFx0Y3VycmVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKXt0cmFuc2l0aW9uRG9uZSgpfSxmYWxzZSk7XG5cdFx0XHRcdFx0XG4gICAgXHRcdFx0fVxuICAgIFx0XHRcdGVsc2Uge1xuXHQgICAgXHRcdFx0Ly9jb25zb2xlLmVycm9yKFwiSW1hZ2UgaW5kZXggb3V0IG9mIHJhbmdlXCIpO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRcbiAgICBcdFx0XHRpZihpbmRleCA8IHRvdGFsU2xpZGVzLTEpIHtcblx0ICAgIFx0XHRcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgrMV0pLmFkZENsYXNzKFwibmV4dFwiKTtcblx0ICAgIFx0XHRcdHZhciBpbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgrMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0XHRcdFx0bG9hZEltYWdlKGltYWdlKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0ZWxzZSB7XG5cdCAgICBcdFx0XHRhbmd1bGFyLmVsZW1lbnQoc2xpZGVzWzBdKS5hZGRDbGFzcyhcIm5leHRcIik7XG5cdCAgICBcdFx0XHR2YXIgaW1hZ2UgPSBhbmd1bGFyLmVsZW1lbnQoc2xpZGVzW2luZGV4KzFdKS5maW5kKFwiaW1nXCIpO1xuXHRcdFx0XHRcdGxvYWRJbWFnZShpbWFnZSk7XG4gICAgXHRcdFx0fVxuICAgIFx0XHRcdFxuICAgIFx0XHRcdGlmKGluZGV4ID4gMCkge1xuXHQgICAgXHRcdFx0YW5ndWxhci5lbGVtZW50KHNsaWRlc1tpbmRleC0xXSkuYWRkQ2xhc3MoXCJwcmV2XCIpO1xuXHQgICAgXHRcdFx0dmFyIGltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1tpbmRleC0xXSkuZmluZChcImltZ1wiKTtcblx0XHRcdFx0XHRsb2FkSW1hZ2UoaW1hZ2UpO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRlbHNlIHtcblx0ICAgIFx0XHRcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbc2xpZGVzLmxlbmd0aC0xXSkuYWRkQ2xhc3MoXCJwcmV2XCIpO1xuXHQgICAgXHRcdFx0dmFyIGltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1tpbmRleC0xXSkuZmluZChcImltZ1wiKTtcblx0XHRcdFx0XHRsb2FkSW1hZ2UoaW1hZ2UpO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRcbiAgICBcdFx0fVxuICAgIFx0XHRcbiAgICBcdFx0ZnVuY3Rpb24gbG9hZEltYWdlKGVsZW1lbnQpIHtcblx0ICAgIFx0XHRcblx0ICAgIFx0XHRpZihlbGVtZW50LmF0dHIoJ3NyYycpID09PSB1bmRlZmluZWQgJiYgZWxlbWVudC5hdHRyKFwiZG0tc3JjXCIpICE9IHVuZGVmaW5lZCkge1xuXG5cdFx0XHQgICAgXHRlbGVtZW50LmF0dHIoJ3NyYycsZWxlbWVudC5hdHRyKFwiZG0tc3JjXCIpKTtcblx0XHRcdCAgICBcdFxuXHRcdCAgICBcdH1cblx0ICAgIFx0XHRcbiAgICBcdFx0fVxuICAgIFx0XHRcbiAgICBcdFx0ZnVuY3Rpb24gdHJhbnNpdGlvbkRvbmUoKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRhbmltYXRpbmcgPSBmYWxzZTtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciBjdXJyZW50ID0gc2xpZGVzW2N1cnJlbnRJbmRleF07ICAgIFx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0Y3VycmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKXt0cmFuc2l0aW9uRG9uZSgpfSk7XG5cdFx0XHRcdGN1cnJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpe3RyYW5zaXRpb25Eb25lKCl9KTtcblx0XHRcdFx0Y3VycmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKXt0cmFuc2l0aW9uRG9uZSgpfSk7XG5cdFx0XHRcdFxuXHRcdFx0fVxuICAgIFx0XHRcbiAgICBcdH1cbiAgICBcdFxuICAgIH1cbiAgfTtcbn1dKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
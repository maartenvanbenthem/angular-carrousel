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
	    	var tpl = '<div class="dm-car-container">';
	    	tpl += '<ul class="dm-car">';
	    	
	    	angular.forEach(scope.data,function(image,index) {
		    	tpl += '<li class="dm-car-item"><div><img dm-src="'+image.path+'" alt="'+image.name+'" /></div></li>';
		    		
	    	})
	    	
	    	tpl += "</ul>";
	    	
	    	tpl += '<div class="dm-car-controls">' +
                '  <span class="dm-car-control dm-car-control-prev" ng-click="goToPrev()">&lsaquo;</span>' +
                '  <span class="dm-car-control dm-car-control-next" ng-click="goToNext()">&rsaquo;</span>' +
                '</div>';
            
            tpl += '</div>'
            
            iElement.append($compile(angular.element(tpl))(scope));
				    	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2R1bGUuanMiLCJzZXJ2aWNlcy9zZXJ2aWNlcy5qcyIsImNvbnRyb2xsZXJzL2NvbnRyb2xsZXJzLmpzIiwiZGlyZWN0aXZlcy9kaXJlY3RpdmVzLmpzIiwiY29udHJvbGxlcnMvQ2Fycm91c2VsQ29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvRG1DYXJyb3VzZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQ0FBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhcnJvdXNlbEFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDYXJyb3VzZWxBcHAnLCBbXG5cdCdhcHBDb250cm9sbGVycycsXG5cdCdhcHBEaXJlY3RpdmVzJyxcblx0J25nUm91dGUnLFxuXHQnbmdBbmltYXRlJyxcblx0J25nVG91Y2gnXG5dKSIsInZhciBhcHBTZXJ2aWNlcyA9IGFuZ3VsYXIubW9kdWxlKCdhcHBTZXJ2aWNlcycsIFtdKTsiLCJ2YXIgYXBwQ29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwQ29udHJvbGxlcnMnLCBbXSk7IiwidmFyIGFwcERpcmVjdGl2ZXMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwRGlyZWN0aXZlcycsIFtdKTsiLCJhcHBDb250cm9sbGVycy5jb250cm9sbGVyKCdDYXJyb3VzZWxDdHJsJywgWyckc2NvcGUnLCBcblx0XG5cdGZ1bmN0aW9uICgkc2NvcGUpIHtcblx0XHRcdFx0XG5cdFx0JHNjb3BlLmltYWdlRGF0YSA9IFtdO1xuXHRcdFxuXHRcdGdlbmVyYXRlVGVzdEltYWdlRGF0YSgkc2NvcGUuaW1hZ2VEYXRhLDgpO1xuXG5cdFx0ZnVuY3Rpb24gZ2VuZXJhdGVUZXN0SW1hZ2VEYXRhKGltYWdlRGF0YU9iamVjdCxsZW5ndGgpIHtcblx0XHRcblx0XHRcdGZvciAodmFyIGk9MDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhT2JqZWN0LnB1c2goe1xuXHQgICAgICAgICAgICAgICAgbmFtZTogXCJJbWFnZSBcIiArIChpKzEpLFxuXHQgICAgICAgICAgICAgICAgcGF0aDogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNjAwLzMwMC9uYXR1cmUvXCIgKyAoKGkgKyAxKSAlIDEwKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgXG5cdH1dXG4pIiwiYXBwRGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2RtQ2Fycm91c2VsJywgWyckY29tcGlsZScsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG5cdCAgZGF0YTogJz1pbWFnZURhdGEnXG5cdH0sXG4gICAgY29tcGlsZTogZnVuY3Rpb24odEVsZW1lbnQsIHRBdHRyaWJ1dGVzKSB7XG4gICAgXHRcbiAgICBcdHJldHVybiBmdW5jdGlvbihzY29wZSwgaUVsZW1lbnQsIGlBdHRyaWJ1dGVzLCBjb250YWluZXJDdHJsKSB7XG4gICAgXHRcblx0ICAgIFx0dmFyIGN1cnJlbnRJbmRleCA9IDA7XG5cdCAgICBcdHZhciB0b3RhbFNsaWRlcyA9IHNjb3BlLmRhdGEubGVuZ3RoO1xuXHQgICAgXHR2YXIgYW5pbWF0aW5nID0gZmFsc2U7XG5cdCAgICBcdHZhciB0cGwgPSAnPGRpdiBjbGFzcz1cImRtLWNhci1jb250YWluZXJcIj4nO1xuXHQgICAgXHR0cGwgKz0gJzx1bCBjbGFzcz1cImRtLWNhclwiPic7XG5cdCAgICBcdFxuXHQgICAgXHRhbmd1bGFyLmZvckVhY2goc2NvcGUuZGF0YSxmdW5jdGlvbihpbWFnZSxpbmRleCkge1xuXHRcdCAgICBcdHRwbCArPSAnPGxpIGNsYXNzPVwiZG0tY2FyLWl0ZW1cIj48ZGl2PjxpbWcgZG0tc3JjPVwiJytpbWFnZS5wYXRoKydcIiBhbHQ9XCInK2ltYWdlLm5hbWUrJ1wiIC8+PC9kaXY+PC9saT4nO1xuXHRcdCAgICBcdFx0XG5cdCAgICBcdH0pXG5cdCAgICBcdFxuXHQgICAgXHR0cGwgKz0gXCI8L3VsPlwiO1xuXHQgICAgXHRcblx0ICAgIFx0dHBsICs9ICc8ZGl2IGNsYXNzPVwiZG0tY2FyLWNvbnRyb2xzXCI+JyArXG4gICAgICAgICAgICAgICAgJyAgPHNwYW4gY2xhc3M9XCJkbS1jYXItY29udHJvbCBkbS1jYXItY29udHJvbC1wcmV2XCIgbmctY2xpY2s9XCJnb1RvUHJldigpXCI+JmxzYXF1bzs8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJyAgPHNwYW4gY2xhc3M9XCJkbS1jYXItY29udHJvbCBkbS1jYXItY29udHJvbC1uZXh0XCIgbmctY2xpY2s9XCJnb1RvTmV4dCgpXCI+JnJzYXF1bzs8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRwbCArPSAnPC9kaXY+J1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpRWxlbWVudC5hcHBlbmQoJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KHRwbCkpKHNjb3BlKSk7XG5cdFx0XHRcdCAgICBcdFxuXHQgICAgXHR2YXIgc2xpZGVzID0gaUVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbChcImxpXCIpO1xuXHQgICAgXHR2YXIgc2xpZGVzMiA9IGFuZ3VsYXIuZWxlbWVudChpRWxlbWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIikpO1xuXHQgICAgXHRhbmd1bGFyLmVsZW1lbnQoaUVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKSlcblx0ICAgIFx0XG5cdCAgICBcdGlmIChzbGlkZXMubGVuZ3RoID4gMCkge1xuXHRcdCAgICBcdFxuXHRcdCAgICBcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbc2xpZGVzLmxlbmd0aC0xXSkuYWRkQ2xhc3MoXCJwcmV2XCIpO1xuXHQgICAgXHRcblx0XHQgICAgXHR2YXIgcHJldkltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1tzbGlkZXMubGVuZ3RoLTFdKS5maW5kKFwiaW1nXCIpO1xuXHRcdCAgICBcdGxvYWRJbWFnZShwcmV2SW1hZ2UpO1xuXHRcdCAgICBcdFxuXHRcdCAgICBcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbMF0pLmFkZENsYXNzKFwiY3VycmVudFwiKTtcblx0ICAgIFx0XG5cdFx0ICAgIFx0dmFyIGN1cnJlbnRJbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbMF0pLmZpbmQoXCJpbWdcIik7XG5cdFx0ICAgIFx0bG9hZEltYWdlKGN1cnJlbnRJbWFnZSk7XG5cdFx0ICAgIFx0XHQgICAgXHRcblx0XHQgICAgXHRhbmd1bGFyLmVsZW1lbnQoc2xpZGVzWzFdKS5hZGRDbGFzcyhcIm5leHRcIik7XG5cdFx0ICAgIFx0XG5cdFx0ICAgIFx0dmFyIG5leHRJbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0ICAgIFx0bG9hZEltYWdlKG5leHRJbWFnZSk7XG5cdFx0ICAgIFx0XHRcblx0ICAgIFx0fVxuXHQgICAgXHRcdCAgICBcdFx0XHRcdFxuICAgIFx0XHRzY29wZS5nb1RvTmV4dCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdFxuXHQgICAgXHRcdHZhciBpbmRleCA9IGN1cnJlbnRJbmRleDtcblx0ICAgIFx0XHRcblx0ICAgIFx0XHQvL2NvbnNvbGUubG9nKFwiR28gdG8gbmV4dCBzbGlkZVwiKTtcblx0ICAgIFx0XHRpZihjdXJyZW50SW5kZXggPCB0b3RhbFNsaWRlcy0xKSB7XG5cdFx0ICAgIFx0XHRpbmRleCArKztcblx0XHRcdFx0XHRcblx0ICAgIFx0XHR9XG5cdCAgICBcdFx0ZWxzZSB7XG5cdFx0ICAgIFx0XHRpbmRleCA9IDA7XG5cdCAgICBcdFx0fVxuXHQgICAgXHRcdFxuXHQgICAgXHRcdGdvVG9TbGlkZShpbmRleCk7XHRcblx0ICAgIFx0XHRcbiAgICBcdFx0fVxuICAgIFx0XHRcbiAgICBcdFx0c2NvcGUuZ29Ub1ByZXYgPSBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHRcblx0ICAgIFx0XHR2YXIgaW5kZXggPSBjdXJyZW50SW5kZXg7XG5cdCAgICBcdFx0XG5cdCAgICBcdFx0Ly9jb25zb2xlLmxvZyhcIkdvIHRvIHByZXZpb3VzIHNsaWRlXCIpO1xuXHQgICAgXHRcdGlmKGN1cnJlbnRJbmRleCA+IDApIHtcblx0XHQgICAgXHRcdGluZGV4IC0tO1x0XG5cdCAgICBcdFx0fVxuXHQgICAgXHRcdGVsc2Uge1xuXHRcdCAgICBcdFx0aW5kZXggPSBzbGlkZXMubGVuZ3RoIC0gMTtcblx0XHQgICAgXHRcdC8vY29uc29sZS5sb2coY3VycmVudEluZGV4KVxuXHQgICAgXHRcdH1cblx0ICAgIFx0XHRcblx0ICAgIFx0XHRnb1RvU2xpZGUoaW5kZXgpO1x0XG4gICAgXHRcdH1cbiAgICBcdFx0XG4gICAgXHRcdGZ1bmN0aW9uIGdvVG9TbGlkZShpbmRleCkge1xuICAgIFx0XHRcdFxuICAgIFx0XHRcdC8vY29uc29sZS5sb2coXCJHbyB0byBzbGlkZSBcIiArIGluZGV4KTtcbiAgICBcdFx0XHRcbiAgICBcdFx0XHQvL2NoZWNrIGlmIHRoZSBjYXJyb3VzZWwgYWxyZWFkeSBpcyBhbmltYXRpbmdcbiAgICBcdFx0XHRpZihhbmltYXRpbmcpIHtcbiAgICBcdFx0XHRcdC8vY29uc29sZS5lcnJvcihcImFscmVhZHkgYW5pbWF0aW5nXCIpO1xuXHQgICAgXHRcdFx0cmV0dXJuO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRlbHNlIHtcblx0ICAgIFx0XHRcdGFuaW1hdGluZyA9IHRydWU7XG5cdCAgICBcdFx0XHRjdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0XG4gICAgXHRcdFx0ICAgIFx0XHRcdCAgICBcdFx0XHRcbiAgICBcdFx0XHQvL1RPRE8gLSBmaW5kIGEgYmV0dGVyIHdheSB0byByZW1vdmUgY2xhc3MgbmFtZXNcbiAgICBcdFx0XHRhbmd1bGFyLmZvckVhY2goc2xpZGVzLGZ1bmN0aW9uKHNsaWRlLGluZGV4KXtcblx0ICAgIFx0XHRcdFx0YW5ndWxhci5lbGVtZW50KHNsaWRlKS5yZW1vdmVDbGFzcyhcImN1cnJlbnQgcHJldiBuZXh0XCIpO1xuICAgIFx0XHRcdH0pXG4gICAgXHRcdFx0XG4gICAgXHRcdFx0aWYoaW5kZXggPCB0b3RhbFNsaWRlcyAmJiBpbmRleCA+PSAwKSB7XG4gICAgXHRcdFx0XHRcbiAgICBcdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXhdKS5hZGRDbGFzcyhcImN1cnJlbnRcIik7XG4gICAgXHRcdFx0XHRcbiAgICBcdFx0XHRcdHZhciBjdXJyZW50ID0gc2xpZGVzW2luZGV4XTsgICAgXHRcdFx0XHRcblxuICAgIFx0XHRcdFx0Y3VycmVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKXt0cmFuc2l0aW9uRG9uZSgpfSk7XG5cdFx0XHRcdFx0Y3VycmVudC5hZGRFdmVudExpc3RlbmVyKCdvVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCl7dHJhbnNpdGlvbkRvbmUoKX0sZmFsc2UpO1xuXHRcdFx0XHRcdGN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCl7dHJhbnNpdGlvbkRvbmUoKX0sZmFsc2UpO1xuXHRcdFx0XHRcdFxuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRlbHNlIHtcblx0ICAgIFx0XHRcdC8vY29uc29sZS5lcnJvcihcIkltYWdlIGluZGV4IG91dCBvZiByYW5nZVwiKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0XG4gICAgXHRcdFx0aWYoaW5kZXggPCB0b3RhbFNsaWRlcy0xKSB7XG5cdCAgICBcdFx0XHRhbmd1bGFyLmVsZW1lbnQoc2xpZGVzW2luZGV4KzFdKS5hZGRDbGFzcyhcIm5leHRcIik7XG5cdCAgICBcdFx0XHR2YXIgaW1hZ2UgPSBhbmd1bGFyLmVsZW1lbnQoc2xpZGVzW2luZGV4KzFdKS5maW5kKFwiaW1nXCIpO1xuXHRcdFx0XHRcdGxvYWRJbWFnZShpbWFnZSk7XG4gICAgXHRcdFx0fVxuICAgIFx0XHRcdGVsc2Uge1xuXHQgICAgXHRcdFx0YW5ndWxhci5lbGVtZW50KHNsaWRlc1swXSkuYWRkQ2xhc3MoXCJuZXh0XCIpO1xuXHQgICAgXHRcdFx0dmFyIGltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1tpbmRleCsxXSkuZmluZChcImltZ1wiKTtcblx0XHRcdFx0XHRsb2FkSW1hZ2UoaW1hZ2UpO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRcbiAgICBcdFx0XHRpZihpbmRleCA+IDApIHtcblx0ICAgIFx0XHRcdGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgtMV0pLmFkZENsYXNzKFwicHJldlwiKTtcblx0ICAgIFx0XHRcdHZhciBpbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgtMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0XHRcdFx0bG9hZEltYWdlKGltYWdlKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0ZWxzZSB7XG5cdCAgICBcdFx0XHRhbmd1bGFyLmVsZW1lbnQoc2xpZGVzW3NsaWRlcy5sZW5ndGgtMV0pLmFkZENsYXNzKFwicHJldlwiKTtcblx0ICAgIFx0XHRcdHZhciBpbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgtMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0XHRcdFx0bG9hZEltYWdlKGltYWdlKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0XG4gICAgXHRcdH1cbiAgICBcdFx0XG4gICAgXHRcdGZ1bmN0aW9uIGxvYWRJbWFnZShlbGVtZW50KSB7XG5cdCAgICBcdFx0XG5cdCAgICBcdFx0aWYoZWxlbWVudC5hdHRyKCdzcmMnKSA9PT0gdW5kZWZpbmVkICYmIGVsZW1lbnQuYXR0cihcImRtLXNyY1wiKSAhPSB1bmRlZmluZWQpIHtcblxuXHRcdFx0ICAgIFx0ZWxlbWVudC5hdHRyKCdzcmMnLGVsZW1lbnQuYXR0cihcImRtLXNyY1wiKSk7XG5cdFx0XHQgICAgXHRcblx0XHQgICAgXHR9XG5cdCAgICBcdFx0XG4gICAgXHRcdH1cbiAgICBcdFx0XG4gICAgXHRcdGZ1bmN0aW9uIHRyYW5zaXRpb25Eb25lKCkge1xuXHRcdFx0XHRcblx0XHRcdFx0YW5pbWF0aW5nID0gZmFsc2U7XG5cdFx0XHRcdFxuXHRcdFx0XHR2YXIgY3VycmVudCA9IHNsaWRlc1tjdXJyZW50SW5kZXhdOyAgICBcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdGN1cnJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCl7dHJhbnNpdGlvbkRvbmUoKX0pO1xuXHRcdFx0XHRjdXJyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29UcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKXt0cmFuc2l0aW9uRG9uZSgpfSk7XG5cdFx0XHRcdGN1cnJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCl7dHJhbnNpdGlvbkRvbmUoKX0pO1xuXHRcdFx0XHRcblx0XHRcdH1cbiAgICBcdFx0XG4gICAgXHR9XG4gICAgXHRcbiAgICB9XG4gIH07XG59XSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
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
		
		generateTestImageData($scope.imageData,4);
				
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
		    	tpl += '<li><div><img dm-src="'+image.path+'" alt="'+image.name+'" /></div></li>';
		    		
	    	})
	    	
	    	tpl += "</ul>";
	    	
	    	
	    	iElement.append($compile(angular.element(tpl))(scope));
	    	
	    	var nav = '<div class="dm-car-controls">' +
                '  <span class="dm-car-control dm-car-control-prev" ng-click="goToPrev()">&lsaquo;</span>' +
                '  <span class="dm-car-control dm-car-control-next" ng-click="goToNext()">&rsaquo;</span>' +
                '</div>';
                
            iElement.append($compile(angular.element(nav))(scope));
			
	    	console.log(iElement);
	    	
	    	var slides = iElement[0].querySelectorAll("li");
	    	var slides2 = angular.element(iElement[0].querySelectorAll("li"));
	    	angular.element(iElement[0].querySelector('.current'))
	    	
	    	console.log(slides.length);
	    	
	    	slides[0].className = "current";
	    	
	    	var currentImage = angular.element(slides[0]).find("img");
	    	loadImage(currentImage);
	    		    	
	    	slides[1].className = "next";
	    	
	    	var nextImage = angular.element(slides[1]).find("img");
	    	loadImage(nextImage);
	    				
    		scope.goToNext = function() {
	    		
	    		console.log("Go to next slide");
	    		if(currentIndex < totalSlides-1) {
		    		currentIndex ++;
					goToSlide(currentIndex);	
	    		}
	    		else {
		    		console.error('Already showing last');
	    		}
	    		
    		}
    		
    		scope.goToPrev = function() {
	    		
	    		console.log("Go to previous slide");
	    		if(currentIndex > 0) {
		    		currentIndex --;
					goToSlide(currentIndex);	
	    		}
	    		else {
		    		console.error('Already showing first');
	    		}
    		}
    		
    		function goToSlide(index) {
    			
    			console.log("Go to slide " + index);
    			
    			//TODO - find a better way to remove class names
    			angular.forEach(slides,function(slide,index){
	    				angular.element(slide).removeClass("current prev next");
    			})
    			
    			if(index < totalSlides && index >= 0) {
    				slides[index].className = "current";
    			}
    			else {
	    			console.error("Image index out of range");
    			}
    			
    			if(index < totalSlides-1) {
	    			slides[index+1].className = "next";
	    			var image = angular.element(slides[index+1]).find("img");
					loadImage(image);
    			}
    			
    			if(index > 0) {
	    			slides[index-1].className = "prev";	
	    			var image = angular.element(slides[index-1]).find("img");
					loadImage(image);
    			}
    			
    		}
    		
    		function loadImage(element) {
	    		
	    		if(element.attr('src') === undefined && element.attr("dm-src") != undefined) {
	    			console.log("Loading image");
			    	element.attr('src',element.attr("dm-src"));
		    	}
	    		
    		}
    		
    	}
    	
    }
  };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2R1bGUuanMiLCJzZXJ2aWNlcy9zZXJ2aWNlcy5qcyIsImNvbnRyb2xsZXJzL2NvbnRyb2xsZXJzLmpzIiwiZGlyZWN0aXZlcy9kaXJlY3RpdmVzLmpzIiwiY29udHJvbGxlcnMvQ2Fycm91c2VsQ29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvRG1DYXJyb3VzZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQ0FBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYXJyb3VzZWxBcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ2Fycm91c2VsQXBwJywgW1xuXHQnYXBwQ29udHJvbGxlcnMnLFxuXHQnYXBwRGlyZWN0aXZlcycsXG5cdCduZ1JvdXRlJyxcblx0J25nQW5pbWF0ZScsXG5cdCduZ1RvdWNoJ1xuXSkiLCJ2YXIgYXBwU2VydmljZXMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwU2VydmljZXMnLCBbXSk7IiwidmFyIGFwcENvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2FwcENvbnRyb2xsZXJzJywgW10pOyIsInZhciBhcHBEaXJlY3RpdmVzID0gYW5ndWxhci5tb2R1bGUoJ2FwcERpcmVjdGl2ZXMnLCBbXSk7IiwiYXBwQ29udHJvbGxlcnMuY29udHJvbGxlcignQ2Fycm91c2VsQ3RybCcsIFsnJHNjb3BlJywgXG5cdFxuXHRmdW5jdGlvbiAoJHNjb3BlKSB7XG5cdFx0XHRcdFxuXHRcdCRzY29wZS5pbWFnZURhdGEgPSBbXTtcblx0XHRcblx0XHRnZW5lcmF0ZVRlc3RJbWFnZURhdGEoJHNjb3BlLmltYWdlRGF0YSw0KTtcblx0XHRcdFx0XG5cdFx0ZnVuY3Rpb24gZ2VuZXJhdGVUZXN0SW1hZ2VEYXRhKGltYWdlRGF0YU9iamVjdCxsZW5ndGgpIHtcblx0XHRcblx0XHRcdGZvciAodmFyIGk9MDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhT2JqZWN0LnB1c2goe1xuXHQgICAgICAgICAgICAgICAgbmFtZTogXCJJbWFnZSBcIiArIChpKzEpLFxuXHQgICAgICAgICAgICAgICAgcGF0aDogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNjAwLzMwMC9uYXR1cmUvXCIgKyAoKGkgKyAxKSAlIDEwKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgXG5cdH1dXG4pIiwiYXBwRGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2RtQ2Fycm91c2VsJywgWyckY29tcGlsZScsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG5cdCAgZGF0YTogJz1pbWFnZURhdGEnXG5cdH0sXG4gICAgY29tcGlsZTogZnVuY3Rpb24odEVsZW1lbnQsIHRBdHRyaWJ1dGVzKSB7XG4gICAgXHRcbiAgICBcdHJldHVybiBmdW5jdGlvbihzY29wZSwgaUVsZW1lbnQsIGlBdHRyaWJ1dGVzLCBjb250YWluZXJDdHJsKSB7XG4gICAgXHRcblx0ICAgIFx0dmFyIGN1cnJlbnRJbmRleCA9IDA7XG5cdCAgICBcdHZhciB0b3RhbFNsaWRlcyA9IHNjb3BlLmRhdGEubGVuZ3RoO1xuXHQgICAgXHRcdCAgICBcdFxuXHQgICAgXHR2YXIgdHBsID0gJzx1bCBjbGFzcz1cImRtLWNhclwiPic7XG5cdCAgICBcdFxuXHQgICAgXHRhbmd1bGFyLmZvckVhY2goc2NvcGUuZGF0YSxmdW5jdGlvbihpbWFnZSxpbmRleCkge1xuXHRcdCAgICBcdHRwbCArPSAnPGxpPjxkaXY+PGltZyBkbS1zcmM9XCInK2ltYWdlLnBhdGgrJ1wiIGFsdD1cIicraW1hZ2UubmFtZSsnXCIgLz48L2Rpdj48L2xpPic7XG5cdFx0ICAgIFx0XHRcblx0ICAgIFx0fSlcblx0ICAgIFx0XG5cdCAgICBcdHRwbCArPSBcIjwvdWw+XCI7XG5cdCAgICBcdFxuXHQgICAgXHRcblx0ICAgIFx0aUVsZW1lbnQuYXBwZW5kKCRjb21waWxlKGFuZ3VsYXIuZWxlbWVudCh0cGwpKShzY29wZSkpO1xuXHQgICAgXHRcblx0ICAgIFx0dmFyIG5hdiA9ICc8ZGl2IGNsYXNzPVwiZG0tY2FyLWNvbnRyb2xzXCI+JyArXG4gICAgICAgICAgICAgICAgJyAgPHNwYW4gY2xhc3M9XCJkbS1jYXItY29udHJvbCBkbS1jYXItY29udHJvbC1wcmV2XCIgbmctY2xpY2s9XCJnb1RvUHJldigpXCI+JmxzYXF1bzs8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJyAgPHNwYW4gY2xhc3M9XCJkbS1jYXItY29udHJvbCBkbS1jYXItY29udHJvbC1uZXh0XCIgbmctY2xpY2s9XCJnb1RvTmV4dCgpXCI+JnJzYXF1bzs8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpRWxlbWVudC5hcHBlbmQoJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KG5hdikpKHNjb3BlKSk7XG5cdFx0XHRcblx0ICAgIFx0Y29uc29sZS5sb2coaUVsZW1lbnQpO1xuXHQgICAgXHRcblx0ICAgIFx0dmFyIHNsaWRlcyA9IGlFbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVwiKTtcblx0ICAgIFx0dmFyIHNsaWRlczIgPSBhbmd1bGFyLmVsZW1lbnQoaUVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbChcImxpXCIpKTtcblx0ICAgIFx0YW5ndWxhci5lbGVtZW50KGlFbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50JykpXG5cdCAgICBcdFxuXHQgICAgXHRjb25zb2xlLmxvZyhzbGlkZXMubGVuZ3RoKTtcblx0ICAgIFx0XG5cdCAgICBcdHNsaWRlc1swXS5jbGFzc05hbWUgPSBcImN1cnJlbnRcIjtcblx0ICAgIFx0XG5cdCAgICBcdHZhciBjdXJyZW50SW1hZ2UgPSBhbmd1bGFyLmVsZW1lbnQoc2xpZGVzWzBdKS5maW5kKFwiaW1nXCIpO1xuXHQgICAgXHRsb2FkSW1hZ2UoY3VycmVudEltYWdlKTtcblx0ICAgIFx0XHQgICAgXHRcblx0ICAgIFx0c2xpZGVzWzFdLmNsYXNzTmFtZSA9IFwibmV4dFwiO1xuXHQgICAgXHRcblx0ICAgIFx0dmFyIG5leHRJbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbMV0pLmZpbmQoXCJpbWdcIik7XG5cdCAgICBcdGxvYWRJbWFnZShuZXh0SW1hZ2UpO1xuXHQgICAgXHRcdFx0XHRcbiAgICBcdFx0c2NvcGUuZ29Ub05leHQgPSBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHRcblx0ICAgIFx0XHRjb25zb2xlLmxvZyhcIkdvIHRvIG5leHQgc2xpZGVcIik7XG5cdCAgICBcdFx0aWYoY3VycmVudEluZGV4IDwgdG90YWxTbGlkZXMtMSkge1xuXHRcdCAgICBcdFx0Y3VycmVudEluZGV4ICsrO1xuXHRcdFx0XHRcdGdvVG9TbGlkZShjdXJyZW50SW5kZXgpO1x0XG5cdCAgICBcdFx0fVxuXHQgICAgXHRcdGVsc2Uge1xuXHRcdCAgICBcdFx0Y29uc29sZS5lcnJvcignQWxyZWFkeSBzaG93aW5nIGxhc3QnKTtcblx0ICAgIFx0XHR9XG5cdCAgICBcdFx0XG4gICAgXHRcdH1cbiAgICBcdFx0XG4gICAgXHRcdHNjb3BlLmdvVG9QcmV2ID0gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0XG5cdCAgICBcdFx0Y29uc29sZS5sb2coXCJHbyB0byBwcmV2aW91cyBzbGlkZVwiKTtcblx0ICAgIFx0XHRpZihjdXJyZW50SW5kZXggPiAwKSB7XG5cdFx0ICAgIFx0XHRjdXJyZW50SW5kZXggLS07XG5cdFx0XHRcdFx0Z29Ub1NsaWRlKGN1cnJlbnRJbmRleCk7XHRcblx0ICAgIFx0XHR9XG5cdCAgICBcdFx0ZWxzZSB7XG5cdFx0ICAgIFx0XHRjb25zb2xlLmVycm9yKCdBbHJlYWR5IHNob3dpbmcgZmlyc3QnKTtcblx0ICAgIFx0XHR9XG4gICAgXHRcdH1cbiAgICBcdFx0XG4gICAgXHRcdGZ1bmN0aW9uIGdvVG9TbGlkZShpbmRleCkge1xuICAgIFx0XHRcdFxuICAgIFx0XHRcdGNvbnNvbGUubG9nKFwiR28gdG8gc2xpZGUgXCIgKyBpbmRleCk7XG4gICAgXHRcdFx0XG4gICAgXHRcdFx0Ly9UT0RPIC0gZmluZCBhIGJldHRlciB3YXkgdG8gcmVtb3ZlIGNsYXNzIG5hbWVzXG4gICAgXHRcdFx0YW5ndWxhci5mb3JFYWNoKHNsaWRlcyxmdW5jdGlvbihzbGlkZSxpbmRleCl7XG5cdCAgICBcdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChzbGlkZSkucmVtb3ZlQ2xhc3MoXCJjdXJyZW50IHByZXYgbmV4dFwiKTtcbiAgICBcdFx0XHR9KVxuICAgIFx0XHRcdFxuICAgIFx0XHRcdGlmKGluZGV4IDwgdG90YWxTbGlkZXMgJiYgaW5kZXggPj0gMCkge1xuICAgIFx0XHRcdFx0c2xpZGVzW2luZGV4XS5jbGFzc05hbWUgPSBcImN1cnJlbnRcIjtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0ZWxzZSB7XG5cdCAgICBcdFx0XHRjb25zb2xlLmVycm9yKFwiSW1hZ2UgaW5kZXggb3V0IG9mIHJhbmdlXCIpO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRcbiAgICBcdFx0XHRpZihpbmRleCA8IHRvdGFsU2xpZGVzLTEpIHtcblx0ICAgIFx0XHRcdHNsaWRlc1tpbmRleCsxXS5jbGFzc05hbWUgPSBcIm5leHRcIjtcblx0ICAgIFx0XHRcdHZhciBpbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgrMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0XHRcdFx0bG9hZEltYWdlKGltYWdlKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0XG4gICAgXHRcdFx0aWYoaW5kZXggPiAwKSB7XG5cdCAgICBcdFx0XHRzbGlkZXNbaW5kZXgtMV0uY2xhc3NOYW1lID0gXCJwcmV2XCI7XHRcblx0ICAgIFx0XHRcdHZhciBpbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbaW5kZXgtMV0pLmZpbmQoXCJpbWdcIik7XG5cdFx0XHRcdFx0bG9hZEltYWdlKGltYWdlKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdFx0XG4gICAgXHRcdH1cbiAgICBcdFx0XG4gICAgXHRcdGZ1bmN0aW9uIGxvYWRJbWFnZShlbGVtZW50KSB7XG5cdCAgICBcdFx0XG5cdCAgICBcdFx0aWYoZWxlbWVudC5hdHRyKCdzcmMnKSA9PT0gdW5kZWZpbmVkICYmIGVsZW1lbnQuYXR0cihcImRtLXNyY1wiKSAhPSB1bmRlZmluZWQpIHtcblx0ICAgIFx0XHRcdGNvbnNvbGUubG9nKFwiTG9hZGluZyBpbWFnZVwiKTtcblx0XHRcdCAgICBcdGVsZW1lbnQuYXR0cignc3JjJyxlbGVtZW50LmF0dHIoXCJkbS1zcmNcIikpO1xuXHRcdCAgICBcdH1cblx0ICAgIFx0XHRcbiAgICBcdFx0fVxuICAgIFx0XHRcbiAgICBcdH1cbiAgICBcdFxuICAgIH1cbiAgfTtcbn1dKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
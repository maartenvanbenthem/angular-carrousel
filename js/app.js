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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2R1bGUuanMiLCJzZXJ2aWNlcy9zZXJ2aWNlcy5qcyIsImNvbnRyb2xsZXJzL2NvbnRyb2xsZXJzLmpzIiwiZGlyZWN0aXZlcy9kaXJlY3RpdmVzLmpzIiwiY29udHJvbGxlcnMvQ2Fycm91c2VsQ29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvRG1DYXJyb3VzZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQ0FBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYXJyb3VzZWxBcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ2Fycm91c2VsQXBwJywgW1xuXHQnYXBwQ29udHJvbGxlcnMnLFxuXHQnYXBwRGlyZWN0aXZlcycsXG5cdCduZ1JvdXRlJyxcblx0J25nQW5pbWF0ZScsXG5cdCduZ1RvdWNoJ1xuXSkiLCJ2YXIgYXBwU2VydmljZXMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwU2VydmljZXMnLCBbXSk7IiwidmFyIGFwcENvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2FwcENvbnRyb2xsZXJzJywgW10pOyIsInZhciBhcHBEaXJlY3RpdmVzID0gYW5ndWxhci5tb2R1bGUoJ2FwcERpcmVjdGl2ZXMnLCBbXSk7IiwiYXBwQ29udHJvbGxlcnMuY29udHJvbGxlcignQ2Fycm91c2VsQ3RybCcsIFsnJHNjb3BlJywgXG5cdFxuXHRmdW5jdGlvbiBDYXJyb3VzZWxDdHJsKCRzY29wZSkge1xuXHRcdFx0XHRcblx0XHQkc2NvcGUuaW1hZ2VEYXRhID0gW107XG5cdFx0XG5cdFx0Z2VuZXJhdGVUZXN0SW1hZ2VEYXRhKCRzY29wZS5pbWFnZURhdGEsNCk7XG5cdFx0XG5cdFx0JHNjb3BlLnRlc3RGdW5jdGlvbiA9IGZ1bmN0aW9uICgpe1xuXHRcdFx0XG5cdFx0XHQkc2NvcGUudGVzdCA9IFwidGVzdFwiO1xuXHRcdFx0XG5cdFx0fVxuXHRcdFx0XHRcblx0XHRmdW5jdGlvbiBnZW5lcmF0ZVRlc3RJbWFnZURhdGEoaW1hZ2VEYXRhT2JqZWN0LGxlbmd0aCkge1xuXHRcdFxuXHRcdFx0Zm9yICh2YXIgaT0wOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbWFnZURhdGFPYmplY3QucHVzaCh7XG5cdCAgICAgICAgICAgICAgICBuYW1lOiBcIkltYWdlIFwiICsgKGkrMSksXG5cdCAgICAgICAgICAgICAgICBwYXRoOiBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS82MDAvMzAwL25hdHVyZS9cIiArICgoaSArIDEpICUgMTApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICBcblx0fV1cbikiLCJhcHBEaXJlY3RpdmVzLmRpcmVjdGl2ZSgnZG1DYXJyb3VzZWwnLCBbJyRjb21waWxlJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcblx0ICBkYXRhOiAnPWltYWdlRGF0YSdcblx0fSxcbiAgICBjb21waWxlOiBmdW5jdGlvbih0RWxlbWVudCwgdEF0dHJpYnV0ZXMpIHtcbiAgICBcdFxuICAgIFx0cmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBpRWxlbWVudCwgaUF0dHJpYnV0ZXMsIGNvbnRhaW5lckN0cmwpIHtcbiAgICBcdFxuXHQgICAgXHR2YXIgY3VycmVudEluZGV4ID0gMDtcblx0ICAgIFx0dmFyIHRvdGFsU2xpZGVzID0gc2NvcGUuZGF0YS5sZW5ndGg7XG5cdCAgICBcdFx0ICAgIFx0XG5cdCAgICBcdHZhciB0cGwgPSAnPHVsIGNsYXNzPVwiZG0tY2FyXCI+Jztcblx0ICAgIFx0XG5cdCAgICBcdGFuZ3VsYXIuZm9yRWFjaChzY29wZS5kYXRhLGZ1bmN0aW9uKGltYWdlLGluZGV4KSB7XG5cdFx0ICAgIFx0dHBsICs9ICc8bGk+PGRpdj48aW1nIGRtLXNyYz1cIicraW1hZ2UucGF0aCsnXCIgYWx0PVwiJytpbWFnZS5uYW1lKydcIiAvPjwvZGl2PjwvbGk+Jztcblx0XHQgICAgXHRcdFxuXHQgICAgXHR9KVxuXHQgICAgXHRcblx0ICAgIFx0dHBsICs9IFwiPC91bD5cIjtcblx0ICAgIFx0XG5cdCAgICBcdFxuXHQgICAgXHRpRWxlbWVudC5hcHBlbmQoJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KHRwbCkpKHNjb3BlKSk7XG5cdCAgICBcdFxuXHQgICAgXHR2YXIgbmF2ID0gJzxkaXYgY2xhc3M9XCJkbS1jYXItY29udHJvbHNcIj4nICtcbiAgICAgICAgICAgICAgICAnICA8c3BhbiBjbGFzcz1cImRtLWNhci1jb250cm9sIGRtLWNhci1jb250cm9sLXByZXZcIiBuZy1jbGljaz1cImdvVG9QcmV2KClcIj4mbHNhcXVvOzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnICA8c3BhbiBjbGFzcz1cImRtLWNhci1jb250cm9sIGRtLWNhci1jb250cm9sLW5leHRcIiBuZy1jbGljaz1cImdvVG9OZXh0KClcIj4mcnNhcXVvOzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlFbGVtZW50LmFwcGVuZCgkY29tcGlsZShhbmd1bGFyLmVsZW1lbnQobmF2KSkoc2NvcGUpKTtcblx0XHRcdFxuXHQgICAgXHRjb25zb2xlLmxvZyhpRWxlbWVudCk7XG5cdCAgICBcdFxuXHQgICAgXHR2YXIgc2xpZGVzID0gaUVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbChcImxpXCIpO1xuXHQgICAgXHR2YXIgc2xpZGVzMiA9IGFuZ3VsYXIuZWxlbWVudChpRWxlbWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIikpO1xuXHQgICAgXHRhbmd1bGFyLmVsZW1lbnQoaUVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKSlcblx0ICAgIFx0XG5cdCAgICBcdGNvbnNvbGUubG9nKHNsaWRlcy5sZW5ndGgpO1xuXHQgICAgXHRcblx0ICAgIFx0c2xpZGVzWzBdLmNsYXNzTmFtZSA9IFwiY3VycmVudFwiO1xuXHQgICAgXHRcblx0ICAgIFx0dmFyIGN1cnJlbnRJbWFnZSA9IGFuZ3VsYXIuZWxlbWVudChzbGlkZXNbMF0pLmZpbmQoXCJpbWdcIik7XG5cdCAgICBcdGxvYWRJbWFnZShjdXJyZW50SW1hZ2UpO1xuXHQgICAgXHRcdCAgICBcdFxuXHQgICAgXHRzbGlkZXNbMV0uY2xhc3NOYW1lID0gXCJuZXh0XCI7XG5cdCAgICBcdFxuXHQgICAgXHR2YXIgbmV4dEltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1sxXSkuZmluZChcImltZ1wiKTtcblx0ICAgIFx0bG9hZEltYWdlKG5leHRJbWFnZSk7XG5cdCAgICBcdFx0XHRcdFxuICAgIFx0XHRzY29wZS5nb1RvTmV4dCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdFxuXHQgICAgXHRcdGNvbnNvbGUubG9nKFwiR28gdG8gbmV4dCBzbGlkZVwiKTtcblx0ICAgIFx0XHRpZihjdXJyZW50SW5kZXggPCB0b3RhbFNsaWRlcy0xKSB7XG5cdFx0ICAgIFx0XHRjdXJyZW50SW5kZXggKys7XG5cdFx0XHRcdFx0Z29Ub1NsaWRlKGN1cnJlbnRJbmRleCk7XHRcblx0ICAgIFx0XHR9XG5cdCAgICBcdFx0ZWxzZSB7XG5cdFx0ICAgIFx0XHRjb25zb2xlLmVycm9yKCdBbHJlYWR5IHNob3dpbmcgbGFzdCcpO1xuXHQgICAgXHRcdH1cblx0ICAgIFx0XHRcbiAgICBcdFx0fVxuICAgIFx0XHRcbiAgICBcdFx0c2NvcGUuZ29Ub1ByZXYgPSBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHRcblx0ICAgIFx0XHRjb25zb2xlLmxvZyhcIkdvIHRvIHByZXZpb3VzIHNsaWRlXCIpO1xuXHQgICAgXHRcdGlmKGN1cnJlbnRJbmRleCA+IDApIHtcblx0XHQgICAgXHRcdGN1cnJlbnRJbmRleCAtLTtcblx0XHRcdFx0XHRnb1RvU2xpZGUoY3VycmVudEluZGV4KTtcdFxuXHQgICAgXHRcdH1cblx0ICAgIFx0XHRlbHNlIHtcblx0XHQgICAgXHRcdGNvbnNvbGUuZXJyb3IoJ0FscmVhZHkgc2hvd2luZyBmaXJzdCcpO1xuXHQgICAgXHRcdH1cbiAgICBcdFx0fVxuICAgIFx0XHRcbiAgICBcdFx0ZnVuY3Rpb24gZ29Ub1NsaWRlKGluZGV4KSB7XG4gICAgXHRcdFx0XG4gICAgXHRcdFx0Y29uc29sZS5sb2coXCJHbyB0byBzbGlkZSBcIiArIGluZGV4KTtcbiAgICBcdFx0XHRcbiAgICBcdFx0XHQvL1RPRE8gLSBmaW5kIGEgYmV0dGVyIHdheSB0byByZW1vdmUgY2xhc3MgbmFtZXNcbiAgICBcdFx0XHRhbmd1bGFyLmZvckVhY2goc2xpZGVzLGZ1bmN0aW9uKHNsaWRlLGluZGV4KXtcblx0ICAgIFx0XHRcdFx0YW5ndWxhci5lbGVtZW50KHNsaWRlKS5yZW1vdmVDbGFzcyhcImN1cnJlbnQgcHJldiBuZXh0XCIpO1xuICAgIFx0XHRcdH0pXG4gICAgXHRcdFx0XG4gICAgXHRcdFx0aWYoaW5kZXggPCB0b3RhbFNsaWRlcyAmJiBpbmRleCA+PSAwKSB7XG4gICAgXHRcdFx0XHRzbGlkZXNbaW5kZXhdLmNsYXNzTmFtZSA9IFwiY3VycmVudFwiO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRlbHNlIHtcblx0ICAgIFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJJbWFnZSBpbmRleCBvdXQgb2YgcmFuZ2VcIik7XG4gICAgXHRcdFx0fVxuICAgIFx0XHRcdFxuICAgIFx0XHRcdGlmKGluZGV4IDwgdG90YWxTbGlkZXMtMSkge1xuXHQgICAgXHRcdFx0c2xpZGVzW2luZGV4KzFdLmNsYXNzTmFtZSA9IFwibmV4dFwiO1xuXHQgICAgXHRcdFx0dmFyIGltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1tpbmRleCsxXSkuZmluZChcImltZ1wiKTtcblx0XHRcdFx0XHRsb2FkSW1hZ2UoaW1hZ2UpO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRcbiAgICBcdFx0XHRpZihpbmRleCA+IDApIHtcblx0ICAgIFx0XHRcdHNsaWRlc1tpbmRleC0xXS5jbGFzc05hbWUgPSBcInByZXZcIjtcdFxuXHQgICAgXHRcdFx0dmFyIGltYWdlID0gYW5ndWxhci5lbGVtZW50KHNsaWRlc1tpbmRleC0xXSkuZmluZChcImltZ1wiKTtcblx0XHRcdFx0XHRsb2FkSW1hZ2UoaW1hZ2UpO1xuICAgIFx0XHRcdH1cbiAgICBcdFx0XHRcbiAgICBcdFx0fVxuICAgIFx0XHRcbiAgICBcdFx0ZnVuY3Rpb24gbG9hZEltYWdlKGVsZW1lbnQpIHtcblx0ICAgIFx0XHRcblx0ICAgIFx0XHRpZihlbGVtZW50LmF0dHIoJ3NyYycpID09PSB1bmRlZmluZWQgJiYgZWxlbWVudC5hdHRyKFwiZG0tc3JjXCIpICE9IHVuZGVmaW5lZCkge1xuXHQgICAgXHRcdFx0Y29uc29sZS5sb2coXCJMb2FkaW5nIGltYWdlXCIpO1xuXHRcdFx0ICAgIFx0ZWxlbWVudC5hdHRyKCdzcmMnLGVsZW1lbnQuYXR0cihcImRtLXNyY1wiKSk7XG5cdFx0ICAgIFx0fVxuXHQgICAgXHRcdFxuICAgIFx0XHR9XG4gICAgXHRcdFxuICAgIFx0fVxuICAgIFx0XG4gICAgfVxuICB9O1xufV0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
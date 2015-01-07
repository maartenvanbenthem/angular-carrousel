describe('Unit: DmCarrousel directive', function() {
  
	beforeEach(module('CarrouselApp'));
	
	var ctrl, scope, elem;
	
	beforeEach(inject(function ($rootScope, $compile) {
	
		scope = $rootScope.$new();
		
		// create dummy data			
		var data = [];
		
		for (var i=0; i < 8; i++) {
            data.push({
                name: "Image " + (i+1),
                path: "http://lorempixel.com/600/300/nature/" + ((i + 1) % 10)
            })
        }
        
		scope.imageData = data;
		
		elem = angular.element('<dm-carrousel image-data="imageData"></dm-carrousel>');
		
		$compile(elem)(scope);
	
	}));

	it('Should have a list of items with an image in it and a set dm-src attribute for each image object in the image data object', function(){
		
		var items = angular.element(elem[0].querySelectorAll('.dm-car-item'));
				
		angular.forEach(scope.imageData,function(image,index){

			expect(angular.element(items[index]).find('img').attr('dm-src')).not.toBe('');

		})

	});
	
	it('Should have navigation buttons with the correct click events attached to it', function(){
		
		//check all next buttons
		var controls_next = angular.element(elem[0].querySelectorAll('.dm-car-control-next'));
		
		//at least one button for next
		expect(controls_next.length).toBeGreaterThan(0);
		
		angular.forEach(controls_next,function(control,index){
			
			expect(angular.element(control).attr('ng-click')).toBe('goToNext()');
				
		})
		
		//check all prev buttons
		var controls_prev = angular.element(elem[0].querySelectorAll('.dm-car-control-prev'));

		//at least one button for prev
		expect(controls_prev.length).toBeGreaterThan(0);
		
		angular.forEach(controls_prev,function(control,index){
			
			expect(angular.element(control).attr('ng-click')).toBe('goToPrev()');
				
		})
			
	});
	
})
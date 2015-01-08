describe('Carrousel', function() {

	var showNext = element(by.css('.dm-car-control-next'));
	var showPrev = element(by.css('.dm-car-control-prev'));
	var images = element.all(by.css('.dm-car-item'));
		
	beforeEach(function() {

		browser.get('http://localhost/angular-carrousel/');
		
		
	});
	
	it("should initially have loaded maximum 3 images, the first, the second and the last", function() {
		
		images.count().then(function(count) {
		  
			images.each(function(element,index) {
			
				if (index < 2 || index == (count-1)) {
			
					expect(element.element(by.css('img')).getAttribute('src')).not.toEqual('');
			
				}
				else {
				
					expect(element.element(by.css('img')).getAttribute('src')).toEqual(null);
					
				}
			
			});
		  
		});
		
			
	});
	
	it("should show the next image after click to show next image", function() {
	
		showNext.click();
		
		expect(images.get(0).getAttribute('class')).toMatch('prev');
		
		expect(images.get(1).getAttribute('class')).toMatch('current');
		
		expect(images.get(2).getAttribute('class')).toMatch('next');
		
	});
	
	it("should show the previous image after click to show prev image", function() {
		
		images.count().then(function(count) {
			
			showPrev.click();
		
			expect(images.get(count-1).getAttribute('class')).toMatch('prev');
			
			expect(images.get(count).getAttribute('class')).toMatch('current');
			
			expect(images.get(0).getAttribute('class')).toMatch('next');

			
		})
				
	});
	
	it("should load the 3rd image if the 2nd image is shown", function() {
				
		images.count().then(function(count) {
			
			if (count > 3) {
			
				showNext.click();
					
				expect(images.get(3).element(by.css('img')).getAttribute('src')).not.toEqual('');	
				
			}
			
		})
				
	});
	
	it("should load the image before the last one if the last image is shown", function() {
				
		images.count().then(function(count) {
			
			if (count > 3) {
			
				showPrev.click();
					
				expect(images.get(count-2).element(by.css('img')).getAttribute('src')).not.toEqual('');	
				
			}
			
		})
				
	});
	       
});
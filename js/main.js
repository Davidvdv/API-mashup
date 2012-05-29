$(document).ready(function() {
	
	// Set the focus by default to the input field.
	$('#artist-search').focus();
	
	// Hide the content part when DOM is ready.
	$('#content').hide();
	
	// Handling the form submit event.
	$('#form-artist-search').submit(function() {
		$('#content').hide();
		
		// Create an instance of App.
		var app = new App();
		
		// Fetch alot of data from the given artist the user requested.
		app.findArtistInfo($('#artist-search').val());
		
		// Fade the content in.
		$('#content').fadeIn();
		
		// Prevent reloading the page.
		return false;
	});
	
	$('#past-concerts table tbody tr a').live('click', function(e) {
		e.preventDefault();
		$('#videos-concerts').empty();
		app.findVideosOfConcerts($(this).attr('data-search'));
	});
	
	// Handling the tabs.
	$('#info-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
});
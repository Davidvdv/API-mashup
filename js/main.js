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
		//app.getVideos('Tycho');
		
		// Fade the content in.
		$('#content').fadeIn();
		
		// Prevent reloading the page.
		return false;
	});
	
	// Handling the tabs.
	$('#info-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
});
$(document).ready(function() {
	
	$('#artist-search').focus();
	$('#before-search').hide();
	
	$('#form-artist-search').submit(function() {
		$('#before-search').hide();
		
		app($('#artist-search').val());
		$('#before-search').fadeIn();
		
		return false;
	});
	
	$('#info-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
});
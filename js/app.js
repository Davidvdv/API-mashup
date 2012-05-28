/*

$('.video img').live('click', function(){
	$('#video-details').empty();
});*/


/* App-class
 * Songkick.com API-key: Ap6UKNWuYTXt70qi
 * @desc API-mashup of Songkick.com API and YouTube Data API.
 * @param artistName (The searched name of an artist.)
 */
function App() {
	
	// The API-key I recieved from Songkick.com
	this.APIkey = 'Ap6UKNWuYTXt70qi';
	
	// Data about an artist which is useful for other methods.
	this.artistInfo = null
}

App.prototype.findArtistInfo = function(artistName) {
	app = this; // Reference to App.
	
	// Get info of an requested artist.
	$.getJSON('http://api.songkick.com/api/3.0/search/artists.json', 
		{
			query: artistName,
			apikey: app.APIkey 
		}, 
		function(artistsData) {
			app.findUpcomingConcerts(artistsData.resultsPage.results.artist[0].id);
			app.findPastConcerts(artistsData.resultsPage.results.artist[0].id);
			
			app.artistInfo = artistsData.resultsPage.results.artist[0];
			
			// Show the displayName on the screen.
			$('#content').prepend('<h1>'+artistsData.resultsPage.results.artist[0].displayName+'</h1>');
	});
}

App.prototype.findUpcomingConcerts = function(artistId) {
	app = this; // Reference to App.
	
	$.getJSON('http://api.songkick.com/api/3.0/artists/'+artistId+'/calendar.json',
		{
			apikey: app.APIkey
		},
		function(upcoming) {
			$.each(upcoming.resultsPage.results.event, function(i, v) {
				$('#upcoming-concerts tbody').append('<tr><td>'+v.displayName+'</td><td>'+v.type+'</td></tr>');
			});
		}
	);
}

App.prototype.findPastConcerts = function(artistId) {
	app = this; // Reference to App.
	
	$.getJSON('http://api.songkick.com/api/3.0/artists/'+artistId+'/gigography.json',
		{
			apikey: app.APIkey
		},
		function(past) {
			console.log(past);
			
			// Reverse the array to get the latest gigs first.
			var recentConcerts = past.resultsPage.results.event.reverse();
			$.each(recentConcerts, function(i, v) {
				$('#past-concerts tbody').append('<tr><td>'+v.displayName+'</td><td>'+v.type+'</td></tr>');
			});
		}
	);
	
	$('#past-concerts tbody tr td').live('click', function() {
		app.getVideos(app.artistInfo.displayName);
	})
}

App.prototype.getVideos = function(artistName) {
	app = this;
	
	$.getJSON('https://gdata.youtube.com/feeds/api/videos?q='+artistName+'&orderby=relevance&start-index=1&max-results=10&alt=json&v=2',
		function(d) {
			console.log(d);
			$.each(d.feed.entry, function(){
				var videoImage = this.media$group.media$thumbnail[2].url;
				var videoTitle = this.media$group.media$title.$t;
				$('#past-concerts-videos').append('<h3>'+videoTitle+'</h3><img src="'+videoImage+'" />');
			});
	});
}


/*$.getJSON('https://gdata.youtube.com/feeds/api/videos?q=rotterdam&orderby=published&start-index=1&max-results=30&alt=json&v=2',
	function(d) {
		$.each(d.feed.entry, function(){
			console.log(this.media$group);
			var videoImage = this.media$group.media$thumbnail[0].url;
			var videoTitle = this.media$group.media$title.$t;
			$('#videos').append('<div class="video"><p>'+videoTitle+'</p><img src="'+videoImage+'" data-title="'+videoTitle+'" /></div>');
		});
});

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
			app.artistInfo = artistsData.resultsPage.results.artist[0];
			
			app.findUpcomingConcerts(artistsData.resultsPage.results.artist[0].id);
			
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

App.prototype.getVideos = function() {
	app = this;
}


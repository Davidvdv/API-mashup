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
			if(artistsData.resultsPage.totalEntries > 0) {
				app.findUpcomingConcerts(artistsData.resultsPage.results.artist[0].id);
				app.findPastConcerts(artistsData.resultsPage.results.artist[0].id);
				app.findVideos(artistsData.resultsPage.results.artist[0].displayName);
				
				app.artistInfo = artistsData.resultsPage.results.artist[0];			
				
				// Show the displayName on the screen.
				$('#content').prepend('<h1>'+artistsData.resultsPage.results.artist[0].displayName+'</h1>');
			} else {
				if(confirm('The artist '+artistName+' is not found! Would you like to retry?')) window.location.reload();
				else alert('Ah well. Have fun staring at a blank page then ;)');
			}
	});
}

App.prototype.findUpcomingConcerts = function(artistId) {
	app = this; // Reference to App.
	
	$.getJSON('http://api.songkick.com/api/3.0/artists/'+artistId+'/calendar.json',
		{
			apikey: app.APIkey
		},
		function(upcoming) {
			if(upcoming.resultsPage.totalEntries > 0) {
				$.each(upcoming.resultsPage.results.event, function(i, v) {
					$('#upcoming-concerts tbody').append('<tr><td>'+v.displayName+'</td><td>'+v.type+'</td></tr>');
				});
			}
			else {
				$('#upcoming-concerts tbody').append('<tr><td colspan="2">No upcoming concerts soon of '+app.artistInfo.displayName+'</td></tr>');
			}
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
			
			var lastPage = Math.ceil(past.resultsPage.totalEntries/50);
			console.log(lastPage);
			
			$.getJSON('http://api.songkick.com/api/3.0/artists/'+artistId+'/gigography.json',
				{
					apikey: app.APIkey,
					page: lastPage
				},
				function(concerts) {
					var lastConcerts = concerts.resultsPage.results.event.reverse();			
					$.each(lastConcerts, function(i, v) {
						$('#past-concerts tbody').append('<tr><td>'+v.displayName+'</td><td>'+v.type+'</td></tr>');
					});
				}
			);
		});
}

App.prototype.findVideos = function(artistName) {
	app = this; // Reference to App.
	
	$.getJSON(
		'https://gdata.youtube.com/feeds/api/videos?q='+artistName+' live&orderby=relevance&start-index=1&max-results=10&alt=json&v=2',
		function(videos) {
			$.each(videos.feed.entry, function(){
				console.log(this);
				var videoImage = this.media$group.media$thumbnail[2].url;
				var videoTitle = this.media$group.media$title.$t;
				var videoId = this.media$group.yt$videoid.$t;
				
				$('#video-results').append('<h3>'+videoTitle+'</h3><a href="http://www.youtube.com/watch?v='+videoId+'"><img src="'+videoImage+'" /></a>');
			});
	});
}


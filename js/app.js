/*
App.prototype.getTT = function() {
	app = this;
	
	$.getJSON('http://api.twitter.com/1/trends/daily.json', {exclude: 'hashtags'} , function(data) {
		
		$.each(data.trends, function( date, trends ) {
            console.log(date);
            $.each(trends, function( i, trend ) {
                console.log(trend);
            });
        });
	});
	
}

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


/* App-function
 * Songkick.com API-key: Ap6UKNWuYTXt70qi
 * @desc API-mashup of Songkick.com API and YouTube Data API.
 * @param artistName (The searched name of an artist.)
 */
function app(artistName) {
	
	var APIkey = 'Ap6UKNWuYTXt70qi';

	$.getJSON('http://api.songkick.com/api/3.0/search/artists.json', 
		{ 
			query: artistName,
			apikey: APIkey 
		}, 
		function(artistsData) {
			console.log(artistsData);
			var artistId = artistsData.resultsPage.results.artist[0].id;
			
			$('#artist-info').append(artistsData.resultsPage.results.artist[0].displayName);
			
			$.getJSON('http://api.songkick.com/api/3.0/artists/'+artistId+'/calendar.json',
				{
					apikey: APIkey
				},
				function(artist) {
					//console.log(artist);
				}
			);
	});
}
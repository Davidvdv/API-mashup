function initFacebook() {
	window.fbAsyncInit = function() {
		FB.init({
			 appId      : '388531264526469', // App ID
			 status     : true, // check login status
			 cookie     : true, // enable cookies to allow the server to access the session
			 xfbml      : true  // parse XFBML
		});
		
		// Additional initialization code here
		FB.getLoginStatus(function(response) {
			if(response.status == 'connected') {
				$('#FBButton').hide();
				
				FB.api('/me', function(response) {
					$('#facebook').append('<h4>'+response.first_name+' '+response.last_name+'</h4>');
				});
				
				/*
				// To remove permissions.
				FB.api('/'+response.authResponse.userID+'/permissions', 'delete', function(r){
					console.log(r);
				});*/
				
				$('#facebook').append('<img class="pull-left" src="https://graph.facebook.com/'+response.authResponse.userID+'/picture" alt="Profile pic" />');
				
				$.getJSON('https://graph.facebook.com/me/music?access_token='+response.authResponse.accessToken, function(d) {
					$('#facebook').append('<p>Music likes op Facebook <span class="badge badge-important">'+d.data.length+'</span></p>');
					$.each(d.data, function() {
						$('#facebook-artists tbody').append('<tr><td>'+this.name+'</td></tr>');
					});
				});
								
				/*FB.api('/me/likes', function(response) {
					console.log(response);
				});*/
			}
		});
		
		FB.Event.subscribe('auth.login', function(response) {
			window.location.reload();
		});
	};

	// Load the SDK Asynchronously
	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));
}
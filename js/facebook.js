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
				/*
				// To remove permissions.
				FB.api('/'+response.authResponse.userID+'/permissions', 'delete', function(r){
					console.log(r);
				});*/
				
				FB.api('/me/likes', function(response) {
					if(response.category == 'music') {
						console.log(response);
					}
					
				});
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
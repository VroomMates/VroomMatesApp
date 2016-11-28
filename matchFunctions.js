var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);
	  
	  firebase.auth().onAuthStateChanged(function(user) {
			firebase.database().ref('Users/' + user.uid).once('value').then(function(snapshot) {
					document.getElementById('lat').innerHTML = snapshot.val().location.lat;
					document.getElementById('lng').innerHTML = snapshot.val().location.lng;
			});
	  });
	  //logout not run
	  var logout=false;
	  
	  function test(){
		document.getElementById('test').innerHTML = firebase.auth().currentUser.uid;
	  }
	  
	  function match(){
		var str = {//mullingar
			lat: document.getElementById('lat').innerHTML,
			lng: document.getElementById('lng').innerHTML
		};
		var you = {//kinnegad
			lat:53.3975669,
			lng:-6.6768745
		};
		
		var end = {//maynooth
			lat:53.3813,
			lng:-6.5918
		};
		
		var poslat = str.lat;
		var poslng = str.lng;
		
		//above + left
		if(str.lat>end.lat&&str.lng<end.lng){
			var ratiolat = (str.lat - end.lat)/100;
			var ratiolng = (str.lng - end.lng)/100;
			//alert(ratiolat + " // " + ratiolng);
				while(poslat>=end.lat && poslng <=end.lng ){
				//alert(poslat + " /// " + poslng)
					var lngdiff = Math.abs(you.lng - poslng);
					var latdiff = Math.abs(you.lat - poslat);
					//alert(lngdiff + " | " + latdiff);

					if( (lngdiff<=.1) && (latdiff<=.1)){
						latdiff = (1-latdiff)*6;
						lngdiff = (1-lngdiff)*6;
						alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km");
						document.getElementById('match').innerHTML = poslat;
						document.getElementById('match').innerHTML += " | " + poslng ;
						//alert("Match within 8km");
						
						break;
					}
					
					if(poslat>end.lat){
						poslat -= ratiolat*2;
					}
					
					if(poslng<end.lng){
						poslng -= ratiolng*2;
					}
				}
		}
		//above + right
		if(str.lat>end.lat&&str.lng>end.lng){
			while(poslat>=end.lat && poslng >=end.lng ){
				var lngdiff = Math.abs(you.lng + poslng);
				var latdiff = Math.abs(you.lat + poslat);
				//alert(lngdiff + " | " + latdiff);

				if( (lngdiff<.1) && (latdiff<.1)){
					document.getElementById('match').innerHTML = poslat;
					document.getElementById('match').innerHTML += " | " + poslng ;
					alert("Match within 16km");
					break;
				}
				
				if(poslat>end.lat){
					poslat = poslat - .01;
				}
				
				if(poslng>end.lng){
					poslng = poslng - .01;
				}
			}
		}
		
		//below + left
		if(str.lat<end.lat&&str.lng<end.lng){
			while(poslat<=end.lat && poslng <=end.lng ){
				var lngdiff = Math.abs(you.lng - poslng);
				var latdiff = Math.abs(you.lat - poslat);
				//alert(lngdiff + " | " + latdiff);

				if( (lngdiff<.1) && (latdiff<.1)){
					document.getElementById('match').innerHTML = poslat;
					document.getElementById('match').innerHTML += " | " + poslng ;
					alert("Match within 16km");
					break;
				}
				
				if(poslat<end.lat){
					poslat = poslat + .0;
				}
				
				if(poslng<end.lng){
					poslng = poslng + .01;
				}
			}
		} 
				//below + right
		if(str.lat<end.lat&&str.lng>end.lng){
			while(poslat<=end.lat && poslng <=end.lng ){
				var lngdiff = Math.abs(you.lng - poslng);
				var latdiff = Math.abs(you.lat - poslat);
				//alert(lngdiff + " | " + latdiff);

				if( (lngdiff<.1) && (latdiff<.1)){
					document.getElementById('match').innerHTML = poslat;
					document.getElementById('match').innerHTML += " | " + poslng ;
					alert("Match within 16km");
					break;
				}
				
				if(poslat<end.lat){
					poslat = poslat + .01;
				}
				
				if(poslng>end.lng){
					poslng = poslng - .01;
				}
			}
		}
	  }
	  
	  //handles login redirect
	  function Login() {
			   firebase.auth().onAuthStateChanged(function(user) {
			   //if user already signed in
				if(user){
					alert("You are already signed in!");
				}
				//else redirect to login page
				else{
					window.location="index.html";
				}
			});
		}
		//handles logout redirect
		function Logout() {
			   firebase.auth().onAuthStateChanged(function(user) {
			   //if user not signed in and logout false to avoid alert running after else runs
				if(user==null&&logout==false){
					alert("You are not signed in!");
				}
				//else sign out user, redirect to login page, logout set to true
				else{
					logout=true;
					window.location="index.html";
					firebase.auth().signOut();
				}
			});
	}
	/*firebase.database().ref('Users/' + user.uid).once('value').then(function(snapshot) {
					document.getElementById('lat').innerHTML = snapshot.val().location.lat;
					document.getElementById('lng').innerHTML = snapshot.val().location.lng;
			});*/
	function search(){
		var userLat = document.getElementById('lat').innerHTML;
		var userLng = document.getElementById('lng').innerHTML;
		var mayLat = 53.3813;
		var mayLng = -6.5918;
		
		firebase.database().ref('Users').orderByChild("firstName").on("child_added", function(snapshot) {
		var uid = snapshot.key;
		var lat = snapshot.val().location.lat;
		var lng = snapshot.val().location.lng;
		if(uid!=firebase.auth().currentUser.uid){
			if((lat<userLat&&lat>mayLat)&&(lng>userLng&&lng<mayLng)){
				alert(uid);
			}
		}
});
	}
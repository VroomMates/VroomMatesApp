var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);
	  
	  var userLat;
	  var userLng;
	  
	  firebase.auth().onAuthStateChanged(function(user) {
			firebase.database().ref('Users/' + user.uid).once('value').then(function(snapshot) {
					userLat = snapshot.val().location.lat;
					userLng = snapshot.val().location.lng;
					search();
			});
	  });
	  
	  var matches = [];
	  
	  function matching(){
			while(true){
				obj=matches.pop()
				if(obj==null) {break;}
				else{
					match(obj);
				}
			}
	  }
	  
	  function match(obj){
		var str = {//mullingar
			lat: obj.lat,
			lng: obj.lng
		};
		var you = {//kinnegad
			lat:userLat,
			lng:userLng
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
						alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km with user: " + obj.uid);
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
	  
	function search(){
		var mayLat = 53.3813;
		var mayLng = -6.5918;
		
		
		firebase.database().ref().once("child_added", function(snapshot) {
			snapshot.forEach(function(childSnapshot){
			var uid = childSnapshot.key;
			var lat = childSnapshot.val().location.lat;
			var lng = childSnapshot.val().location.lng;
			if(uid!=firebase.auth().currentUser.uid){
				if((lat>=userLat&&lat<=mayLat)&&(lng<=userLng&&lng>=mayLng)){
					//alert(uid);
					var object = {uid: uid, lat:lat, lng:lng};
					matches.push(object);
				}
				else if((lat>=userLat&&lat<=mayLat)&&(lng>=userLng&&lng<=mayLng)){
					//alert(uid);
					var object = {uid: uid, lat:lat, lng:lng};
					matches.push(object);
				}
				else if((lat<=userLat&&lat>=mayLat)&&(lng<=userLng&&lng>=mayLng)){
					//alert(uid);
					var object = {uid: uid, lat:lat, lng:lng};
					matches.push(object);
				}
				else if((lat<=userLat&&lat>=mayLat)&&(lng>=userLng&&lng<=mayLng)){
					//alert(uid);
					var object = {uid: uid, lat:lat, lng:lng};
					matches.push(object);
				}
			}
		})
		matching();
		});
	}
	
	
	
	
	
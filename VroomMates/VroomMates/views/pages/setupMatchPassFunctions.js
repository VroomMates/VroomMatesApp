var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);
	  
	  firebase.auth().onAuthStateChanged(function(user) {
			search();
		});
			
function search(){
		
		
		firebase.database().ref().once("child_added", function(snapshot) {
			snapshot.forEach(function(childSnapshot){
			var uid = childSnapshot.key;
			var match = childSnapshot.val().match;
			if(uid!=firebase.auth().currentUser.uid){
				while(true){
					var obj=match.pop();
					if(obj==null) break;
					else{
						alert(obj.uid==firebase.auth().currentUser.uid);
					}
				}
			}
		});
		});
	}
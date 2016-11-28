var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);

	  firebase.auth().onAuthStateChanged(function(user) {
			readUserData(user.uid);
	  });

function readUserData(user){
	firebase.database().ref('Users/' + user).once('value').then(function(snapshot) {
		document.getElementById('firstName').innerHTML = snapshot.val().firstName;
		document.getElementById('lastName').innerHTML = snapshot.val().lastName;
		document.getElementById('gender').innerHTML = snapshot.val().gender;
		document.getElementById('driver').innerHTML = snapshot.val().driver;		
	});
}
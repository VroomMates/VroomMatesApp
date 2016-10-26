function AddInfo(){
		var userId = firebase.auth().currentUser.uid;
		var name = document.getElementById("name");
		var email = document.getElementById("email");
		var contact = document.getElementById("contact");
		var location = document.getElementById("location");
		
		writeUserData(userId,name,email,contact,location);
	}		
			
	function writeUserData(userId, name, email, contact, location) {
			
		firebase.database().ref('users/' + userId).set({
			email : document.getElementById("email")
			username: document.getElementById("name"),
			contact: document.getElementById("contact"),
			location: document.getElementById("location")
		});
	}
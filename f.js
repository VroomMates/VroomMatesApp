    var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);
    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
	  
	  var user = firebase.auth().currentUser;
	  regNewUser(email,user.uid);
	  
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-account-details').textContent = firebase.auth().currentUser.uid;
		  checkIfUserExists(uid);
		  //regNewUser(email,uid);
		  
          
        } 
      
      });
      // [END authstatelistener]
      //document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      //document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      //document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }
	
	function Redirect_sign_up() {
               window.location="sign_up.html";
            }
			
	function Redirect_login() {
               window.location="index.html";
            }	
			
	function Redirect_home() {
               window.location="home.html";
            }	
	
	
	
	function regNewUser(newemail,uid){
		
		firebase.database().ref('Users/'+ uid).set({
		email: newemail
		});			
	}
	
	var USERS_LOCATION = 'https://college-4ab84.firebaseio.com/Users';

	function userExistsCallback(uid, exists) {
	  if (exists) {
		alert('user ' + uid + ' exists!');
	  } else {
		alert('user ' + uid + ' does not exist!');
	  }
	}

	// Tests to see if /users/<userId> has any data. 
	function checkIfUserExists(uid) {
	  //var usersRef = new firebase(USERS_LOCATION);
	  var usersRef = new firebase.database().ref('Users/');
	  usersRef.child(uid).once('value', function(snapshot) {
		var exists = (snapshot.val() !== null);
		userExistsCallback(uid, exists);
	  });
	}
	
    window.onload = function() {
      initApp();
    };
	
	
	//USER INFO SCRIPT
	
	
	
	
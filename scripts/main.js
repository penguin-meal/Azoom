// Pop ups for login / register
// Get the link and popup elements
var loginLink = document.getElementById('login-btn');
var registerLink = document.getElementById('register-btn');
var loginPopup = document.getElementById('login-popup');
var registerPopup = document.getElementById('register-popup');
var closeLogin = document.getElementById('closeLogin');
var closeRegister = document.getElementById('closeRegister');

// only applicable when register is successful
var finalStepPopup = document.getElementById("final-step");
var closeFinalStep = document.getElementById("closeFinalStep");

// var & functions for buttons inside pop up
var loginToRegister = document.getElementById("login-sec-btn");
var registerToLogin = document.getElementById("register-sec-btn");

var loginStatus = false;

// prevent default form submission so i can use javascript to show hide more popups (and also prevent the link from adding more info with method="get")

loginToRegister.onclick = switchToRegister

function chkLoginStatus() {
  if (loginStatus == false) {
    alert("Please log in to proceed");
  }
}

function switchToRegister () {
  closeLoginF();
  showRegisterF();
}

registerToLogin.onclick = switchToLogin

function switchToLogin () {
  closeRegisterF();
  showLoginF();
}

// Show the login popup when the link is clicked
loginLink.onclick = showLoginF

function showLoginF () {
  loginPopup.style.display = 'block';
  document.body.classList.add('no-scroll'); // prevents scroll on body
}

// Show register popup when link is clicked
registerLink.onclick = showRegisterF

function showRegisterF () {
  registerPopup.style.display = 'block';
  document.body.classList.add('no-scroll'); // prevents scroll on body
}

// Hide the login popup when the close button (X) is clicked
closeLogin.onclick = closeLoginF

function closeLoginF() {
  if (loginPopup.style.display == 'block') {
    loginPopup.style.display = 'none';
    document.body.classList.remove('no-scroll'); // enables scroll
  }
}

//Hide register popup when the close button is clicked
closeRegister.onclick = closeRegisterF

function closeRegisterF () {
  if (registerPopup.style.display == 'block') {
    registerPopup.style.display = 'none';
    document.body.classList.remove('no-scroll'); // enables scroll
  }
}

//Hide final step popup when the close button is clicked
closeFinalStep.onclick = closeFinalStepF

function closeFinalStepF () {
  if (finalStepPopup.style.display == 'block') {
    finalStepPopup.style.display = 'none';
    document.body.classList.remove('no-scroll'); // enables scroll
  }
}


// toggles eye to show / hide password
var passwordType = document.getElementById("reg-password");
var passwordType2 = document.getElementById("reg-password2")
var eyeIcon = document.getElementById('eye-icon');
var eyeIcon2 = document.getElementById('eye-icon2');

eyeIcon2.addEventListener('click', function() {
  var currentSrc = eyeIcon2.src.split('/').pop();
  // Toggle the input type between password and text
  // show pw
  if (currentSrc == 'eye-close.svg') {
    eyeIcon2.src ='../icons/eye-open.svg';
    passwordType2.type = 'text';
  }
  else {
    eyeIcon2.src = '../icons/eye-close.svg';
    passwordType2.type = 'password';
  }
});

eyeIcon.addEventListener('click', function() {
  var currentSrc = eyeIcon.src.split('/').pop();
  // Toggle the input type between password and text
  // show pw
  if (currentSrc == 'eye-close.svg') {
    eyeIcon.src ='../icons/eye-open.svg';
    passwordType.type = 'text';
  }
  else {
    eyeIcon.src = '../icons/eye-close.svg';
    passwordType.type = 'password';
  }
});


//////////////////
// login validation
function chkLogin() {
  var emailLogin = document.getElementById('login-email').value;
  var passwordLogin = document.getElementById('login-password').value;

  document.getElementById('login-email-error').innerHTML = "";
  document.getElementById('login-password-error').innerHTML = "";

  if (emailLogin != "user@1234.com") {
    document.getElementById('login-email-error').innerHTML = "Email is not valid";
    if (passwordLogin != "user1234") {
      document.getElementById('login-password-error').innerHTML = "Password does not match";
    }
  } else if (passwordLogin != "user1234"){
      document.getElementById('login-password-error').innerHTML = "Password does not match"
  } else {
    loginStatus = true;
    closeLoginF();

    var loginNav = document.getElementById('login-nav');
    loginNav.style.display = "none";

    var newDiv = document.createElement('div');
    var icon = document.createElement('img');
    var username = document.createElement('p');
    var headerDiv = document.getElementById('header-div');

    icon.src = "../icons/profile-circle.svg";
    username.textContent = "user1234"

    newDiv.className = "user-div";
    username.className = "user-name";

    newDiv.appendChild(icon);
    newDiv.appendChild(username);
    headerDiv.appendChild(newDiv);
  }
}
  





// form submission check validation
function chkValidation(event) {
  //clears previous error msg
  document.getElementById("fNameError").innerHTML = "";
  document.getElementById("lNameError").innerHTML = "";
  document.getElementById("reg-emailError").innerHTML = "";
  document.getElementById("reg-passwordError").innerHTML = "";
  document.getElementById("reg-password2Error").innerHTML = "";
  document.getElementById("agreement-checkbox-error").innerHTML = "";
  var errorCounter = 0; // resets error counter to 0

  var fName = document.getElementById('fName').value;
  var lName = document.getElementById('lName').value;
  var email = document.getElementById('reg-email').value;
  var password = document.getElementById('reg-password').value;
  var password2 = document.getElementById('reg-password2').value;
  var agreementCheckbox = document.getElementById('agreement');
  var notMatch = false;
  

  if (fName.trim() == "") {
    document.getElementById("fNameError").innerHTML = "First name cannot be empty";
    errorCounter += 1;
  }

  if (lName.trim() == "") {
    document.getElementById("lNameError").innerHTML = "Last name cannot be empty";
    errorCounter += 1;
  }

  if (email.trim() == "") {
    document.getElementById("reg-emailError").innerHTML = "Email cannot be empty";
    errorCounter += 1;
  } else if (!/^(?=.*@)(?=.*\.).+$/.test(email)) {
    document.getElementById("reg-emailError").innerHTML = "Email format is invalid";
    errorCounter += 1;
  }

  if (password == "" || !/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(password)) {
    document.getElementById("reg-passwordError").innerHTML = "Minimum 8 characters, consisting of at least 1 number and 1 uppercase letter";
    errorCounter += 1;
    notMatch = true;
  }

  // if password match but does not meet the requirements
  if (password == password2 && notMatch == true) {
    document.getElementById("reg-password2Error").innerHTML = "Minimum 8 characters, consisting of at least 1 number and 1 uppercase letter"; 
  }

  if (password != password2 || password2.trim() == "" ) {
    document.getElementById("reg-password2Error").innerHTML = "Password does not match";  
    errorCounter += 1;
  }

  // checking for agreement checkbox if its checked
  if (!agreementCheckbox.checked) {
    document.getElementById("agreement-checkbox-error").innerHTML = "Please agree to the terms of use and privacy policy when registering"
    errorCounter+= 1;
  }

  if (errorCounter != 0) {
    return false;
  }
  event.preventDefault();
  registerSuccess();
  return false;
}

function registerSuccess() {

  console.log("success")
}

// store search on local storage
function submitSearch() {
  var pickUpLoc = document.getElementById("pickup-loc").value;
  var pickUpDate = document.getElementById("pickup-date").value;
  var returnDate = document.getElementById("return-date").value;

  if (!pickUpLoc || !pickUpDate || !returnDate) {
    alert("Please fill out all required fields.");
    return;
  }

  var bookingData = {
    pickuploc : pickUpLoc,
    pickupdate : pickUpDate,
    returndate : returnDate
  };

  localStorage.setItem('bookingData',JSON.stringify(bookingData));

  // redirect to booking.html
  window.location.href = 'booking.html';
}
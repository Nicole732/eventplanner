$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  const usernameInput = $("input#username-input");
  const interestInput = $("input#interest-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: usernameInput.val().trim(),
      interest: interestInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.name ||!userData.interest) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    // signUpUser(userData.email, userData.password,userData.name,userData.interest);
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    usernameInput.val("");
    interestInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  // function signUpUser(email, password,name,interest) {
  function signUpUser(userObj) {
    $.post("/api/signup", userObj)
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

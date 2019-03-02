function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
        console.log('Successfully logged in with Facebook');
         FB.api('/me?fields=name,first_name,picture.width(480)', changeUser(response));
  }
}

function changeUser(response) {
  FB.api('/me', 'GET', {fields: 'name,id,email,picture.width(480).height(480)'}, function(me) {
    $('#inputEmail3').val(me.email);
    $('#inputPassword3').val(me.id);
    $('#profileURL').val(me.picture);
    $('#submitSignIn').click();
  });
}

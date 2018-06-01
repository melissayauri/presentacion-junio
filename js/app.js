$(document).ready(function() {
 /* let $loginGoogle = $('#login-gmail');
  $loginGoogle.on('click', googleLogin);
  function googleLogin() {
    /* incorporando la autenticación por gmail 
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      let user = result.user;
      console.log(user);
      saveData(result.user);
     
      window.location.assign('../views/profile.html');
     
    });
  }

  const saveData = (user) =>{
    let users = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    };
    firebase.database().ref('usuarios/' + user.uid).set(users);


  };

  firebase.database().ref('usuarios').on('child_added', function(userInfo) {
    let users = userInfo.val();
    let name = users.name,
    separador = " ",
    onlyName = name.split(separador)[0];
    console.log(name);
    console.log(onlyName);
    let photo = users.photo
    console.log(photo)
    /* Bienvenida al usuario 
    let principalName = `<h5 class="white-text mg mg-top center-align">Hola, ${onlyName}</h5>`;
    let principalImage = ` <img src="${photo}" alt="" class="img-profile">`
    $('#root').append(principalName, principalImage);
    /* Sección del cv- profile 
    let profileImage = ` <img src="${photo}" alt="" class="img">`
    let fullName = `<p class=" center-align">${name}</p>`;
    $('#profile').append(profileImage, fullName);
  });
});*/

 
/* Incorporando iniciar sesión con Gmail */
 /* var provider = new firebase.auth.GoogleAuthProvider();
  $('#login-gmail').on('click', function() {
    alert('hola');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      
      var user = result.user;
      console.log(user);
      
    });
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
      // var name = $('#inputName').val();
      // localStorage.setItem('userName', name);
      window.location.href = '../views/profile.html';
    } else {
      console.log('usuario no logeado');
    }*/
  });

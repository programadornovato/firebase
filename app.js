
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBFgJ_abbrHfju-0uE70fIgeDb4zSuZI40",
    authDomain: "usuarios-bf872.firebaseapp.com",
    databaseURL: "https://usuarios-bf872.firebaseio.com",
    projectId: "usuarios-bf872",
    storageBucket: "",
    messagingSenderId: "296481844448",
    appId: "1:296481844448:web:e1a463f1e90a161e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var textoVerificado = "";
        if (emailVerified === false) {
            textoVerificado = "Email no verificado";
        }
        else {
            textoVerificado = "Email verificado";
        }
        var providerData = user.providerData;
        /*
        document.getElementById('login').innerHTML =
            `<p>Logueado ` + user.email + ` ` + textoVerificado + ` <p>
        <button  type="button" class="btn btn-danger" onclick="cerrar()">Cerra sesion</button>
    `;
        */
        document.getElementById("btnAcceso").style.display = "none";
        document.getElementById("checkLogin").style.display = "none";
        document.getElementById("areaRegistro").style.display = "none";
        document.getElementById("areaLogin").style.display = "";
        document.getElementById("btnCerrar").style.display = "";
        //document.getElementById('areaLogin').innerHTML = document.getElementById('areaLogin').innerHTML+ 
        //'<button id="btnCerrar" type="button" class="btn btn-danger" onclick="cerrar()">Cerra sesion</button>';
        document.getElementById('emailA').value=email;
        document.getElementById('passA').style.display = "none";
        console.log(user);
    } else {
        document.getElementById("btnAcceso").style.display = "";
        document.getElementById("checkLogin").style.display = "";
        document.getElementById("areaRegistro").style.display = "";
        document.getElementById("areaLogin").style.display = "none";
        document.getElementById('passA').style.display = "";
        document.getElementById("btnCerrar").style.display = "none";
    }
});

function enviar() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        })
        .then(function () {
            verificar();
        });
}
function verificar() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}
function acceso() {
    var emailA = document.getElementById('emailA').value;
    var passA = document.getElementById('passA').value;
    firebase.auth().signInWithEmailAndPassword(emailA, passA)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}
function cerrar() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Salir');
        })
        .catch(function (error) {
            console.log(error);
        })
}
$(document).ready(function () {
    $('#loginRestro').change(function () {
        if ($(this).is(':checked')) {
            $('#areaLogin').hide();
            $('#areaRegistro').show();
        }
        else {
            $('#areaLogin').show();
            $('#areaRegistro').hide();
        }
    });
});


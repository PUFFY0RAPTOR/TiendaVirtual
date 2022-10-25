console.log('Conectado');

var recib = localStorage.getItem('cookie');

function leerCookie(){
        //console.log(recib);
    
        if (recib == null || recib == "null") {
            console.log('No hay cookies');
        } else{
            console.log(recib);
        }
}

function autentication(){
    let nombre = document.getElementById('nombre').value;
    //let passw = document.getElementById('passw').value;

    let user = document.getElementById('usuario').value;

    console.log(user);
    
    if (nombre == user) {
        window.open('/productos');
    } else {
        //alert('No se ha iniciado sesión');
        console.log(no);
    }
}
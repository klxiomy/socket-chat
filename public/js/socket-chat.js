var socket = io();

//sirve para reconocer los parametros que vengan en la url
var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    //redirecciono a index.html
    window.location = 'index.html'
    throw new Error('El nombre y sala son necesario ')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp){  
        console.log('Usuario conectado' , resp);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cambio de usuarios, cuando un usuario entra y sale del chat
socket.on('listaPersona', function(personas) {

    console.log( personas);

});

//Mensajes Privados
socket.on('mensajePrivado', function(mensaje){
    console.log('Mensaje privado: ', mensaje);
})
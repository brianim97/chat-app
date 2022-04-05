let conectados = 0;
const socketController = (socket,io)=>{

        console.log('cliente conectado',socket.id);
        conectados++;

        socket.on('disconnect',()=>{
            console.log('User '+socket.id+' desconectado');
            conectados--;
            io.emit('usuarios-conectados',conectados)
        })
        socket.on('enviar-mensaje',({mensaje,user})=>{
            socket.broadcast.emit('enviar-mensaje',{mensaje,user});
        })

        io.emit('usuarios-conectados',conectados)
    
}

module.exports = {socketController}
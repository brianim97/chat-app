const socketController = (socket)=>{
   
        console.log('cliente conectado',socket.id);
        socket.on('disconnect',()=>{
            console.log('User '+socket.id+' desconectado');
        })
        
        
        socket.on('enviar-mensaje',(mensaje)=>{
            socket.broadcast.emit('enviar-mensaje',mensaje);
        })
    
}

module.exports = {socketController}
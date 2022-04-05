window.onload = ()=>{
    const user = document.querySelector('#user');
    const lblStatus = document.querySelector('#lblStatus')
    const usuariosConectados = document.querySelector('#usuariosConectados')
    const txtMensaje = document.querySelector('#txtMensaje')
    const btnEnviar = document.querySelector('#btnEnviar')
    const containerChat = document.querySelector('#container-chat')

  
    
    if(localStorage.getItem('nombre')){
        user.textContent = localStorage.getItem('nombre');
    }
    const socket = io();
    
    
    socket.on('connect',()=>{
        console.log('conectado');
        lblStatus.innerHTML="<span class='text-success fw-bold'>Online</span>";
    })
    socket.on('disconnect',()=>{
        console.log('desconectado');
        lblStatus.innerHTML="<span class='text-danger fw-bold'>Offline</span>"
        
    })
    
    const enviarMensaje = (value)=>{
    if(value.trim() == '')return
    const mensaje = txtMensaje.value;
    socket.emit('enviar-mensaje',{mensaje,user:user.textContent})
    let h5 = document.createElement('h5')
    h5.classList.add('h5','send')
    h5.innerHTML = mensaje
    let div = document.createElement('div')
    div.classList.add('justify-content-end','d-flex','mt-1','align-items-end')
    crearSpanHora(h5,true);
    div.appendChild(h5)
    containerChat.appendChild(div)
    txtMensaje.value = ''
    window.scrollTo(0,h5.offsetTop)
}
btnEnviar.addEventListener('click',()=>{
    enviarMensaje(txtMensaje.value)
})
txtMensaje.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter'){
        enviarMensaje(txtMensaje.value)
    }
    if(!localStorage.getItem('nombre')){
        let nombre = prompt('Ingresa tu nombre para continuar, no te preocupes que tu nombre solo quedarar guardado en este navegador 🤗');
        localStorage.setItem('nombre',nombre)
        user.textContent = nombre;
    }
})



socket.on('enviar-mensaje',({mensaje,user})=>{
    let spanUser = document.createElement('span');
    spanUser.textContent = user;
    let h5 = document.createElement('h5')
    h5.classList.add('h5','recibe')
    h5.innerHTML = mensaje
    let div = document.createElement('div')
    div.classList.add('d-flex','flex-column','mt-1','align-items-start')
    crearSpanHora(h5,false);
    div.appendChild(spanUser)
    div.appendChild(h5)
    containerChat.appendChild(div)
    window.scrollTo(0,h5.offsetTop)
    
})

socket.on('usuarios-conectados',(cantidad)=>{
    usuariosConectados.textContent = cantidad
})

function crearSpanHora(h5,end){
    let spanHora = document.createElement('span')
    spanHora.style.display = 'block';
    spanHora.style.fontSize = '12px'
    if(end){
        spanHora.classList.add('small','text-secondary','text-end','mt-1')
    }else{
        spanHora.classList.add('small','text-light','mt-1')
    }
    let hoy = new Date(); 	
    spanHora.textContent = hoy.getHours() + ':' + hoy.getMinutes()
    h5.appendChild(spanHora)
}


}
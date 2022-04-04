const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')
const containerChat = document.querySelector('#container-chat')


const socket = io();


socket.on('connect',()=>{
    console.log('conectado');
    lblOffline.style.display = 'none'
    lblOnline.style.display = 'block'
})
socket.on('disconnect',()=>{
    console.log('desconectado');
    lblOnline.style.display = 'none'
    lblOffline.style.display = 'block'
})

const enviarMensaje = (value)=>{
    if(value.trim() == '')return
        const mensaje = txtMensaje.value;
        socket.emit('enviar-mensaje',mensaje)
        let h5 = document.createElement('h5')
        h5.classList.add('h5','send')
        h5.innerHTML = mensaje
        let div = document.createElement('div')
        div.classList.add('justify-content-end','d-flex','mt-1')
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
})


socket.on('enviar-mensaje',(mensaje)=>{
    let h5 = document.createElement('h5')
    h5.classList.add('h5','recibe')
    h5.innerHTML = mensaje
    let div = document.createElement('div')
    div.classList.add('d-flex','mt-1')
    div.appendChild(h5)
    containerChat.appendChild(div)
    window.scrollTo(0,h5.offsetTop)

})


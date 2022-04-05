window.onload = ()=>{
    let mail = document.querySelector('#mail').value;
    let nombre = document.querySelector('#nombre').value;
    let btnValidar = document.querySelector('#btnValidar')

    const comprobarCampos = ()=>{
        
    }
    btnValidar.addEventListener('click',(e)=>{
        e.preventDefault();
        fetch('http://localhost:3001/ingreso',{
            method:'post',
            body:JSON.stringify({mail,nombre})
        })
        
    })

    
}
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { socketController } = require('./sockets/controller');

const app = express();
const port= process.env.PORT;
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
})

//Parseo y lectura del body
app.use(express.json());
//CORS
app.use(cors());
//Directorio publico

app.use(express.static('public'));

// app.use('/ingreso',require('./routes/users'));


app.get('/*',(req,res)=>{
    res.json({msg:'File not found'})
})
const socket = ()=>{
    io.on('connection',(socket)=>socketController(socket,io))
}

socket();

server.listen(port,()=>{
    console.log(`SERVER ON: http://localhost:${port}/`);
});



    


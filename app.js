const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { socketController } = require('./sockets/controller');

        const app = express();
        const port= process.env.PORT;
        const server = require('http').createServer(app);
        const io = require('socket.io')(server)
        //Conexion a la base de datos
        //Middlewares
        //CORS
        app.use(cors());
        //Parseo y lectura del body
        app.use(express.json());
        //Directorio publico
        const socket = ()=>{
            io.on('connection',socketController)
        }
        socket()
        app.use(express.static('public'))
        server.listen(port,()=>{
                 console.log(`SERVER ON: http://localhost:${port}/`);
         });

        
     
    

      



      

    

   

   
    

    // routes(){
    //     this.app.use(this.paths.users,require('../routes/user'));
    //     this.app.use(this.paths.auth,require('../routes/auth'));
    //     this.app.use(this.paths.categories,require('../routes/categories'));
    //     this.app.use(this.paths.products,require('../routes/products'));
    //     this.app.use(this.paths.find,require('../routes/find'));
    //     this.app.use(this.paths.uploads,require('../routes/uploads'));
    // }


    


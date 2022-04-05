const {Schema,model} = require('mongoose');

const ChatUserSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es requerido']
    },
    mail:{
        type:String,
        unique:true,
        required:[true,'El mail es requerido']
    }
})

module.exports = model('ChatUser',ChatUserSchema)
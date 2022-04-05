const {request,response} = require('express');
const ChatUser = require('../model/user');

const usersPost = async(req = request, res = response)=>{
    console.log('entre');
    const {nombre,mail} = req.body;

    const userDb = await ChatUser.findOne({mail})

    if(!userDb){
        return res.status(400).json({msg:"Error, el mail ya se encuentra en uso"})
    }

    const user = new ChatUser({nombre,mail})

    await user.save();

    res.json({
        user
    })

}

module.exports = {usersPost}
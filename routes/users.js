const {Router} = require('express');
const { check } = require('express-validator');
const { usersPost } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();
router.get('/',(req,res)=>{
    res.json({msg:"get"})
})

router.post('/',[
    check('nombre','El nombre no puede estar vacío').not().isEmpty(),
    check('mail','Se necesita un mail válido').isEmail(),
    validarCampos
],usersPost)

module.exports = router
const express = require('express');
const router = express.Router();

//Controlador
const userController = require('../controllers/userController');

//Rutas
//locahost:3000/user/

router.get('/', userController.get);

router.get('/:id',userController.getById);

router.put('/', userController.update);

router.post('/login', userController.login);

router.post('/registrar', userController.register);

module.exports=router

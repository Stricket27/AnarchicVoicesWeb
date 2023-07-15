const express = require('express');
const router = express.Router();

//Controlador
const tipoUsuarioController = require('../controllers/tipoUsuarioController');

//Rutas
//locahost:3000/user/

router.get('/', tipoUsuarioController.get);

router.post('/', tipoUsuarioController.create);

router.get('/:id',tipoUsuarioController.getById);

router.put('/', tipoUsuarioController.update);

module.exports=router
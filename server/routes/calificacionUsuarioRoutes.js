const express = require('express');
const router = express.Router();

//Controlador
const calificacionUsuarioController = require('../controllers/calificacionUsuarioController');

//Rutas
//locahost:3000/calificacionUsuario/

router.get('/', calificacionUsuarioController.get);

router.post('/', calificacionUsuarioController.create);

router.get('/:id',calificacionUsuarioController.getById);

router.put('/', calificacionUsuarioController.update);

module.exports=router
const express = require('express');
const router = express.Router();

//Controlador
const direccionController = require('../controllers/direccionController');

//Rutas
//locahost:3000/calificacionUsuario/

router.get('/', direccionController.get);

router.post('/', direccionController.create);

router.get('/:id',direccionController.getById);

router.put('/', direccionController.update);

module.exports=router
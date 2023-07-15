const express = require('express');
const router = express.Router();

//Controlador
const categoriaController = require('../controllers/categoriaController');

//Rutas
//locahost:3000/calificacionUsuario/

router.get('/', categoriaController.get);

router.post('/', categoriaController.create);

router.get('/:id',categoriaController.getById);

router.put('/', categoriaController.update);

module.exports=router
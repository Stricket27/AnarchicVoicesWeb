const express = require('express');
const router = express.Router();

//Controlador
const calificacionUsuarioController = require('../controllers/calificacionUsuarioController');

router.get('/vUsuarioTop3', calificacionUsuarioController.getCalificacionUsuarioTop3);

router.get('/vUsuarioTop5', calificacionUsuarioController.getCalificacionUsuarioTop5);

router.get('/', calificacionUsuarioController.get);

router.post('/', calificacionUsuarioController.create);

router.get('/:id',calificacionUsuarioController.getById);

router.put('/:id', calificacionUsuarioController.update);

module.exports=router

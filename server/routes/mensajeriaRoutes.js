const express = require('express');
const router = express.Router();

//Controlador
const mensajeriaController = require('../controllers/mensajeriaController');

//Rutas

router.get('/', mensajeriaController.get);

router.post('/', mensajeriaController.create);

router.get('/:id',mensajeriaController.getById);

router.put('/', mensajeriaController.update);



module.exports=router

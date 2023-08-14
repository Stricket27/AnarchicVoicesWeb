const express = require('express');
const router = express.Router();

//Controlador
const tipoPagoController = require('../controllers/tipoPagoController');

//Rutas
//locahost:3000/user/

router.get('/', tipoPagoController.get);

// router.post('/', tipoPagoController.create);

router.get('/:id',tipoPagoController.getById);

// router.put('/', tipoPagoController.update);

module.exports=router
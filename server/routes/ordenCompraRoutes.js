const express = require('express');
const router = express.Router();

//Controlador
const ordenCompraController = require('../controllers/ordenCompraController');

//Rutas


router.get('/', ordenCompraController.get);

router.post('/', ordenCompraController.create);

router.get('/:id', /*auth.grantRole(["Administrador", "Vendedor"]),*/ ordenCompraController.getById);

router.put('/', ordenCompraController.update);

module.exports=router
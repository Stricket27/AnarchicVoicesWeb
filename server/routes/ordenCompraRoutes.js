const express = require('express');
const router = express.Router();

//Controlador
const ordenCompraController = require('../controllers/ordenCompraController');

//Rutas


router.get('/', ordenCompraController.get);

router.post('/', ordenCompraController.create);

router.put('/', ordenCompraController.update);

router.get("/vProductoTop", ordenCompraController.getVentaProductoTop);

router.get("/vProducto/:mes", ordenCompraController.getVentaProductoMes);

router.get('/:id', ordenCompraController.getById);

module.exports=router

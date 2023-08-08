const express = require('express');
const router = express.Router();

const fotografiaController = require("../controllers/fotografiaController");

router.get ('/', fotografiaController.get)

router.post('/', fotografiaController.create);

router.get('/:id',fotografiaController.getById);

router.put('/:id', fotografiaController.update);

router.put('/eliminarFoto/:id', fotografiaController.EliminarFotografias);

module.exports=router

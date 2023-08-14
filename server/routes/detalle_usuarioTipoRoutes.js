const express = require('express');
const router = express.Router();

//Controlador
const detalle_usuarioTipoController = require('../controllers/detalle_usuarioTipoController');

//Rutas
//locahost:3000/calificacionUsuario/

router.get('/', detalle_usuarioTipoController.get);



module.exports=router

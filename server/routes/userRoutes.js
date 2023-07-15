const express = require('express');
const router = express.Router();

//Controlador
const userController = require('../controllers/userController');

//Rutas
//locahost:3000/user/

router.get('/', userController.get);

router.post('/', userController.create);

router.get('/:id',userController.getById);

router.put('/', userController.update);

module.exports=router
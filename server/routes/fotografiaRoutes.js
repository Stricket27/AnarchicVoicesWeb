const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('processing')
      cb(null, "uploads"); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
  });
  
  const upload = multer({ storage: storage }).single('file');

const fotografiaController = require("../controllers/fotografiaController");
const { error } = require('console');

router.get ('/', fotografiaController.get)

router.post('/', fotografiaController.create);

router.post('/create', (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            // Si ocurre un error durante la carga del archivo
            return res.status(500).json({ message: 'Error al cargar el archivo', error: error });
        }
        // Si la carga del archivo fue exitosa
        return res.status(200).json({ fileName: req.file.filename});
    });
  });

router.get('/:id',fotografiaController.getById);

router.put('/:id', fotografiaController.update);

router.put('/delete/:id', fotografiaController.deleteFoto);

module.exports=router

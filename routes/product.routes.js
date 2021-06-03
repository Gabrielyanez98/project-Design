const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

let path = require('path');
let Producto = require('../models/producto');

const upload = multer({
  storage: multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  }
}),
limits: {
  fileSize: 100000000 // max file size in bytes
},
fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
    return cb(
      new Error(
        'Archivos solamente disponibles en formato jpg, jpeg, png format.'
      )
    );
  }
  cb(undefined, true); // continue with upload
}
});

router.get('/upload', async (req, res) => {
  try {
    const producto = await Producto.find();
  res.send(producto)
  } catch (error) {
    res.status(400).send('Error al descargar las imágenes de los productos, por favor inténtelo más tarde');
  }
});

router.post("/api/photo/upload", upload.single('photo'), async (req, res) => {
     try{
       console.log(req.file)
      const {nameProduct, productType, price, place} = req.body
      const  { filename, mimetype }  = req.file
      const newProducto = new Producto({
        nameProduct,
        productType,
        price,
        place,
        file_name: filename,
        file_mimetype: mimetype   
      })
      await newProducto.save()
      res.send('Archivo enviado correctamente');
     }
     catch(err){
       console.error(error)
     }   

});

module.exports = router;

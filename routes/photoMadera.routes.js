/*const {Router} = require('express');
const path = require('path');
const multer = require('multer');
const router = Router();
const fs = require('fs');

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/uploads'),
    filename: (req,file,cb)=> {
        cb(null, file.originalname);
    }
})

router.get('/upload', (req,res)=> {
    const uploadsDiretory = path.join('public/uploads');

    fs.readdir(uploadsDiretory, (err, files)=> {
      if(err){
        return res.json({msg: err})
      }
      if(files.length === 0){
        return res.json({msg:'No Images Uploaded!'})
      }
  
      return res.json({files})
    })
});

var upload = multer({storage, dest: "../public/uploads" });
router.post("/api/photo/upload", upload.single("photo"), (req, res) => {
    try {    
      if (req.file) {
        res.send(req.file)
        console.log(req.file);
      } else {
        res.status(400).send({
          status: false,
          data: "File Not Found :(",
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

)

module.exports = router;*/


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
  fileSize: 1000000 // max file size 1MB = 1000000 bytes
},
fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
    return cb(
      new Error(
        'only upload files with jpg, jpeg, png format.'
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
    res.status(400).send('Error while getting list of files. Try again later.');
  }
  //

  /*const uploadsDiretory = path.join('public/uploads');

  fs.readdir(uploadsDiretory, (err, files) => {
    if (err) {
      return res.json({ msg: err })
    }
    if (files.length === 0) {
      return res.json({ msg: 'No Images Uploaded!' })
    }

    return res.json({ files })
  })*/
});

/*router.get('/products', async (req,res)=>{
  const producto = await Producto.find();
  res.send(producto)
})*/

router.post("/api/photo/upload", upload.single('photo'), async (req, res) => {
  /*
   const { title, description } = req.body;
    const { path, mimetype } = req.file;
    const file = new File({
      title,
      description,
      file_path: path,
      file_mimetype: mimetype
      */
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
      res.send('file uploaded successfully.');
     }
     catch(err){
       console.error(error)
     }
      


});

module.exports = router;

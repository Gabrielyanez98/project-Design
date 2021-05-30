const {Router} = require('express');
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
router.post("/api/photo/upload", upload.single("file"), (req, res) => {
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

module.exports = router;
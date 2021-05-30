const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const dotenv =  require('dotenv').config();
const { mongoose} = require('./database');
const authorRouter = require('./routes/author.routes');
const multer = require('multer');






app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 


// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());



// Routes
app.use("/api/auth", authorRouter);
//app.use('/api/producto', require('./routes/producto.routes'));
//app.use('/api/author', require('./routes/author.routes'));
app.use('/api/shopper', require('./routes/shopper.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use(require('./routes/photoMadera.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));


/*
app.get('/upload', (req, res) => {
  const uploadsDiretory = path.join('public/uploads');

  fs.readdir(uploadsDiretory, (err, files)=> {
    if(err){
      return res.json({msg: err})
    }
    if(files.length === 0){
      return res.jsoin({msg:'No Images Uploaded!'})
    }

    return res.json({files})
  })

});



app.post("/api/photo/upload", upload.single("file"), (req, res) => {
    try {    
      if (req.file) {
        res.send({
          status: true,
          message: "File Uploaded!",
        });
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
  });
*/
  

//app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
})
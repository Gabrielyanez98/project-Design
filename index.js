const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');

const dotenv =  require('dotenv').config();

const { mongoose} = require('./database');
const authorRouter = require('./routes/author.routes');

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use("/api/auth", authorRouter);
app.use('/api/producto', require('./routes/producto.routes'));
//app.use('/api/author', require('./routes/author.routes'));
app.use('/api/shopper', require('./routes/shopper.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
// Static files



//app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
})
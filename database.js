// Este archivo nos va a permitir conectar a la base de datos
// Lo utilizaremos luego en el file index.js (el del servidor)
//require('dotenv').config();

const mongoose = require('mongoose');
const URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@test.qoxab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
   .then (db => console.log('MongoDB is connected!'))
   .catch (error => console.error(error));

module.exports = mongoose;
const mongoose = require('mongoose');

const { Schema } = mongoose;

//const Author = mongoose.model('Author');

const ProductoSchema = new Schema ({
    
    nameProduct: String,
    productType: String,
    price: Number,
    place: String,
  
   
})

module.exports = mongoose.model('Producto', ProductoSchema)
const mongoose = require('mongoose');

const { Schema } = mongoose;

//const Author = mongoose.model('Author');

const ProductoSchema = new Schema ({
    
    nameProduct: 
    {
        type: String,
        trim: true,
        required: true,
        
    },
    productType: 
    {
        type: String,
        trim: true,
        required: true,
        
    },
    price: 
    {
        type: Number,
        trim: true,
        required: true,
        
    },
    place: 
    {
        type: String,
        trim: true,
        required: true,
        
    },
    file_name: {
        type: String,
        required: true
    },
    file_mimetype: {
        type: String,
        required: true
    }
    
  
   
},
    {
    timestamps: true
    }
)

module.exports = mongoose.model('Producto', ProductoSchema)
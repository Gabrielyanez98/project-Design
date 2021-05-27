const mongoose = require('mongoose');


const { Schema} = mongoose;

const contactSchema = new Schema({
    gmail: String,
    phone: Number,
    textArea: String

})

module.exports = mongoose.model('Contact', contactSchema );
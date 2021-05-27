const mongoose = require('mongoose');

const { Schema} = mongoose;

const CompradorSchema = new Schema ({
    name: String,
    surname: String,
    place: String,
    phone: Number,
    gmail: String,
    user: String,
    password: String,
    likes: String,
    bankAccount: Number
});

module.exports = mongoose.model('Shopper', CompradorSchema);
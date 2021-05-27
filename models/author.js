const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;



const AuthorSchema = new Schema ({
   
    name: String,
    surname: String,
    phone: Number,
    gmail: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    place: String,
    user: String,
    password: {
        type: String,
        trim: true,
        required: true,
        
    },
    bankData: Number,
    photo: String,
    productsSold: Number,
    score: Number,
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto"
    }
});

AuthorSchema.pre("save", function (next) {
    if (!this.isNew || !this.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;

            next();
        });
    });
});

module.exports = mongoose.model('Author', AuthorSchema)
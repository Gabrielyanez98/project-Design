const express = require('express');
const authorRouter = express.Router();
const bcrypt = require('bcrypt');
const Author = require('../models/Author');
const jwt = require('jsonwebtoken');
const {env: {JWT_SECRET}} = process;
const {checkToken} = require('../middleware');




authorRouter.get('/', async(req, res) => {
    const author = await Author.find();
    res.json(author)
})

authorRouter.post('/signin', async (req, res) => {
    const { name,
        surname,
        phone,
        gmail,
        place,
        password,
        bankData,
        photo} = req.body;
   
    if(!gmail || !password){
        return res.status(403).send({
            success: false,
            message: "El gmail y la contraseña son campos obligatorios"
        });
        
    }

    const foundUser = await Author.findOne({gmail});

    if(foundUser){
        return res.status(403).send({
            success: false,
            message: "Este gmail ya existe"
        });
    }

    if(password.length < 6){
        return res.status(403).send({
            success: false,
            message: "Contraseña demasiado corta (mínimo 6 carácteres)."
        });
    }

    let author = new Author({
        name,
        surname,
        phone,
        gmail,
        place,
        password,
        bankData,
        photo
    })

    let newAuthor = await author.save();

     //Token

    const token = jwt.sign({id: newAuthor._id}, JWT_SECRET, {expiresIn: "24h"});

    return res.status(201).send({
        success: true,
         token,
         
    });

    
});

authorRouter.post("/login", async(req, res) => {

    const { name,surname, phone, gmail, place, username, password, bankData,photo, productsSold, score, productsId} = req.body

    if(!gmail || !password){
        return res.status(403).send({
            success: false,
            message: "Todos los campos son obligatorios"
        });
    }

    const foundUser = await Author.findOne({gmail});

    if(!foundUser){
        return res.status(404).send({
            success: false,
            message: "Contraseña incorrecta"
        });
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if(!match){
        return res.status(403).send({
            success: false,
            message: "Contraseña incorrecta"
        });
    }

    //Token
    const token = jwt.sign({id: foundUser._id}, JWT_SECRET, {expiresIn: "24h"});
    

    return res.status(201).send({
        success: true,
        token
    });
});



authorRouter.delete('/:id', async (req, res) => {
    await Author.findByIdAndRemove(req.params.id);
    res.json({status: 'Autor eliminado'})
})

module.exports = authorRouter;
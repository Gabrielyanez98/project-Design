const express = require('express');
const authorRouter = express.Router();
const bcrypt = require('bcrypt');
const Author = require('../models/Author');
const jwt = require('jsonwebtoken');
const {env: {JWT_SECRET}} = process;
const {checkToken} = require('../middleware');


/*
authorRouter.get('/',checkToken, (req, res) => {
      Author.find({}, (err,authors) => {
        if(err){
            return res.status(400).send(err);
        }
        return res.send(authors);
      }).populate("products").exec((err, author)=> {
        
    });
});

authorRouter.get('/:id', async (req, res) => {
    const filterAuthor = await Author.findById(req.params.id);
    res.json(filterAuthor);
});*/

authorRouter.get('/', async(req, res) => {
    const author = await Author.find();
    res.json(author)
})

authorRouter.post('/signin', async (req, res) => {
    const { name,surname, phone, gmail, place, user, password, bankData,photo, productsSold, score, productsId} = req.body;
    /*const newAuthor = new Author ({
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        gmail: req.body.gmail,
        place: req.body.place,
        user: req.body.user,
        password: req.body.password,
        bankAccount: req.body.bankAccount,
        productsSold: req.body.productsSold,
        score: req.body.score,
        name,
        surname,
        phone, 
        gmail,
        place,
        user, 
        password, 
        bankData, 
        photo,
        productsSold, 
        score,
        products: productsId

    });*/
   
    if(!gmail || !password){
        return res.status(403).send({
            success: false,
            message: "Enter all credentials."
        });
        
    }

    const foundUser = await Author.findOne({gmail});

    if(foundUser){
        return res.status(403).send({
            success: false,
            message: "User already exists."
        });
    }

    if(password.length < 6){
        return res.status(403).send({
            success: false,
            message: "Password too short (min.6)."
        });
    }

    let author = new Author({
        gmail,
        password
    })

    let newAuthor = await author.save();

     //Token

    const token = jwt.sign({id: newAuthor._id}, JWT_SECRET, {expiresIn: "24h"});

    return res.status(201).send({
        success: true,
         token
    });

    
});

authorRouter.post("/login", async(req, res) => {

    const { name,surname, phone, gmail, place, username, password, bankData,photo, productsSold, score, productsId} = req.body

    if(!gmail || !password){
        return res.status(403).send({
            success: false,
            message: "Enter all credentials."
        });
    }

    const foundUser = await Author.findOne({gmail});

    if(!foundUser){
        return res.status(404).send({
            success: false,
            message: "Wrong credentials."
        });
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if(!match){
        return res.status(403).send({
            success: false,
            message: "Wrong credentials."
        });
    }

    //Token
    const token = jwt.sign({id: foundUser._id}, JWT_SECRET, {expiresIn: "24h"});
    

    return res.status(201).send({
        success: true,
        token
    });
});

authorRouter.put('/:id', async (req, res) => {

    const { name, surname, phone, gmail, place, user, password, bankData, photo, productsSold,score} = req.body;
    const newAuthor = { name, surname, phone, gmail, place, user, password, bankData,photo, productsSold,score };
    await Author.findByIdAndUpdate(req.params.id, newAuthor);
    res.json({status: 'Autor actualizado'})

});

authorRouter.delete('/:id', async (req, res) => {
    await Author.findByIdAndRemove(req.params.id);
    res.json({status: 'Autor eliminado'})
})

module.exports = authorRouter;
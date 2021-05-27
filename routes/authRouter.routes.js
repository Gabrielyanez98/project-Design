const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {env: {JWT_SECRET}} = process;
const {checkToken} = require('../middleware');




authRouter.post("/signup", async (req,res) => {
    const {gmail, password} = req.body;
      
    if(!gmail || !password){
        return res.status(403).send({
            success: false,
            message: "Enter all credentials."
        });
        
    }

    const foundUser = await User.findOne({gmail});

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

    let user = new User({
        gmail,
        password
    })

    let newUser = await user.save();

     //Token

    const token = jwt.sign({id: foundUser._id}, JWT_SECRET, {expiresIn: "24h"});

    return res.status(201).send({
        sucess: true,
        user: newUser
    });

   
    

});

authRouter.post("/login", async(req, res) => {

    const {gmail, password} = req.body;

    if(!gmail || !password){
        return res.status(403).send({
            success: false,
            message: "Enter all credentials."
        });
    }

    const foundUser = await User.findOne({gmail});

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

module.exports = authRouter;
const express = require('express')
const router = express.Router();

const bcrypt = require('bcrypt');

const { body,validationResult } = require('express-validator');

const userModel = require('../models/userModel');


router.get('/',(req,res)=>{
    res.render('index');
})

router.post('/index', 

    body('Email').trim().isEmail().isLength({min:6}),
    body('Username').trim().isLength({min:3}),
    body('Passward').trim().isLength({min:4}),

      async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid Data'
            })
        }
        const {Username, Email, Passward} = req.body

        const hashPassward = await bcrypt.hash(Passward,10);      //npm i bcrypt 

        const newUser = await userModel.create({
            Username,
            Email,
            Passward:hashPassward
        })

        res.json(newUser);


    //    res.send("User registered")
})

module.exports = router;

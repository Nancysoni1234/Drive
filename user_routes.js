const express = require('express')
const router = express.Router();

const bcrypt = require('bcrypt');

const { body,validationResult } = require('express-validator');

const userModel = require('../models/userModel');

const jwt = require('jsonwebtoken');      //Generate token


router.get('/register',(req,res)=>{
    res.render('register'); 
})

router.post('/register', 

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

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',
    body('Username').trim().isLength({min:3}),
    body('Passward').trim().isLength({min:4}),
    async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){                //if found error then run this
            return res.status(400).json({
                error:error.array(),
                message:"Invalid Data"
            })
        }                     
        const{Username, Passward} = req.body;   // if no error found then run this

        const user = await userModel.findOne({
            Username:Username})

            if(!user){
                return res.status(400).json({
                    message:"Username or Passward is incorrect!"
                })
            }

            const isMatch = await bcrypt.compare(Passward, user.Passward);

            if(!isMatch){
                return res.status(400).json({
                    message:"Username or Passward is incorrect!"
                })
            }

            //If Username and passward matches then we generate the token
            //npm i jsonwebtoken

            const token = jwt.sign({
                userId : user._id,
                Username : user.Username,
                Emial:user.Email
            },
            process.env.JWT_SECRET,
        )

        //Tokens are saved in cookies(inside cookies)
        //install <--- npm i cookie-parser
        res.cookie('token',token) 

        res.send('Logged in');


    }

    
)

module.exports = router;

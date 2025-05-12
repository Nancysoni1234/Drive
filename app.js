const express = require('express');
const app = express();
const userRouter = require('./routes/user_routes');

const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();

//to see the console value in terminal we need these middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use('/user',userRouter);

app.listen(3000);

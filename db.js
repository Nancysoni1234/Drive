const mongoose = require('mongoose');

function connectToDB (){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('Connected to Database');
    })
}

module.exports = connectToDB;

const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,"Username should be atleast 3 character"]
    },

    Email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        lowercase:true,
        minlength:[8,"Email atleast 8 character"]
    },

    Passward:{
        type:String,
        trim:true,
        required:true,
        minlength:[5,"Passward atleast 6 character"]

    }

})

const user = mongoose.model('user',UserSchema)

module.exports = user;

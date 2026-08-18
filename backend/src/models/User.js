const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required: true,
        unique :true,
        trim : true,
        lowercase:true
    },

    passwordHash : {
        type : String,
        required: true
    },

    role : {
        type: String,
        enum : ["USER", "CREATOR", "ADMIN"],
        default: "USER"
    },

    ign :{
        type: String,
        //required: true,
        trim : true
    },

    igid :{
        type: String,
        //required: true
        trim: true
    },

    firstName:{
        type: String,
        trim : true
    },

    middleName:{
        type: String,
        trim : true
    },
    
    lastName:{
        type: String,
        trim : true
    },

    email:{
        type: String,
        lowercase: true,
        trim: true
    }
},
    {
        timestamps: true
    }

);

// returns a model "User" & saves a collection named "users"
const User = mongoose.model("User", userSchema); 

module.exports = User;
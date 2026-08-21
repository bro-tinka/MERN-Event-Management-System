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
        enum : ["USER", "CREATOR", "ADMIN", "OWNER"],
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

    name:{
        type: String,
        trim : true,
        required: true
    },

    email:{
        type: String,
        lowercase: true,
        required: true,
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
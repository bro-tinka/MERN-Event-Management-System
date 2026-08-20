
const jwt = require("jsonwebtoken");


const generateToken = (userId)=>{

    const token = jwt.sign(

        {userId : userId.toString()},       //1.payload

        process.env.JWT_SECRET,             //2.secret

        {                                   //3.options
            expiresIn: process.env.JWT_EXPIRES_IN || "7d", 
            algorithm : "HS256"
        }
    );

    return token; // complete token : header.payload.signature
}


module.exports = generateToken;

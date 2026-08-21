// Task :
// if Valid Signature: Asssign the req.userID to the request Body & do the  next() task
// ELSE             :  throw Auth error !

const jwt = require("jsonwebtoken");
const User = require("../models/User.js");


const authenticate = async (req,res, next) =>{
    
    // step 1: extract the header : from HTTP REQUEST
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({
            success: false,
            message: "Authentication token is requireddd!"
        })
    }

    // step 2: split the header into schema : Bearer & token : JWT Token
    
    const [schema, token] = authHeader.split(" ");
    
    if(scheme !== "Bearer" || !token){
        return res.status(401).json({
            success: false,
            message: "Invalid Authorization header"
        });
    }
    
    // step 3: verify the JWT Token

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns payload

        // a) find the user 
        const user = await User.findById(decoded.userId).select("-passwordHash");
        
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Bad request: user for this token no longer Existtt!"
            });
        }

        // b) attach  the user to req body 
        req.user = user;    // attach user object to req
        next();             // continue next=next task
    }


    catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Authentication tokennn!"
        })
    };
}


module.exports = authenticate;

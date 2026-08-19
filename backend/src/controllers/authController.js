const bcrypt  = require("bcrypt");
const User  = require("../models/User.js");
const generateToken = require("../utils/generateToken.js");




const registerUser = async(req,res)=>{
    try{

        const {username, password, ign, igid} = req.body;

        if(
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof ign !== "string"      ||
            typeof igid !== "string"     ||
            !username.trim()             ||
            !password                    ||
            !ign.trim()                  ||
            !igid.trim()                 
        ){
            return res.status(400).json({
                success: false,
                message: "Invalid one or more credentials. Check Againnn..."
            });
        }

        if(password.length <8){
            return res.status(400).json({
                success: false,
                message: "Password cant be less than 8 characterssssss!"
            })
        }

        const normalizedUsername = username.trim();
        const normalizedIGN = ign.trim();
        const normalizedIGID = igid.trim();

        const existingUser = await User.findOne({
            $or: [
                {username: normalizedUsername},
                {igid : normalizedIGID}
            ]
        });


        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "username or the player with same IGID is already registered"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: normalizedUsername,
            passwordHash: passwordHash,
            role : "USER",
            ign : normalizedIGN,
            igid: normalizedIGID
        });

        return res.status(201).json({
            success: true,
            message: "User created Successfullyyyyyy",
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                ign: user.ign,
                igid : user.igid
            }
        });

    }


    catch(error){
        
        if(error.code === 11000){
            return res.status(400).json({
                success: false,
                message: "Duplication Protection Errrr: username or the player with same IGID is already registered" 
            });
        }

        console.log("REGISTER USER ERRORRR: ", error);


        return res.status(500).json({
            success: false,
            message: "Unable to register Userrrr"
        })
    }
};





const loginUser = async(req,res) =>{
    
    try{
        // step 1: check any user with such req.username or req.ign
        const {username, password} = req.body;

        if(
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username.trim()  ||
            !password
        ){
            return res.status(400).json({
                success: false,
                message: "Enter Username & password fields..."
            });
        }

        const user = await User.findOne({ username: username.trim() });

        // step 2: if not exists return no user exists -> register
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentialsss"
            })
        }

        // step 3: generate password hash 
        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        )

        // step 4: check password hash 
        if(!passwordMatches){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentialsss"
            })
        }

        // step 5: if matches return jwt token
        const token = generateToken(user._id);

        // step 6: return success 
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                ign: user.ign,
                igid: user.igid
            }
        });

    }


    catch(error){

        console.log("LOGIN ERRORR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to loginnn"
        });

    }
};





const getCurrentUser = async(req, res)=>{

    return res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username,
            role: req.user.role,
            ign: req.user.ign,
            igid: req.user.igid
        }
    });
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};
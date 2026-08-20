const bcrypt  = require("bcrypt");
const User  = require("../models/User.js");
const generateToken = require("../utils/generateToken.js");




const registerUser = async(req,res)=>{
    try{

        const {username, password, name, email, role, ign, igid} = req.body;

        
        // step 1: check required fields
        if(
            typeof username !== "string" || !username.trim() ||
            typeof password !== "string" || !password ||
            typeof email !== "string" ||    !email.trim()  ||
            !name.trim()
        ){
            return res.status(400).json({
                success: false,
                message: "Invalid input required fields. Check entries Againnn..."
            });
        }

        if(username.length >12){
            return res.status(400).json({
                success: false,
                message: "Username cant exceed 12 charactersss!"
            });
        }
        
        if(password.length <8){
            return res.status(400).json({
                success: false,
                message: "Password can't be less than 8 characterssssss!"
            });
        }  

        if(
            !email.endsWith("@hotmail.com") &&
            !email.endsWith("@gmail.com") &&
            !email.endsWith("@outlook.com") &&
            !email.endsWith("@yahoo.com") &&
            !email.endsWith("@zoho.com") &&
            !email.endsWith("@icloud.com") 
        ){
            return res.status(400).json({
                success: false,
                message: "invalid Email!"
            })
        }
        
        // step 2: check optional fields 

        if(ign != null){
            if(typeof ign !== "string"){
                return res.status(400).json({
                    success: false,
                    message: "Invalid In-Game Name"
                })
            }
        }
        

        if(igid != null){
            if(typeof igid !== "string"){
                return res.status(400).json({
                    success: false,
                    message: "Invalid In-Game Id"
                })
            }
        }


        const normalizedUsername = username.trim();
        const normalizedEmail = email.trim().toLowerCase;
        const normalizedName = name.trim().length > 15 ? name.trim().substring(0,15) : name;
        const normalizedIGN = ign == null ? "" : ign;
        const normalizedIGID = igid == null ? "" : igid;
        
        // step 3: verify whether username already taken/exist
        const existingUser = await User.findOne({
            $or: [
                {username: normalizedUsername},
                {email : normalizedEmail}
            ]
        });
        
        
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "username or the player with same emailID is already registered!"
            });
        }

        // step 5: generate the password hash
        
        const passwordHash = await bcrypt.hash(password, 10);
        
        // step 4: save into the database extracted info
        const user = await User.create({
            username: normalizedUsername,
            passwordHash: passwordHash,
            role : role,
            name : normalizedName,
            email : normalizedEmail,
            ign : normalizedIGN,
            igid: normalizedIGID
        });

        
        // step 5: return & set the response as Success
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
                message: "Login Fields cant be Empty..."
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

        // step 5: if matches sign jwt token
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
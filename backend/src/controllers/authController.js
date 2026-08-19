const registerUser = async (req,res) =>{
    res.status(501).json({
        sucess : false,
        message: "Registration not done yetttt!"
    });
}

const loginUser = async(req,res) =>{
    res.status(501).json({
        success: false,
        message: "Login not done yetttt!"
    });
}

module.exports = {
    registerUser,
    loginUser
}
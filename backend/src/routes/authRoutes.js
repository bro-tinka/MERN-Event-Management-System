const express = require("express");
const {registerUser, loginUser, getCurrentUser} = require("../controllers/authController.js");
const authenticate = require("../middleware/authMiddleware.js");
const authorizeRoles =  require("../middleware/roleMiddleware.js");
const router = express.Router();


function temp(req,res){
    return res.status(200).json({
        success:true,
        message:"ADMIN authorization successful"
    })
}


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticate, getCurrentUser);
router.get("/admin-check", authenticate, authorizeRoles("ADMIN"),temp);

module.exports = router;


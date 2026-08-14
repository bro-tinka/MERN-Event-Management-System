const express = require("express");

const router = express.Router();


router.get("/health", (req,res) =>{     // (req, res) are 2 objects
    res.status(200).json({
        success : true,
        message : "Node.js SERVERRR is running Beautifully!"
    })
});


router.post("/test-body", (req,res)=>{
    res.status(200).json({
        success : true,
        message : "Your Request received successfully to BACKENDDD!",
        data : req.body
    })
});

module.exports = router ;



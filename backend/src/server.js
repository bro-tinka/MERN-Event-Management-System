const express = require("express");
require("dotenv").config();
const cors = require("cors");


const app = express();  // express() returns the `app` object
app.use(express.json()); // allows json parsing sent from React frontend
app.use(cors());          // allows react frontedn & node backend communication on different ports


const PORT = process.env.PORT || 5000; //fallback || to 5000



app.post("/api/test-body", (req,res)=>{
    res.status(200).json({
        success : true,
        message : "Your Request received successfully to BACKENDDD!",
        data : req.body
    })
});

app.get("/api/health", (req,res) =>{     // (req, res) are 2 objects
    res.status(200).json({
        success : true,
        message : "Node.js SERVERRR is running Beautifully!"
    })
});

//this is the line actually starting the server
app.listen(PORT, ()=>{   
    console.log('Started SERVERR! Server is listening on ', PORT);
});
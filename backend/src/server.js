const express = require("express");
require("dotenv").config();

const app = express();  // express() returns the `app` object

const PORT = process.env.PORT || 5000; //fallback || to 5000

app.get("/", (req,res) =>{     // (req, res) are 2 objects
    res.send("Request reached home! Custom Room booking API is running with nodemon!");
});

//this is the line actually starting the server
app.listen(PORT, ()=>{   
    console.log('Started SERVERR! Server is listening on ', PORT);
});
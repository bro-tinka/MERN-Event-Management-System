const express = require("express");

const app = express();  // express() returns the `app` object

const PORT = 5000;

app.get("/", (req,res) =>{     // (req, res) are 2 objects
    res.send("Request reached home! Custom Room booking API is running!");
});

//this is the line actually starting the server
app.listen(PORT, ()=>{   
    console.log('Started SERVERR! Server is listening on ', PORT);
});
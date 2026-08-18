const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db.js");


const app = express();  // express() returns the `app` object
const healthRoutes = require("./routes/healthRoutes.js"); // node can handle .js notation automatically


app.use(express.json()); // allows json parsing sent from React frontend
app.use(cors());          // allows react frontedn & node backend communication on different ports
app.use("/api", healthRoutes); // attaches prefix "/api" to all routes declared in healthRoutes  OR ANY REQUEST MATHCING STARTING WITH /api will be handled by this javascript file

const PORT = process.env.PORT || 5000; //fallback || to 5000


connectDB();
//this is the line actually starting the server
app.listen(PORT, ()=>{   
    console.log('Started SERVERR! Server is listening on ', PORT);
});
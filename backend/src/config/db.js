const mongoose = require('mongoose');


const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected Sucessfullyyyy !");
    }

    catch(error){
        console.log("Mongo DB connection FAILEDDD!");
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
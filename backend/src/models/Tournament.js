const mongoose = require("mongoose");

const tournamentSchema = mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
    },

    game:{
        type: String,
        required: true,
        trim: true
    },

    description:{
        type: String,
        trim: true
    },

    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    startTime:{
        type: Date,
        required: true,
    },

    entryFee: {
        type: Number,
        required: true,
        min: 0
    },

    maxPlayers:{
        type: Number,
        default: 50,
        min :1
    },

    waitingListCapacity:{
        type: Number,
        default: 5,
        min : 0
    },

    status:{
        type: String,
        enum:["DRAFT", "OPEN", "CLOSED", "CANCELLED", "COMPLETED"],
        default: "DRAFT"
    },

    roomId:{
        type: String,
        trim: true
    },

    roomPassword:{
        type: String,
        trim: true
    }
},
    {
        timestamps : true
    }

);

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;


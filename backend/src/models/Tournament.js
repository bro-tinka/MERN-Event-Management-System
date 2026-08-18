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


// Building Performance Indices for faster lookups for frequent queries
tournamentSchema.index({ creator: 1 });
tournamentSchema.index({ status: 1 });
tournamentSchema.index({ startTime: 1 });
tournamentSchema.index({ game: 1, status: 1 });
/////////////////////////////////////////////////////////////////////////


const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;


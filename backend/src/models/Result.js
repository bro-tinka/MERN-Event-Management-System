const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
    {
        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        rank: {
            type: Number,
            required: true,
            min: 1
        },

        prizeMoney: {
            type: Number,
            default: 0,
            min: 0
        },

        kills: {
            type: Number,
            default: 0,
            min: 0
        },

        notes: {
            type: String,
            trim: true
        },

        publishedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        publishedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

resultSchema.index(
    { tournament: 1, user: 1 },
    { unique: true }
);

resultSchema.index(
    { tournament: 1, rank: 1 },
    { unique: true }
);

// Building Performance Indices for faster lookups for frequent queries
resultSchema.index({ user: 1 });
///////////////////////////////////////////////////////////////////////


const Result = mongoose.model("Result", resultSchema);

module.exports = Result;

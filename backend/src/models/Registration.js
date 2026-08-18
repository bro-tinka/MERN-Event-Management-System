const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true
        },

        status: {
            type: String,
            enum: ["CONFIRMED", "WAITING", "CANCELLED"],
            required: true
        },

        slotNumber: {           // for only confirmed players
            type: Number,
            min: 1
        },

        waitingListNumber: {    // for waitingList Players
            type: Number,
            min: 1
        },

        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED"],
            default: "PENDING"
        },

        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        },

        registeredAt: {
            type: Date,
            default: Date.now
        },

        cancelledAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);


registrationSchema.index(           //unique combo of {user, tournament}
    { user: 1, tournament: 1 },
    { unique: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    tournament:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Tournament",
        required : true
    },

    registration:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Registration",
        required : true
    },

    amount:{
        type: Number,
        required : true,
        min : 0
    },

    currency:{
        type: String,
        default : "INR",
        trim: true,
        uppercase : true
    },

    status:{
        type: String,
        enum : ["PENDING", "PAID", "FAILED"],
        default : "PENDING"
    },

    provider:{
        type: String,
        enum : ["RAZORPAY", "STRIPE", "MANUAL"],
        default : "RAZORPAY"
    },

    providerOrderId:{
        type: String,
        trim : true
    },

    providerPaymentId:{
        type: String,
        trim : true
    },

    providerSignature:{
        type: String,
        trim : true
    },

    paidAt:{
        type: Date,
    },

    failedAt:{
        type: Date,
    },

    failureReason:{
        type : String,
        trim: true
    }
}, 
{
    timestamps : true
}

);


const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
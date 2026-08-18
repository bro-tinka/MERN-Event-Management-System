const mongooose  = require("mongoose");

const notificationSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.types.ObjectId,
        ref : "User",
        required: true
    },
    
    tournament:{
        type: mongoose.Schema.types.ObjectId,
        ref : "Tournament",
    },

    type:{
        type: String,
        enum : [ "REGISTRATION_CONFIRMED",
                "WAITING_LISTED",
                "PAYMENT_CONFIRMED",
                "PAYMENT_FAILED",
                "TOURNAMENT_UPDATED",
                "TOURNAMENT_CANCELLED",
                "ROOM_CREDENTIALS_AVAILABLE",
                "RESULT_PUBLISHED",
                "GENERAL"
            ],
            default : "GENERAL"
    },

    title:{
        type: String,
        required: true,
        trim : true
    },

    message:{
        type: String,
        required: true,
        trim: true
    },

    isRead:{
        type : Boolean,
        default: false
    },

    readAt:{
        type : Date,
    }
},
{
    timestamps : true   
}
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;



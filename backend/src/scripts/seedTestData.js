require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db.js");

const User = require("../models/User.js");
const Tournament = require("../models/Tournament.js");
const Registration = require("../models/Registration.js");
const Payment = require("../models/Payment.js");
const Notification = require("../models/Notification.js");
const Result = require("../models/Result.js");



const seedTestData = async() =>{

    console.log("1");

    try{
        console.log("2");
        await connectDB();
        
        console.log("3");
        await Promise.all([
            User.init(),
            Tournament.init(),
            Registration.init(),
            Payment.init(),
            Notification.init(),
            Result.init(),
        ]);
        
        console.log("4");
        const uniqueSuffix = Date.now();
        
        const admin = await User.create({
            username : `admin_${uniqueSuffix}`,
            passwordHash : "temporary_admin_hash",
            role : "ADMIN",
            ign : "AdminIGN",
            igid : `ADMIN_${uniqueSuffix}`
        });
        
        console.log("5");
        const creator = await User.create({
            username : `creator_${uniqueSuffix}`,
            passwordHash : "temporary_creator_hash",
            role : "CREATOR",
            ign : "CreatorIGN",
            igid : `CREATOR_${uniqueSuffix}`
        })
        
        console.log("6");
        const player = await User.create({
            username : `player_${uniqueSuffix}`,
            passwordHash : "temporary_player_hash",
            role : "USER",
            ign : "playerIGN",
            igid : `PLAYER_${uniqueSuffix}`
        })
        
        console.log("7");
        const secondPlayer = await User.create({
            username : `player_two_${uniqueSuffix}`,
            passwordHash : "temporary_player_two_hash",
            role : "USER",
            ign : "playerTwoIGN",
            igid : `PLAYER_TWO_${uniqueSuffix}`
        });
        
        console.log("8");
        const tournament = await Tournament.create({
            name : "Test Valorant Tournament",
            game : "Valorant",
            description : "Temporary tournament for databse verification",
            creator : creator._id,
            startTime: new Date(Date.now() + 2*60*60*1000),
            entryFee: 50,
            status: "OPEN",
            roomId: "Room123",
            roomPassword: "PASS123"
        });
        
        console.log("9");
        
        const registration = await Registration.create({
            user: player._id,
            tournament: tournament._id,
            status: "CONFIRMED",
            slotNumber: 1,
            paymentStatus: "PENDING"
        });
        
        console.log("10");
        
        const payment = await Payment.create({
            user: player._id,
            tournament: tournament._id,
            registration: registration._id,
            amount: tournament.entryFee,
            currency: "INR",
            status: "PAID",
            provider: "RAZORPAY",
            providerOrderId: `order_${uniqueSuffix}`,
            providerPaymentId: `payment_${uniqueSuffix}`,
            providerSignature: `signature_${uniqueSuffix}`,
            paidAt: new Date()
        });
        
        console.log("11");
        
        registration.payment = payment._id;
        registration.paymentStatus = "PAID";
        await registration.save();
        
        console.log("12");
        const notification = await Notification.create({
            user: player._id,
            tournament: tournament._id,
            type: "REGISTRATION_CONFIRMED",
            title: "Registration Confirmed",
            message: "You have been confirmed for Valorant(TEST) Tournament."
        });
        
        console.log("13");
        const result = await Result.create({
            tournament: tournament._id,
            user: player._id,
            rank: 1,
            prizeMoney: 1000,
            kills: 5,
            notes: "Test result entry.",
            publishedBy: admin._id
        });
        
        console.log("14");
        const populatedRegistration = await Registration.findById(registration._id)
        .populate("user", "username ign igid role")
        .populate("tournament", "name game startTime status");
        
        
        console.log("15");
        console.log("\nDatabase test data created successfully.\n");

        console.log("Admin:", admin.username);
        console.log("Creator:", creator.username);
        console.log("Player:", player.username);
        console.log("Tournament:", tournament.name);
        console.log("Registration Status:", populatedRegistration.status);
        console.log("Registered User IGID:", populatedRegistration.user.igid);
        console.log("Registered User IGN:", populatedRegistration.user.ign);
        console.log("Tournament Game:", populatedRegistration.tournament.game);
        console.log("Payment Status:", payment.status);
        console.log("Notification Title:", notification.title);
        console.log("Result Rank:", result.rank);

        console.log("\nTesting duplicate registration protection...");
        

        try {
            await Registration.create({
                user: player._id,
                tournament: tournament._id,
                status: "WAITING",
                waitingListNumber: 1
            });
        } 
        catch (error) {
            console.log("Duplicate registration blocked successfully.");
        }

        console.log("\nTesting duplicate Leaderboard rank protection...");

        
        try{
            await Result.create({
                tournament : tournament._id,
                user: secondPlayer._id,
                rank:1,
                prizeMoney: 500,
                publishedBy:admin._id
            })
        }
        catch(error){
            console.log("Duplicate LeaderBoard rank blocked sucessfully");
        }

        console.log("\n SECTION 2  DATABASE VERIFICATION ::: COMPLETED \n");
    }


    catch(error){
        console.error("DATABSE VERIFICATION ::: FAILED");
    }
    finally{
        await mongoose.connection.close();
        console.log("CLOSING MONGODB CONNECTION...");
        console.log("MONGODB CONNECTION CLOSED");
    }
};

seedTestData();
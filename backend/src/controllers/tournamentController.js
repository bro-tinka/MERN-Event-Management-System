const Tournament = require("../models/Tournament");



const getAllTournament = async (req,res)=>{
    
}

const getTournamentById = async (req,res)=>{
    
}

const createTournament = async (req,res)=>{ 

    try{
        const{name, game, description, startTime, entryFee} = req.body;

        const tournament = await Tournament.create({
            name,
            game,
            description,
            creator : req.user._id,
            startTime,
            entryFee
        });

        return res.status(201).json({
            success: true,
            message: "Tournament Created SucessFullyy",
            tournament: tournament
        })
    }

    catch(error){

        console.log("CREATE TOURNA ERR:", error);

        return res.status(500).json({ //500:INTERNAL SERVER ERR : (temporary) 
            success: false,
            message: "Unable to create Tournament"
        })    
             
    }

}

const updateTournamentById = async (req,res)=>{

}

const deleteTournament = async (req,res)=>{

}

module.exports = {getAllTournament, getTournamentById, createTournament, updateTournamentById, deleteTournament};

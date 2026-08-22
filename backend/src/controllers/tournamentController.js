const Tournament = require("../models/Tournament");



const getAllTournament = async (req,res)=>{
    
    try{
        const tournaments = await Tournament.find()
            .select("-roomId -roomPassword")
            .populate("creator", "username");


        return res.status(200).json({
            success: true,
            count : tournaments.length,
            tournaments: tournaments
        });
    }

    catch(error){

        console.log("GET TOURNA ERR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve Tournaments"
        });
        
        
    }
}

const getTournamentById = async (req,res)=>{
    
    try{

        const tournament = await Tournament.findById(req.params.id)
            .select("-roomPassword -roomId")
            .populate("creator", "username");
        
        if(!tournament){
            return res.status(404).json({
                success: false,
                message: "Tournament NOT Found"
            });
            
        }

        return res.status(200).json({
            success: true,
            tournament : tournament
        });
        
    }

    catch(error){

        console.log("GET TOURNA ERR: ", error);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve the Tournament"
        });
        
    }
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

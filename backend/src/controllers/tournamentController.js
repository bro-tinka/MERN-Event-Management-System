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

    try{

        // step 1 : fetch the tournament by req.params.id
        const tournament = await Tournament.findById(req.params.id);
        
        if(!tournament){
            return res.status(404).json({
                success: false,
                message: "Tournament Not Existt"
            });
            
        }
        
        // step 2 : you are creator but don't OWN the tournament -> FORBIDDEN
        if (req.user.role === "CREATOR" && !tournament.creator.equals(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: "You can only update tournaments created by you"
            });
        }
        
        // step 3 : define allowed updates -> PATCH updates  & SAVE
        
        const allowedUpdates = ["name", "game", "description", "startTime", "entryFee", "status"];
        
        allowedUpdates.forEach( field =>{
            
            if(req.body[field] != null){
                tournament[field] = req.body[field];
            }
            
        });
        

        await tournament.save();
        
        return res.status(200).json({
            success: true,
            message: "Tournament Updated Successfullyy",
            tournament : {
                id: tournament._id,
                name: tournament.name,
                game: tournament.game,
                description: tournament.description,
                creator: tournament.creator,
                startTime: tournament.startTime,
                entryFee: tournament.entryFee,
                status: tournament.status
            }
        });
        
    }
    
    catch(error){
        
        console.log("UPDATE TOURNA ERR: ", error);
        
        return res.status(500).json({
            success: false,
            message: "Unable to update tournament"
        });
        
    }
};


const deleteTournament = async (req, res) => {
    
    try {
        
        // step 1 : fetch the tournament by req.params.id
        const tournament = await Tournament.findById(req.params.id);
        
        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found"
            });
        }
        // step 2 : you are creator but don't OWN the tournament -> FORBIDDEN
        
        if (req.user.role === "CREATOR" &&  !tournament.creator.equals(req.user._id) ) {
            return res.status(403).json({
                success: false,
                message: "You can only update tournaments created by you"
            });
        }
        
        // step 3 : delete Tournament
        await tournament.deleteOne();
        
        
        return res.status(200).json({
            success: true,
            message: "Tournament deleted successfully"
        });
        
    }

    catch (error) {

        console.log("DELETE TOURNAMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to delete tournament"
        });

    }
};

module.exports = {getAllTournament, getTournamentById, createTournament, updateTournamentById, deleteTournament};

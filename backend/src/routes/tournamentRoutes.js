const express = require("express");

const { createTournament, getAllTournament, getTournamentById, updateTournamentById, deleteTournament} = require("../controllers/tournamentController.js");
const authenticate = require("../middleware/authMiddleware.js");
const authorizeRoles = require("../middleware/roleMiddleware.js");

const router = express.Router();



router.get("/", getAllTournament);
router.get("/:id", getTournamentById);
router.post("/", authenticate, authorizeRoles("CREATOR", "ADMIN", "OWNER"), createTournament);
router.patch("/:id",authenticate, authorizeRoles("CREATOR", "ADMIN", "OWNER"), updateTournamentById);
router.delete("/:id", authenticate, authorizeRoles("CREATOR", "ADMIN", "OWNER"), deleteTournament );


module.exports = router;

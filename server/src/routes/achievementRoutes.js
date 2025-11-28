const express = require("express");
const router = express.Router();
const achievementController = require("../controllers/achievementController");

// CRUD
router.post("/", achievementController.createAchievement);
router.get("/", achievementController.getAllAchievements);
router.get("/:id", achievementController.getAchievementById);
router.put("/:id", achievementController.updateAchievement);
router.delete("/:id", achievementController.deleteAchievement);

// Assign/remove achievements using email
router.post("/:email/add", achievementController.assignAchievementToUser);
router.post("/:email/remove", achievementController.removeAchievementFromUser);

module.exports = router;

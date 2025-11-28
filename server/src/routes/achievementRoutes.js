const express = require("express");
const router = express.Router();
const achievementController = require("../controllers/achievementController");
const { requireFields } = require("../middlewares/validateFields");

// Create achievement entry
router.post(
  "/",
  requireFields(["userEmail", "achievements"]),
  achievementController.createAchievement
);

// Get all achievements
router.get("/", achievementController.getAllAchievements);

// Get achievements by email
router.get("/:email", achievementController.getAchievementsByEmail);

module.exports = router;

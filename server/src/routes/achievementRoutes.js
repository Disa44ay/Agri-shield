const express = require("express");
const router = express.Router();

const { requireFields } = require("../middlewares/validateFields");
const achievementController = require("../controllers/achievementController");

// All achievement
// Create
router.post(
  "/",
  requireFields(["name", "description", "badgeImage", "level"]),
  achievementController.createAchievement
);

// Read
router.get("/", achievementController.getAllAchievements);
router.get("/:id", achievementController.getAchievementById);

// Update & Delete
router.put("/:id", achievementController.updateAchievementById);
router.delete("/:id", achievementController.deleteAchievementById);

module.exports = router;

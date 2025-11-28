const Achievement = require("../models/Achievement");

// CREATE achievement record
exports.createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);

    return res.status(201).json({
      message: "Achievement record created",
      achievement,
    });
  } catch (error) {
    console.error("Achievement Create Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// GET all achievements in the collection
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    return res.status(200).json({ achievements });
  } catch (error) {
    console.error("Fetch All Achievements Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// GET achievements for a user
exports.getAchievementsByEmail = async (req, res) => {
  try {
    const achievements = await Achievement.find({
      userEmail: req.params.email,
    });

    return res.status(200).json({ achievements });
  } catch (error) {
    console.error("Achievement Fetch Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

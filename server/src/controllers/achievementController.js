const Achievement = require("../models/Achievement");
const User = require("../models/User");
const { success, fail } = require("../helpers/responseHelper");

// Create achievement
exports.createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);
    return success(res, "CREATED", "Achievement created", achievement, 201);
  } catch (err) {
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

// Get one achievement
exports.getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement)
      return fail(res, "NOT_FOUND", "Achievement not found", null, 404);

    return success(res, "OK", "Achievement fetched", achievement);
  } catch (err) {
    return fail(res, "INVALID_ID", err.message, null, 400);
  }
};

// Get all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    return success(res, "OK", "All achievements fetched", achievements);
  } catch (err) {
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

// Update achievement
exports.updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!achievement)
      return fail(res, "NOT_FOUND", "Achievement not found", null, 404);

    return success(res, "UPDATED", "Achievement updated", achievement);
  } catch (err) {
    return fail(res, "INVALID_ID", err.message, null, 400);
  }
};

// Delete achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement)
      return fail(res, "NOT_FOUND", "Achievement not found", null, 404);

    return success(res, "DELETED", "Achievement deleted");
  } catch (err) {
    return fail(res, "INVALID_ID", err.message, null, 400);
  }
};

// Assign achievement to user by email
exports.assignAchievementToUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { achievementId } = req.body;

    if (!achievementId)
      return fail(res, "MISSING_FIELD", "achievementId is required", null, 400);

    const user = await User.findOne({ userEmail: email });
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);

    // Prevent duplicates
    if (user.achievements.includes(achievementId))
      return fail(
        res,
        "ALREADY_EXISTS",
        "Achievement already assigned",
        null,
        400
      );

    user.achievements.push(achievementId);
    await user.save();

    return success(res, "ADDED", "Achievement added to user", user);
  } catch (err) {
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

// Remove achievement from user
exports.removeAchievementFromUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { achievementId } = req.body;

    const user = await User.findOne({ userEmail: email });
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);

    user.achievements = user.achievements.filter(
      (id) => id.toString() !== achievementId
    );

    await user.save();

    return success(res, "REMOVED", "Achievement removed", user);
  } catch (err) {
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

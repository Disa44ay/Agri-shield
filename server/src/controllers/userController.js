const User = require("../models/User");
const { success, fail } = require("../helpers/responseHelper");

// Register new user
exports.registerUser = async (req, res) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail)
      return fail(res, "MISSING_EMAIL", "userEmail is required", null, 400);

    const exists = await User.findOne({ userEmail });
    if (exists)
      return fail(res, "ALREADY_EXISTS", "User already exists", null, 400);

    const user = await User.create(req.body);

    return success(res, "USER_CREATED", "User created successfully", user, 201);
  } catch (err) {
    console.error("registerUser error:", err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Get profile by email (frontend provides userEmail)
exports.getUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ userEmail: email }).populate(
      "achievements"
    );
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);

    return success(res, "OK", "User fetched", user);
  } catch (err) {
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Update profile
exports.updateUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOneAndUpdate({ userEmail: email }, req.body, {
      new: true,
    }).populate("achievements");

    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);

    return success(res, "UPDATED", "Profile updated", user);
  } catch (err) {
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOneAndDelete({ userEmail: email });
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);

    return success(res, "DELETED", "User deleted");
  } catch (err) {
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("achievements");
    return success(res, "OK", "All users fetched", users);
  } catch (err) {
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Add an achievement
exports.addAchievement = async (req, res) => {
  try {
    const { email } = req.params;
    const { achievementId } = req.body;

    if (!achievementId)
      return fail(res, "MISSING_FIELD", "achievementId required", null, 400);

    const user = await User.findOne({ userEmail: email });
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);

    if (user.achievements.includes(achievementId))
      return fail(res, "EXISTS", "Achievement already exists", null, 400);

    user.achievements.push(achievementId);
    await user.save();

    return success(res, "ADDED", "Achievement added", user);
  } catch (err) {
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Remove achievement
exports.removeAchievement = async (req, res) => {
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
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

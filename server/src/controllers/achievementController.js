const Achievement = require("../models/Achievement");
const { success, fail } = require("../helpers/responseHelper");

// Create
exports.createAchievement = async (req, res) => {
  try {
    const payload = (({ name, description, badgeImage, level, points }) => ({
      name,
      description,
      badgeImage,
      level,
      points,
    }))(req.body);
    const ach = await Achievement.create(payload);
    return success(res, "ACH_CREATED", "Achievement created", ach, 201);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Get all
exports.getAllAchievements = async (_req, res) => {
  try {
    const list = await Achievement.find();
    return success(res, "OK", "Fetched achievements", list);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Get by id
exports.getAchievementById = async (req, res) => {
  try {
    const ach = await Achievement.findById(req.params.id);
    if (!ach) return fail(res, "NOT_FOUND", "Achievement not found", null, 404);
    return success(res, "OK", "Fetched achievement", ach);
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid id", err.message, 400);
  }
};

// Update
exports.updateAchievementById = async (req, res) => {
  try {
    const updated = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return fail(res, "NOT_FOUND", "Achievement not found", null, 404);
    return success(res, "UPDATED", "Achievement updated", updated);
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid id", err.message, 400);
  }
};

// Delete
exports.deleteAchievementById = async (req, res) => {
  try {
    const d = await Achievement.findByIdAndDelete(req.params.id);
    if (!d) return fail(res, "NOT_FOUND", "Achievement not found", null, 404);
    return success(res, "DELETED", "Achievement deleted");
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid id", err.message, 400);
  }
};

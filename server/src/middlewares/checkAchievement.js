const Achievement = require("../models/Achievement");
const { fail } = require("../helpers/responseHelper");

async function checkAchievement(req, res, next) {
  try {
    const { achievementId } = req.body;
    if (!achievementId)
      return fail(
        res,
        "MISSING_FIELDS",
        "achievementId is required",
        ["achievementId"],
        400
      );

    const exists = await Achievement.findById(achievementId);
    if (!exists)
      return fail(res, "NOT_FOUND", "Achievement not found", null, 404);

    return next();
  } catch (err) {
    console.error("checkAchievement error:", err);
    return fail(res, "INVALID_ID", "Invalid achievement ID", err.message, 400);
  }
}

module.exports = checkAchievement;

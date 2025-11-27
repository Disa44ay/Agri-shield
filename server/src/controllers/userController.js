const User = require("../models/User");
const { success, fail } = require("../helpers/responseHelper");

// Register / create profile (frontend must have created Firebase user already).
// Requires verifyFirebaseToken middleware; body: { email, name, phone, picture?, district?, homeAddress? }
exports.registerUser = async (req, res) => {
  try {
    const { email, name, phone, picture, district, homeAddress } = req.body;

    // email must match firebase token email
    if (!req.firebaseUser || email !== req.firebaseUser.email) {
      return fail(
        res,
        "EMAIL_MISMATCH",
        "Email does not match Firebase token",
        null,
        400
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return fail(
        res,
        "ALREADY_EXISTS",
        "User profile already exists",
        null,
        400
      );
    }

    const user = new User({
      email,
      name,
      phone,
      picture,
      district,
      homeAddress,
    });
    await user.save();
    return success(res, "USER_CREATED", "User profile created", user, 201);
  } catch (err) {
    console.error("registerUser error:", err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Get user's profile
exports.getMyProfile = async (req, res) => {
  try {
    const email = req.firebaseUser.email;
    const user = await User.findOne({ email }).populate("achievements");
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);
    return success(res, "OK", "Fetched profile", user);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Update profile
exports.updateMyProfile = async (req, res) => {
  try {
    const email = req.firebaseUser.email;
    const updates = (({ name, phone, picture, district, homeAddress }) => ({
      name,
      phone,
      picture,
      district,
      homeAddress,
    }))(req.body);
    const user = await User.findOneAndUpdate({ email }, updates, {
      new: true,
    }).populate("achievements");
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);
    return success(res, "UPDATED", "Profile updated", user);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Delete account
exports.deleteMyAccount = async (req, res) => {
  try {
    const email = req.firebaseUser.email;
    const user = await User.findOneAndDelete({ email });
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);
    return success(res, "DELETED", "User account deleted");
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("achievements");
    return success(res, "OK", "Fetched all users", users);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("achievements");
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);
    return success(res, "OK", "Fetched user", user);
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid user id", err.message, 400);
  }
};

// Update user by id
exports.updateUserById = async (req, res) => {
  try {
    const updates = (({ name, phone, picture, district, homeAddress }) => ({
      name,
      phone,
      picture,
      district,
      homeAddress,
    }))(req.body);
    const updated = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).populate("achievements");
    if (!updated) return fail(res, "NOT_FOUND", "User not found", null, 404);
    return success(res, "UPDATED", "User updated", updated);
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid user id", err.message, 400);
  }
};

// Delete user by id
exports.deleteUserById = async (req, res) => {
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    if (!del) return fail(res, "NOT_FOUND", "User not found", null, 404);
    return success(res, "DELETED", "User deleted");
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid user id", err.message, 400);
  }
};

// Add achievement to user (by current user)
exports.addAchievementToMe = async (req, res) => {
  try {
    const email = req.firebaseUser.email;
    const { achievementId } = req.body;
    if (!achievementId)
      return fail(
        res,
        "MISSING_FIELDS",
        "achievementId required",
        ["achievementId"],
        400
      );

    const user = await User.findOne({ email });
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);

    if (user.achievements.includes(achievementId)) {
      return fail(
        res,
        "ALREADY_EXISTS",
        "Achievement already added",
        null,
        400
      );
    }

    user.achievements.push(achievementId);
    await user.save();
    await user.populate("achievements");
    return success(res, "ADDED", "Achievement added", user);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Remove achievement from me
exports.removeAchievementFromMe = async (req, res) => {
  try {
    const email = req.firebaseUser.email;
    const { achievementId } = req.body;
    if (!achievementId)
      return fail(
        res,
        "MISSING_FIELDS",
        "achievementId required",
        ["achievementId"],
        400
      );

    const user = await User.findOne({ email });
    if (!user) return fail(res, "NOT_FOUND", "User not found", null, 404);

    user.achievements = user.achievements.filter(
      (id) => id.toString() !== achievementId
    );
    await user.save();
    await user.populate("achievements");
    return success(res, "REMOVED", "Achievement removed", user);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

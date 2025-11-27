// Finds a profile in User collection by firebase email and attaches it as req.currentUser (if found).
const User = require("../models/User");
const { fail } = require("../helpers/responseHelper");

async function attachUserIfExists(req, res, next) {
  try {
    const email = req.firebaseUser && req.firebaseUser.email;
    if (!email)
      return fail(res, "UNAUTHENTICATED", "Unauthenticated", null, 401);

    const user = await User.findOne({ email }).populate("achievements");
    if (user) req.currentUser = user;
    // if not found, req.currentUser remains undefined (registration route will create)
    return next();
  } catch (err) {
    console.error("attachUserIfExists error:", err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
}

module.exports = attachUserIfExists;

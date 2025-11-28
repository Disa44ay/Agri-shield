const User = require("../models/User");

const getUserByEmail = async (req, res, next) => {
  try {
    const email = req.body.email || req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email }).populate(
      "achievements.reference"
    );
    if (!user) {
      req.user = null; // user not found
    } else {
      req.user = user; // attach found user
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getUserByEmail;

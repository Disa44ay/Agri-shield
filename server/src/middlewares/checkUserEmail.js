const User = require("../models/User");

const checkUserEmail = async (req, res, next) => {
  try {
    const email = req.body.userEmail;
    if (!email)
      return res.status(400).json({ message: "User email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = checkUserEmail;

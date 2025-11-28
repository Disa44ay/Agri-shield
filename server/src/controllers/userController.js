const User = require("../models/User");

// CREATE OR RETURN USER
exports.registerOrGetUser = async (req, res) => {
  try {
    const { email, name, phone, division, picture, homeAddress, district } =
      req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: name || null,
        phone: phone || null,
        division: division || null,
        picture: picture || null,
        homeAddress: homeAddress || null,
        district: district || null,
      });

      return res.status(201).json({
        message: "User created",
        user,
      });
    }

    return res.status(200).json({
      message: "User already exists",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER BY EMAIL
exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE USER BY EMAIL
exports.updateUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE USER BY EMAIL
exports.deleteUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const deleted = await User.findOneAndDelete({ email });

    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User deleted successfully",
      user: deleted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

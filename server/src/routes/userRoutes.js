const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requireFields } = require("../middlewares/validateFields");

// Register / Sign-in (creates user if doesn't exist)
router.post(
  "/register",
  requireFields(["email", "name"]),
  userController.registerOrGetUser
);

// Get all users
router.get("/", userController.getAllUsers);

// Get, update, delete user by email
router.get("/:email", userController.getUserByEmail);
router.patch("/:email", userController.updateUserByEmail);
router.delete("/:email", userController.deleteUserByEmail);

module.exports = router;

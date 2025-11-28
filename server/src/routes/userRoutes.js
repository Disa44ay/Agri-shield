const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register
router.post("/register", userController.registerUser);

// CRUD using userEmail
router.get("/:email", userController.getUser);
router.put("/:email", userController.updateUser);
router.delete("/:email", userController.deleteUser);

// Achievements
router.post("/:email/add-achievement", userController.addAchievement);
router.post("/:email/remove-achievement", userController.removeAchievement);

// All users
router.get("/", userController.getAllUsers);

module.exports = router;

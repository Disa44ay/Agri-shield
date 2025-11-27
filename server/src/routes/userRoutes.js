const express = require("express");
const router = express.Router();

const { verifyFirebaseToken } = require("../middlewares/firebaseAuth");
const attachUserIfExists = require("../middlewares/attachUserIfExists");
const { requireFields } = require("../middlewares/validateFields");
const userController = require("../controllers/userController");

// Firebase token
router.use(verifyFirebaseToken);

router.post(
  "/register",
  requireFields(["email", "name", "phone"]),
  userController.registerUser
);

// optional: attach profile if exists
router.get("/me", attachUserIfExists, userController.getMyProfile);
router.put("/me", attachUserIfExists, userController.updateMyProfile);
router.delete("/me", attachUserIfExists, userController.deleteMyAccount);

// add
router.post(
  "/me/add-achievement",
  requireFields(["achievementId"]),
  userController.addAchievementToMe
);
router.post(
  "/me/remove-achievement",
  requireFields(["achievementId"]),
  userController.removeAchievementFromMe
);

// Public
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

module.exports = router;

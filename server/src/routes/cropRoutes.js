const express = require("express");
const router = express.Router();
const cropController = require("../controllers/cropController");
const { requireFields } = require("../middlewares/validateFields");

// Create crop
router.post(
  "/",
  requireFields(["userEmail", "cropName", "estimatedWeightKg", "harvestDate"]),
  cropController.createCrop
);

// Get all crops in the database
router.get("/", cropController.getAllCrops);

// Get crops by user email
router.get("/:email", cropController.getCropsByEmail);

// Update crop
router.patch("/:email/:batchId", cropController.updateCropByEmail);

// Delete crop
router.delete("/:email/:batchId", cropController.deleteCropByEmail);

module.exports = router;

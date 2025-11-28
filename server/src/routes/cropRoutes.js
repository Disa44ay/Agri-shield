const express = require("express");
const router = express.Router();
const cropController = require("../controllers/cropController");

// MAIN OPERATIONS
router.post("/", cropController.createCrop);
router.get("/", cropController.getAllCrops);

// User-specific fetch
router.get("/user/:email", cropController.getCropsByUser);

// ID-based CRUD
router.get("/:id", cropController.getCropById);
router.put("/:id", cropController.updateCrop);
router.delete("/:id", cropController.deleteCrop);

module.exports = router;

const express = require("express");
const router = express.Router();

const { requireFields } = require("../middlewares/validateFields");
const cropMiddleware = require("../middlewares/cropMiddleware");
const cropController = require("../controllers/cropController");

// Create crop
router.post("/", cropMiddleware, cropController.createCrop);

// Get my crops
router.get("/me", cropController.getMyCrops);

// CRUD by id
router.get("/:id", cropController.getCropById);
router.put("/:id", cropController.updateCropById);
router.delete("/:id", cropController.deleteCropById);

//get all
router.get("/", cropController.getAllCrops);

module.exports = router;

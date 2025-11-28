const Crop = require("../models/Crop");

// CREATE CROP
exports.createCrop = async (req, res) => {
  try {
    const {
      userEmail,
      cropName,
      cropType,
      batchId,
      farmerId,
      estimatedWeightKg,
      harvestDate,
      storage,
      status,
    } = req.body;

    const crop = await Crop.create({
      userEmail,
      cropName,
      cropType,
      batchId,
      farmerId,
      estimatedWeightKg,
      harvestDate,
      storage,
      status,
    });

    return res.status(201).json({
      message: "Crop created successfully",
      crop,
    });
  } catch (error) {
    console.error("Create Crop Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// GET CROPS BY EMAIL
exports.getCropsByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const crops = await Crop.find({ userEmail: email });

    return res.status(200).json({ crops });
  } catch (error) {
    console.error("Get Crops Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE CROP
exports.updateCropByEmail = async (req, res) => {
  try {
    const { email, batchId } = req.params;

    const crop = await Crop.findOneAndUpdate(
      { userEmail: email, batchId: Number(batchId) },
      req.body,
      { new: true }
    );

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    return res.status(200).json({
      message: "Crop updated",
      crop,
    });
  } catch (error) {
    console.error("Update Crop Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// GET ALL CROPS
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    return res.status(200).json({ crops });
  } catch (error) {
    console.error("Get All Crops Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// DELETE CROP
exports.deleteCropByEmail = async (req, res) => {
  try {
    const { email, batchId } = req.params;

    const deleted = await Crop.findOneAndDelete({
      userEmail: email,
      batchId: Number(batchId),
    });

    if (!deleted) {
      return res.status(404).json({ message: "Crop not found" });
    }

    return res.status(200).json({
      message: "Crop deleted",
      deletedCrop: deleted,
    });
  } catch (error) {
    console.error("Delete Crop Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

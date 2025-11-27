const Crop = require("../models/Crop");
const { success, fail } = require("../helpers/responseHelper");

// Create crop
exports.createCrop = async (req, res) => {
  try {
    const email = req.firebaseUser.email; // always from Firebase
    const {
      cropName,
      cropType,
      estimatedWeightKg,
      harvestDate,
      storage,
      batchId,
      farmerId,
      status,
    } = req.body;

    const crop = await Crop.create({
      email,
      cropName,
      cropType,
      estimatedWeightKg,
      harvestDate,
      storage: {
        district: storage.district,
        storageName: storage.storageName,
        storageDate: storage.storageDate || null,
      },
      batchId: batchId || null,
      farmerId: farmerId || null,
      status: status || "pending",
    });

    return success(res, "CROP_CREATED", "Crop created successfully", crop, 201);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Get crops for current user
exports.getMyCrops = async (req, res) => {
  try {
    const email = req.firebaseUser.email;
    const crops = await Crop.find({ email });
    return success(res, "OK", "Fetched user's crops", crops);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

// Get crop by id
exports.getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return fail(res, "NOT_FOUND", "Crop not found", null, 404);
    return success(res, "OK", "Fetched crop", crop);
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid ID", err.message, 400);
  }
};

// Update crop
exports.updateCropById = async (req, res) => {
  try {
    const email = req.firebaseUser.email;

    // Prevent changing email
    if (req.body.email && req.body.email !== email) {
      return fail(res, "FORBIDDEN", "Cannot change email", null, 403);
    }

    const updatePayload = { ...req.body };
    if (updatePayload.storage) {
      updatePayload.storage = {
        district: updatePayload.storage.district,
        storageName: updatePayload.storage.storageName,
        storageDate: updatePayload.storage.storageDate || null,
      };
    }

    const updated = await Crop.findByIdAndUpdate(req.params.id, updatePayload, {
      new: true,
    });

    if (!updated) return fail(res, "NOT_FOUND", "Crop not found", null, 404);
    return success(res, "UPDATED", "Crop updated successfully", updated);
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid ID", err.message, 400);
  }
};

// Delete crop
exports.deleteCropById = async (req, res) => {
  try {
    const deleted = await Crop.findByIdAndDelete(req.params.id);
    if (!deleted) return fail(res, "NOT_FOUND", "Crop not found", null, 404);
    return success(res, "DELETED", "Crop deleted successfully");
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid ID", err.message, 400);
  }
};

// Get all crops
exports.getAllCrops = async (_req, res) => {
  try {
    const all = await Crop.find();
    return success(res, "OK", "Fetched all crops", all);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

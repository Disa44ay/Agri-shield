const Crop = require("../models/Crop");
const { success, fail } = require("../helpers/responseHelper");

// Create crop
exports.createCrop = async (req, res) => {
  try {
    const email = req.firebaseUser.email;
    const payload = { ...req.body, email };
    const crop = await Crop.create(payload);
    return success(res, "CROP_CREATED", "Crop created", crop, 201);
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
    return fail(res, "INVALID_ID", "Invalid id", err.message, 400);
  }
};

// Update crop
exports.updateCropById = async (req, res) => {
  try {
    const updated = await Crop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return fail(res, "NOT_FOUND", "Crop not found", null, 404);
    return success(res, "UPDATED", "Crop updated", updated);
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid id", err.message, 400);
  }
};

// Delete crop
exports.deleteCropById = async (req, res) => {
  try {
    const d = await Crop.findByIdAndDelete(req.params.id);
    if (!d) return fail(res, "NOT_FOUND", "Crop not found", null, 404);
    return success(res, "DELETED", "Crop deleted");
  } catch (err) {
    console.error(err);
    return fail(res, "INVALID_ID", "Invalid id", err.message, 400);
  }
};

// get all crops
exports.getAllCrops = async (_req, res) => {
  try {
    const all = await Crop.find();
    return success(res, "OK", "Fetched all crops", all);
  } catch (err) {
    console.error(err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
};

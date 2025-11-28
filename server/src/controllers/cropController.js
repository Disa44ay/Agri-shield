const Crop = require("../models/Crop");
const { success, fail } = require("../helpers/responseHelper");

exports.createCrop = async (req, res) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail)
      return fail(res, "MISSING_EMAIL", "userEmail is required", null, 400);

    const crop = await Crop.create(req.body);

    return success(res, "CROP_CREATED", "Crop created successfully", crop, 201);
  } catch (err) {
    console.error("createCrop error:", err);
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

// Get all crops for a specific user
exports.getCropsByUser = async (req, res) => {
  try {
    const { email } = req.params;

    const crops = await Crop.find({ userEmail: email });

    return success(res, "OK", "User crops fetched", crops);
  } catch (err) {
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

//Get a crop by ID
exports.getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) return fail(res, "NOT_FOUND", "Crop not found", null, 404);

    return success(res, "OK", "Crop fetched", crop);
  } catch (err) {
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

//Update crop (ID-based)
exports.updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!crop) return fail(res, "NOT_FOUND", "Crop not found", null, 404);

    return success(res, "UPDATED", "Crop updated", crop);
  } catch (err) {
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

//Delete crop (ID-based)
exports.deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);

    if (!crop) return fail(res, "NOT_FOUND", "Crop not found", null, 404);

    return success(res, "DELETED", "Crop deleted");
  } catch (err) {
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

//Get ALL crops in the system (ADMIN)
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    return success(res, "OK", "All crops fetched", crops);
  } catch (err) {
    return fail(res, "SERVER_ERROR", err.message, null, 500);
  }
};

//

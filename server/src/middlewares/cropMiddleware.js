const { CROP_TYPES } = require("../config/cropTypes");
const { fail } = require("../helpers/responseHelper");

function cropMiddleware(req, res, next) {
  try {
    const { cropName, cropType, estimatedWeightKg, harvestDate, storage } =
      req.body;

    if (!cropName || typeof cropName !== "string") {
      return fail(
        res,
        "INVALID_FIELD",
        "cropName is required and must be a string",
        "cropName",
        400
      );
    }

    if (!Array.isArray(cropType) || cropType.length === 0) {
      return fail(
        res,
        "INVALID_FIELD",
        "cropType must be a non-empty array",
        "cropType",
        400
      );
    }

    const invalidTypes = cropType.filter((t) => !CROP_TYPES.includes(t));
    if (invalidTypes.length) {
      return fail(
        res,
        "INVALID_CROPTYPE",
        "Invalid cropType values",
        invalidTypes,
        400
      );
    }

    if (isNaN(Number(estimatedWeightKg))) {
      return fail(
        res,
        "INVALID_FIELD",
        "estimatedWeightKg must be a number",
        "estimatedWeightKg",
        400
      );
    }

    if (!harvestDate || typeof harvestDate !== "string") {
      return fail(
        res,
        "INVALID_FIELD",
        "harvestDate is required (ISO string)",
        "harvestDate",
        400
      );
    }

    if (
      !storage ||
      !storage.division ||
      !storage.district ||
      !storage.locationName
    ) {
      return fail(
        res,
        "INVALID_FIELD",
        "storage.division, storage.district and storage.locationName are required",
        "storage",
        400
      );
    }

    // storage.storageDate is optional; if provided, ensure string
    if (storage.storageDate && typeof storage.storageDate !== "string") {
      return fail(
        res,
        "INVALID_FIELD",
        "storage.storageDate must be an ISO string",
        "storage.storageDate",
        400
      );
    }

    return next();
  } catch (err) {
    console.error("cropMiddleware error:", err);
    return fail(res, "SERVER_ERROR", "Server error", err.message, 500);
  }
}

module.exports = cropMiddleware;

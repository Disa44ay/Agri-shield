const mongoose = require("mongoose");
const { CROP_TYPES } = require("../config/cropTypes");

const storageSchema = new mongoose.Schema(
  {
    division: { type: String, required: true },
    district: { type: String, required: true },
    locationName: { type: String, required: true },
    storageDate: { type: String }, // ISO
  },
  { _id: false }
);

const cropSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    cropName: { type: String, required: true },
    batchId: { type: String },
    farmerId: { type: String },
    cropType: { type: [String], enum: CROP_TYPES, required: true },
    estimatedWeightKg: { type: Number, required: true },
    harvestDate: { type: String, required: true }, // ISO
    storage: { type: storageSchema, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);

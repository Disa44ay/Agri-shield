const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // MAIN IDENTIFIER

    cropName: { type: String, required: true },
    cropType: [{ type: String }], // array of types
    batchId: { type: String, default: "" },
    farmerId: { type: String, default: "" },

    estimatedWeightKg: { type: Number, required: true },
    harvestDate: { type: String, required: true },

    storage: {
      district: { type: String, default: "" },
      storageName: { type: String, default: "" },
      storageDate: { type: String, default: "" },
    },

    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);

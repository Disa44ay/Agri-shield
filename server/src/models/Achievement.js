const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: {
      type: String,
      enum: ["novice", "intermediate", "pro"],
      default: "novice",
    },
    badgeImage: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);

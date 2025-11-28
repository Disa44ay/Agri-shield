const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },

    // array of strings
    achievements: {
      type: [String],
      required: true,
    },

    // when achievements were awarded
    awardedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);

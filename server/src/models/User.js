const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },

    picture: { type: String, default: "" },
    district: { type: String, default: "" },
    homeAddress: { type: String, default: "" },

    achievements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Achievement",
      },
    ],
  },
  { timestamps: true }
);

// Ensures MongoDB creates correct unique index on `email`
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);

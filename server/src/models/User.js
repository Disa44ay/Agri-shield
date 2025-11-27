const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
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

module.exports = mongoose.model("User", userSchema);

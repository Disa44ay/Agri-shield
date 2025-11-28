const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, default: null },
    division: { type: String, default: null },
    picture: { type: String, default: null },
    homeAddress: { type: String, default: null },
    district: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

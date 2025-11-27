require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const { initFirebaseFromEnv } = require("./middlewares/firebaseAuth");

// routes
const userRoutes = require("./routes/userRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const cropRoutes = require("./routes/cropRoutes");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// init firebase
initFirebaseFromEnv();

// Check Mongo
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => res.json({ message: "Backend working!" }));

// Mount routes - all routes expect caller to provide Firebase token in Authorization header.
// e.g. Authorization: Bearer <idToken>
app.use("/api/users", userRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/crops", cropRoutes);

// global 404
app.use((req, res) =>
  res.status(404).json({ code: "NOT_FOUND", message: "Route not found" })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// routes
const userRoutes = require("./routes/userRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const cropRoutes = require("./routes/cropRoutes");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Connect MongoDB
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

// root route
app.get("/", (req, res) => res.json({ message: "Backend working!" }));

// Mount routes (no Firebase now)
app.use("/api/users", userRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/crops", cropRoutes);

// global 404
app.use((req, res) =>
  res.status(404).json({
    code: "NOT_FOUND",
    message: "Route not found",
  })
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

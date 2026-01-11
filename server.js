const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const eventRoutes = require("./routes/events");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve images

connectDB();

app.use("/api/v3/app", eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

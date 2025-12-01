const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// routes
app.use("/api/v1/user", require("./src/routes/userRoutes"));
app.use("/api/v1/emp", require("./src/routes/employeeRoutes"));

// uploads (static)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// health
app.get("/ping", (_req, res) => res.send("pong"));
app.get("/", (_req, res) => res.send("API is running..."));

// 404
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Route not found" });
});

connectDB();

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

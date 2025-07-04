require("dotenv").config();
const express = require("express");
const { sequelize } = require("./db/connection");
const transactionRoutes = require("./routes/transactions");
const authRoutes = require("./routes/auth");
const healthRoutes = require("./routes/health");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(express.json());

// Public routes
app.use(healthRoutes);
app.use(authRoutes);

// Private routes
app.use(authMiddleware);
app.use("/transactions", transactionRoutes);

module.exports = app;

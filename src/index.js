require("dotenv").config();
const { sequelize } = require("./db/connection");
const express = require("express");
const app = express();

const transactionRoutes = require("./routes/transactions");
const authMiddleware = require("./middleware/auth");
const healthRoutes = require("./routes/health");
const authRoutes = require("./routes/auth");

app.use(express.json());

// Public routes
app.use(authRoutes);
app.use(healthRoutes);

// Private routes
app.use(authMiddleware);
app.use("/transactions", transactionRoutes);

const PORT = 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server on ${PORT}`));
});

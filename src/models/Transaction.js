const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Transaction = sequelize.define("Transaction", {
    origin: DataTypes.INTEGER,
    destination: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: DataTypes.ENUM("pending", "confirmed", "rejected"),
    date: DataTypes.DATE
});

module.exports = Transaction;
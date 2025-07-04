const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    balance: DataTypes.FLOAT
});

module.exports = User;
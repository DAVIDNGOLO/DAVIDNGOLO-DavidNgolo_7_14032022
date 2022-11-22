require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_ENV,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

sequelize.sync({});

module.exports = sequelize;

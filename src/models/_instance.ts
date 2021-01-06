import Sequelize from "sequelize";

require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/database.ts")[env];

const sequelize: Sequelize.Sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
);




export { sequelize };

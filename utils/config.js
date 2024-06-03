require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  PRODUCTION_DATABASE_URL: process.env.PRODUCTION_DATABASE_URL,
  SECRET: process.env.SECRET,
};

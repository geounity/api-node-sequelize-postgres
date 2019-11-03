require('dotenv').config()

module.exports = {
  db: process.env.MONGODB,
  dev: process.env.NODE_ENV !== "production",
  host: process.env.HOST || "http://localhost",
  port: process.env.PORT || 8080
};

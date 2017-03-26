// load environment variables
require('dotenv').config();

// define app settings
module.exports = {
  port: process.env.PORT,
  database: process.env.MONGODB_URL,
  API_USERNAME: process.env.USERNAME,
  API_KEY: process.env.API_KEY
}
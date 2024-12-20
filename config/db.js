//import dependencies
const mysql = require('mysql2');
const dotenv = require('dotenv');

//load environment variables
dotenv.config();

// MySQL Database Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  

  //export pool for use in other parts of the application
  module.exports = pool.promise();

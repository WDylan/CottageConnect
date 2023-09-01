const mysql = require("mysql2");
const dotenv = require("dotenv");

// Configurez votre connexion à la base de données MySQLco
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to the database.");
});

module.exports = connection;

const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

function connectionCheck() {
  return pool.getConnection();
}

function connectionRelease() {
  db.on("release", function (connection) {
    console.log("Connection %d released", connection.threadId);
  });
}

exports.db = pool;
exports.dbConn = {
  connectionCheck: connectionCheck,
  connectionRelease: connectionRelease,
};

const { db } = require("../database/db-config");

const getAllTrains = async () => {
  const sql = "SELECT * FROM `get_order_details`";
  return db.query(sql);
};

module.exports = {
  getAllTrains
};

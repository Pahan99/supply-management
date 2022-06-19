const { db } = require("../database/db-config");

const getAllTrains = async () => {
  const sql = "SELECT * FROM `get_order_details`";
  const result = await db.execute(sql);
  return result;
};

exports.getAllTrains = getAllTrains;

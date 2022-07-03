const { db } = require("../database/db-config");

const getOrderDetails = async () => {
  const sql = "SELECT * FROM `get_train_order_details`";
  const result = await db.query(sql);
  return result[0]
};

module.exports = {
  getOrderDetails,
};

const { db } = require("../database/db-config");

const getOrderDetails = async () => {
  const sql = "SELECT * FROM `get_order_details`";
  return db.query(sql);
};

module.exports = {
    getOrderDetails
};

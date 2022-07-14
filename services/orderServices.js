const { db } = require("../database/db-config");

order_status_list = {
  NOT_LOADED_TRAIN: "not_loaded_train",
  LOADED_TRAIN: "loaded_train",
  IN_STORE: "in_store",
  LOADED_TRUCK: "loaded_truck",
  COMPLETED: "completed",
};

const getOrderDetails = async () => {
  const sql = "SELECT * FROM `order_details`";
  const result = await db.query(sql);
  return result[0];
};

const getOrderDetailsByStatus = async () => {
  const sql = "";
  const result = await db.query(sql);
  return result[0];
};

const updateOrderStatus = async () => {
  const sql = "";
  const result = await db.execute(sql);
  return result[0];
};

const updateOrderDetails = async () => {
  const sql = "";
  const result = await db.execute(sql);
  return result[0];
};

module.exports = {
  getOrderDetails,
  getOrderDetailsByStatus,
  updateOrderStatus,
  updateOrderDetails,
};

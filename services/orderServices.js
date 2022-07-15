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

const getProductDetailsByOrderID = async (order_id) => {
  const sql = "SELECT p.product_id, p.product_name, od.quantity, p.unit_price FROM orders o LEFT JOIN order_details od USING(order_id) LEFT JOIN products p USING (product_id) WHERE order_id=?";
  const result = await db.execute(sql, [order_id]);
  return result[0];
}

module.exports = {
  getOrderDetails,
  getOrderDetailsByStatus,
  updateOrderStatus,
  updateOrderDetails,
  getProductDetailsByOrderID
};

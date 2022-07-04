const { db } = require("../database/db-config");

order_status_list = {
  NOT_LOADED_TRAIN: "not_loaded_train",
  LOADED_TRAIN: "loaded_train",
  IN_STORE: "in_store",
  LOADED_TRUCK: "loaded_truck",
  COMPLETED: "completed",
};

const getAllTrains = async () => {
  const sql = "SELECT * FROM `get_order_details`";
  return db.query(sql);
};

const getAllOrdersFromFactory = async () => {
  const sql =
    "SELECT * FROM `orders` WHERE status=(SELECT status_id FROM `order_status` WHERE status=?)";
  return db.query(sql, [order_status_list.NOT_LOADED_TRAIN]);
};

const addTrainOrderPartition = async () => {
  const sql = "";
  const result = await db.execute(sql);
  return result[0];
};

const updateTrainOrderPartition = async () => {
  const sql = "";
  const result = await db.execute(sql);
  return result[0];
};

const getAllTrainOrderPartitions = async () => {
  const sql = "";
  const result = await db.query(sql);
  return result[0];
};

const getTrainOrderPartitionsByStatus = async () => {
  const sql = "";
  const result = await db.query(sql);
  return result[0];
};

const makePartitions = () => {};

module.exports = {
  getAllTrains,
  addTrainOrderPartition,
  updateTrainOrderPartition,
  makePartitions,
  getAllTrainOrderPartitions,
  getTrainOrderPartitionsByStatus,
  getAllOrdersFromFactory,
};

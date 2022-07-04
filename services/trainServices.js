const { db } = require("../database/db-config");

const getAllTrains = async () => {
  const sql = "SELECT * FROM `get_order_details`";
  return db.query(sql);
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
};

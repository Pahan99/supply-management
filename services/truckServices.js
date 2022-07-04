const { db } = require("../database/db-config");

const getAllTrucks = async () => {
  const sql = "SELECT * FROM `get_order_details`";
  return db.query(sql);
};

const getAllTruckOrderPartitions = async () => {
  const sql = "";
  const result = await db.query(sql);
  return result[0];
};

const getTruckOrderPartitionsByStatus = async () => {
  const sql = "";
  const result = await db.query(sql);
  return result[0];
};

const addTruckOrderPartition = async () => {
  const sql = "";
  const result = await db.execute(sql);
  return result[0];
};

const updateTruckOrderPartition = async () => {
  const sql = "";
  const result = await db.execute(sql);
  return result[0];
};

const makePartitions = () => {};

module.exports = {
  getAllTrucks,
  addTruckOrderPartition,
  updateTruckOrderPartition,
  makePartitions,
  getAllTruckOrderPartitions,
  getTruckOrderPartitionsByStatus
};

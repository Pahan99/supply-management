const { db } = require("../database/db-config");
const { order_status_list, getNextStatus } = require("./helpers/data");
const { make_partitions } = require("./schedulers/trainScheduler");

const getAllTrains = async () => {
  const sql = "SELECT * FROM `get_order_details`";
  return db.query(sql);
};

const getAllOrdersFromFactory = async () => {
  const sql =
    "SELECT * FROM `orders` WHERE status=(SELECT status_id FROM `order_status` WHERE status=?)";
  return db.query(sql, [order_status_list.NOT_LOADED_TRAIN]);
};

const updateTrainOrderPartitions = async (trip_id) => {
  const current_status = await db.query(
    "SELECT (SELECT status FROM order_status WHERE status_id=tp.status_id) AS status FROM train_order_partitions tp  WHERE train_order_partition_id IN (SELECT train_order_partition_id FROM train_trip_details WHERE trip_id=?)",
    [trip_id]
  );

  const next_status = getNextStatus(current_status[0][0].status);
  await db.query(
    "UPDATE train_order_partitions SET status_id=(SELECT status_id FROM order_status WHERE status=?) WHERE train_order_partition_id IN (SELECT train_order_partition_id FROM train_trip_details WHERE trip_id=?)",
    [next_status, trip_id]
  );
};

const getAllTrainOrderPartitions = async () => {
  const sql =
    "SELECT train_order_partition_id,order_id FROM train_order_partitions WHERE status_id=(SELECT status_id FROM order_status WHERE status=?)";
  const result = await db.query(sql, [order_status_list.NOT_LOADED_TRAIN]);
  return result[0];
};

const getTrainOrdersForPartition = async (partition_id) => {
  const sql =
    "SELECT order_id,o.order_date,product_id,quantity,( SELECT quantity*unit_weight) AS weight,order_date FROM order_details LEFT JOIN products USING(product_id) LEFT JOIN orders o USING(order_id) WHERE train_order_partition_id=?";
  const result = await db.query(sql, [partition_id]);
  return result[0];
};

const makePartitions = async () => {
  await make_partitions();
};

const getTrainTripDetails = async (trip_id, status) => {
  const sql =
    "SELECT (SELECT branch_name FROM branches WHERE branch_id=(SELECT branch_id FROM routes WHERE route_id=(SELECT route_id FROM orders WHERE order_id=o.order_id))) AS branch,tp.train_order_partition_id,o.order_date,od.order_id,product_id,quantity,quantity*unit_weight AS weight FROM supply_manage.train_trip_details LEFT JOIN order_details od USING(train_order_partition_id) LEFT JOIN train_order_partitions tp USING(train_order_partition_id) LEFT JOIN orders o ON o.order_id=od.order_id LEFT JOIN products USING(product_id) WHERE tp.status_id=(SELECT status_id FROM order_status WHERE status=?) AND trip_id=?";
  const result = await db.query(sql, [status, trip_id]);
  return result[0];
};

const getTrainTripDetailsByBranch = async (trip_id, status, branch_id) => {
  const sql =
    "SELECT tp.train_order_partition_id,o.order_date,od.order_id,product_id,quantity,quantity*unit_weight AS weight FROM train_trip_details LEFT JOIN order_details od USING(train_order_partition_id) LEFT JOIN train_order_partitions tp USING(train_order_partition_id) LEFT JOIN orders o ON o.order_id=od.order_id LEFT JOIN products USING(product_id)  WHERE tp.status_id=(SELECT status_id FROM order_status WHERE status=?) AND (? IN (SELECT branch_id FROM routes WHERE route_id=o.route_id)) AND trip_id=?";
  const result = await db.query(sql, [status, branch_id, trip_id]);
  return result[0];
};

const getTrainTrips = async () => {
  const sql =
    "SELECT trip_id,train_name,t.departure as dep_time,tt.departure as dep_date,ROUND(capacity-capacity_free,0) AS occupied,capacity,destination FROM train_trips tt LEFT JOIN trains t USING(train_id) WHERE trip_id IN (SELECT DISTINCT trip_id FROM train_trip_details)";
  const result = await db.query(sql);
  return result[0];
};
const getTrainTripsByBranch = async (branch_id) => {
  const sql =
    "SELECT trip_id,train_name,t.departure as dep_time,tt.departure as dep_date,ROUND(capacity-capacity_free,0) AS occupied,capacity,destination FROM train_trips tt LEFT JOIN trains t USING(train_id) WHERE trip_id IN (SELECT DISTINCT trip_id FROM train_trip_details) AND (train_id IN (SELECT train_id FROM train_branches WHERE branch_id=?))";
  const result = await db.query(sql, [branch_id]);
  return result[0];
};

module.exports = {
  getAllTrains,
  updateTrainOrderPartitions,
  makePartitions,
  getAllTrainOrderPartitions,
  getTrainOrdersForPartition,
  getAllOrdersFromFactory,
  getTrainTripDetails,
  getTrainTripDetailsByBranch,
  getTrainTrips,
  getTrainTripsByBranch,
};

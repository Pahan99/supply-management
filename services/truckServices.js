const { db } = require("../database/db-config");
const { make_partitions } = require("./schedulers/truckScheduler");

const getAllTrucks = async () => {
  const sql = "SELECT * FROM `get_order_details`";
  return db.query(sql);
};

const getAllTruckOrderPartitions = async () => {
  const sql = "";
  const result = await db.query(sql);
  return result[0];
};

const getRouteswithOrders = async (branch_id) => {
  const sql =
    "SELECT route_id,  route_name FROM routes WHERE branch_id=? AND route_id IN (SELECT route_id FROM orders WHERE status_id=3)";
  const result = await db.query(sql, [branch_id]);
  return result[0];
};

const getDeliveryID = async (route_id) => {
  const sql =
    "select min(delivery_id) as delivery_id from (select distinct o.route_id, o.order_id, od.product_id, od.truck_order_partition_id,dd.delivery_id,td.truck_id from orders as o left join order_details as od on od.order_id=o.order_id left join delivery_details as dd on dd.truck_order_partition_id=od.truck_order_partition_id left  join truck_deliveries as td on td.delivery_id=dd.delivery_id where o.status_id=3 and o.route_id=? order by truck_id, delivery_id) as t GROUP BY truck_id;";
  const result = await db.query(sql, [route_id]);
  return result[0];
};

const getTruckData = async (delivery_id) => {
  const sql =
    "Select distinct dd.delivery_id, td.truck_id, t.vehicle_no from delivery_details as dd left join truck_deliveries as td on td.delivery_id=dd.delivery_id left join trucks as t on t.truck_id=td.truck_id where dd.delivery_id=?;";
  const result = await db.query(sql, [delivery_id]);
  // console.log(result);
  return result[0];
};

const getViewOrdersData = async (delivery_id) => {
  const sql =
    "Select od.product_id,od.quantity, o.order_date,o.delivery_date,c.address,p.product_name, p.unit_weight*od.quantity as tot_weight from delivery_details as dd left join order_details as od on od.truck_order_partition_id=dd.truck_order_partition_id left join orders as o on od.order_id=o.order_id left join customers as c on c.customer_id=o.customer_id left join products as p on p.product_id=od.product_id left join truck_deliveries as td on td.delivery_id=dd.delivery_id left join trucks as t on t.truck_id=td.truck_id where dd.delivery_id=?;";
  const result = await db.query(sql, [delivery_id]);
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

const getTruckDeliveriesByDriver = async (driver_id) => {
  const sql = "";
  const result = await db.execute(sql);
  return result[0];
};

const makePartitions = async () => {
  await make_partitions();
};

module.exports = {
  getRouteswithOrders,
  getDeliveryID,
  getTruckData,
  getViewOrdersData,
  getAllTrucks,
  addTruckOrderPartition,
  updateTruckOrderPartition,
  makePartitions,
  getAllTruckOrderPartitions,
  getTruckDeliveriesByDriver
};

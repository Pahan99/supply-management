const { db } = require("../database/db-config");
const driverServices = require("./driverServices");
const driverAssistantServices = require("./driverAssistantServices");
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
    "select min(delivery_id) as delivery_id from (select distinct o.route_id, o.order_id, od.product_id, od.truck_order_partition_id,dd.delivery_id,td.truck_id from orders as o left join order_details as od on od.order_id=o.order_id left join delivery_details as dd on dd.truck_order_partition_id=od.truck_order_partition_id left join truck_deliveries as td on td.delivery_id=dd.delivery_id where o.status_id=3 and td.driver_id is null and o.route_id=? order by truck_id, delivery_id) as t GROUP BY truck_id;";
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
  const result = await db.query(sql);
  return result[0];
};

const updateTruckOrderPartitions = async (order_id, delivery_id) => {
  // console.log(order_id, delivery_id);
  const sql =
    "UPDATE truck_order_partitions SET status_id=5 WHERE truck_order_partition_id IN (SELECT truck_order_partition_id FROM truck_order_partitions WHERE order_id=? AND truck_order_partition_id IN (SELECT truck_order_partition_id FROM delivery_details WHERE delivery_id=?))";
  const result = await db.query(sql, [order_id, delivery_id]);
  const count = await db.query(
    "SELECT COUNT(DISTINCT status_id) AS count FROM truck_order_partitions WHERE truck_order_partition_id IN (SELECT truck_order_partition_id FROM delivery_details WHERE delivery_id=?)",
    [delivery_id]
  );
  const distinct = count[0][0].count;
  if (distinct == 1) {
    await db.query(
      "UPDATE truck_deliveries SET delivery_status=TRUE WHERE delivery_id=?",
      [delivery_id]
    );
  }
  // return result[0];
};

const getTruckDeliveriesByDriver = async (driver_id) => {
  const sql =
    "SELECT delivery_id, route_id FROM truck_deliveries WHERE driver_id=? AND delivery_status=0";
  const result = await db.query(sql, [driver_id]);
  return result[0];
};

const getTruckDeliveriesByAssistant = async (driver_id) => {
  const sql =
    "SELECT delivery_id, route_id FROM truck_deliveries WHERE driver_assistant_id=? AND delivery_status=0";
  const result = await db.query(sql, [driver_id]);
  return result[0];
};

const getTruckDeliveriesByDeliveryDetail = async (delivery_id) => {
  const sql =
    "SELECT o.order_id, c.customer_name, c.address, o.order_date, o.delivery_date, p.product_id, p.product_name, od.quantity, p.unit_price FROM order_details od LEFT JOIN orders o USING(order_id) LEFT JOIN customers c USING(customer_id) LEFT JOIN products p USING(product_id) WHERE truck_order_partition_id IN (SELECT truck_order_partition_id FROM delivery_details WHERE delivery_id=?)";
  const result = await db.query(sql, [delivery_id]);
  return result[0];
};

// const getTruckDeliveriesByDeliveryID= async (delivery_id) => {
//   const sql = "SELECT  o.order_id, c.customer_name, c.address, o.order_date, o.route_id, o.delivery_date FROM customers c RIGHT JOIN orders AS o USING(customer_id) RIGHT JOIN truck_order_partitions AS tr USING(order_id) RIGHT JOIN delivery_details AS dd USING(truck_order_partition_id) WHERE delivery_id=?";
//   const result = await db.execute(sql, [delivery_id]);
//   return result[0];
// };

const getRouteByRouteID = async (route_id) => {
  const sql = "SELECT route_name FROM routes WHERE route_id=?";
  const result = await db.query(sql, [route_id]);
  return result[0];
}

const makePartitions = async (branch_id) => {
  await make_partitions(branch_id);
};

const updateAssigned = async (delivery_id, driver_id, assistant_id) => {
  await driverServices.updateAvailability(driver_id);
  await driverAssistantServices.updateAvailability(assistant_id);
  await db.query(
    "UPDATE truck_deliveries SET driver_id=?,driver_assistant_id=?,assigned_at=(SELECT NOW()) WHERE delivery_id=?",
    [driver_id, assistant_id, delivery_id]
  );
  await db.query("SET SQL_SAFE_UPDATES = 0");
  await db.query(
    "UPDATE truck_order_partitions SET status_id=4 WHERE truck_order_partition_id IN (SELECT truck_order_partition_id FROM delivery_details WHERE delivery_id=?)",
    [delivery_id]
  );
  await db.query("SET SQL_SAFE_UPDATES = 1");
};

module.exports = {
  getRouteswithOrders,
  getDeliveryID,
  getTruckData,
  getViewOrdersData,
  getAllTrucks,
  addTruckOrderPartition,
  updateTruckOrderPartitions,
  makePartitions,
  getAllTruckOrderPartitions,
  getTruckDeliveriesByDriver,
  getTruckDeliveriesByDeliveryDetail,
  getRouteByRouteID,
  getTruckDeliveriesByAssistant,
  updateAssigned,
};

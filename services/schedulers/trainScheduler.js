const { db } = require("../../database/db-config");
const { order_status_list } = require("../helpers/data");

const get_new_orders = async () => {
  const new_orders = await db.query(
    "SELECT * FROM orders WHERE status_id=(SELECT status_id FROM order_status WHERE status=?) ORDER BY order_date",
    [order_status_list.NOT_LOADED_TRAIN]
  );
  return new_orders[0];
};

const get_train_trips = async (route_id) => {
  sql =
    "SELECT trip_id,train_id,departure,capacity_free FROM train_trips RIGHT JOIN train_branches USING(train_id) WHERE branch_id=(SELECT branch_id FROM routes WHERE route_id=?) ORDER BY departure ASC, capacity_free DESC";
  const result = await db.query(sql, [route_id]);
  return result[0];
};

// const get_sorted_orders = async () => {
//   const order_ids = await db.query(
//     "SELECT order_id,route_id,status_id FROM orders ORDER BY delivery_date"
//   );
//   return order_ids[0];
// };

const update_train_partitions = async (partitions) => {
  for (let i = 0; i < partitions.length; i++) {
    const partition = partitions[i];
    try {
      // console.log(partition.order_id);
      await db.query("START TRANSACTION");
      await db.query(
        "INSERT INTO train_order_partitions (order_id,status_id) VALUES (?,?)",
        [partition.order_id, partition.status_id]
      );
      const train_order_partition_id = await db.query(
        "SELECT LAST_INSERT_ID() AS train_order_partition_id"
      );

      const p_id = train_order_partition_id[0][0].train_order_partition_id;
      await db.query("INSERT INTO train_trip_details  VALUES (?,?)", [
        p_id,
        partition.trip_id,
      ]);
      // console.log(p_id);
      await db.query("UPDATE train_trips SET capacity_free=? WHERE trip_id=?", [
        partition.trip_weight,
        partition.trip_id,
      ]);
      for (let i = 0; i < partition.products.length; i++) {
        const product = partition.products[i];
        await db.query(
          "UPDATE order_details SET train_order_partition_id=? WHERE product_id=? AND order_id=?",
          [p_id, product.product_id, product.order_id]
        );
      }
      // continue;
      await db.query("COMMIT");
    } catch (err) {
      console.log(err);
      await db.query("ROLLBACK");
    }
  }
};

const get_order_products = async (order_id) => {
  const sql =
    "SELECT order_id, product_id, quantity*unit_weight as product_weight FROM order_details od LEFT JOIN products USING(product_id) WHERE (order_id=? AND train_order_partition_id IS NULL) ORDER BY product_weight DESC";
  product_weights = await db.query(sql, [order_id]);
  return product_weights[0];
};

const add_train_trips = async (route_id) => {
  const trips = await get_train_trips(route_id);
  const train_id = trips[0].train_id;
  const departure = trips[0].departure;
  const updated_dep = await db.query(
    "SELECT DATE_ADD(?,INTERVAL 1 DAY) AS new_dep",
    [departure]
  );
  const capacity = await db.query(
    "SELECT capacity FROM trains WHERE train_id=?",
    [train_id]
  );
  const capacity_free = capacity[0][0].capacity;
  const new_departure = updated_dep[0][0].new_dep;
  // console.log(new_departure);
  await db.query(
    "INSERT INTO train_trips (train_id,departure,capacity_free) VALUES(?,?,?)",
    [train_id, new_departure, capacity_free]
  );
};

const make_partitions = async () => {
  const orders = await get_new_orders();
  let assigned = [];
  let missed = {};
  while (assigned.length != orders.length) {
    for (let i = 0; i < orders.length; i++) {
      const partitions = [];
      const order_id = orders[i].order_id;
      if (assigned.includes(order_id)) continue;
      // console.log(missed);
      if (missed[order_id] == null) missed[order_id] = [];
      const status_id = orders[i].status_id;
      const route_id = orders[i].route_id;

      const product_list = await get_order_products(order_id);
      if (product_list.length == 0) continue;
      const trips = await get_train_trips(route_id);
      if (missed[order_id].length == 0) {
        for (let i = 0; i < product_list.length; i++) {
          const product_id = product_list[i].product_id;
          missed[order_id].push(product_id);
        }
      }
      const min_weight = product_list[product_list.length - 1].product_weight;

      for (let i = 0; i < trips.length; i++) {
        if (missed[order_id].length == 0) continue;
        let trip = trips[i];

        const partition = {
          order_id: order_id,
          status_id: status_id,
          route_id: route_id,
          trip_id: trip.trip_id,
          trip_weight: trip.capacity_free,
          products: [],
        };

        for (let j = 0; j < product_list.length; j++) {
          const detail = product_list[j];

          if (Number(trip.capacity_free) < min_weight) break;
          if (Number(trip.capacity_free) < Number(detail.product_weight))
            continue;
          if (!missed[order_id].includes(detail.product_id)) continue;
          // console.log(detail);
          trip.capacity_free -= detail.product_weight;
          partition.trip_weight = trip.capacity_free;
          partition.products.push(detail);
          var index = missed[order_id].indexOf(detail.product_id);
          missed[order_id].splice(index, 1);

          // added.push(detail.product_id);
        }
        // console.log(order_id, missed[order_id]);
        if (partition.products.length != 0) {
          partitions.push(partition);
          if (missed[order_id].length == 0) break;
        }
      }

      await update_train_partitions(partitions);
      // console.log(order_id, missed[order_id].length == 0);
      if (missed[order_id].length == 0) {
        assigned.push(order_id);
        continue;
      }
      await add_train_trips(route_id);
    }
  }
  process.exit();
};

exports.make_partitions = make_partitions;
// make_partitions();

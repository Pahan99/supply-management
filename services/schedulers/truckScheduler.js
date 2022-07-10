const { db } = require("../../database/db-config");
const { order_status_list } = require("../helpers/data");

const get_orders = async (branch_id) => {
  const order_list = await db.query(
    "SELECT * FROM orders LEFT JOIN routes USING(route_id) WHERE branch_id = ? AND status_id = (SELECT status_id FROM order_status where status=?) ORDER BY order_date",
    [branch_id, order_status_list.IN_STORE]
    //"SELECT * FROM trucks t LEFT JOIN routes r USING(branch_id) LEFT JOIN orders o USING(route_id) LEFT JOIN order_details od USING(order_id) WHERE o.order_id=? AND t.availability = 1 AND t.branch_id = 1 AND od.truck_order_partition_id IS NULL ORDER BY order_date"
  );
  // console.log(order_list[0])
  return order_list[0];
};

const get_orders_products = async (order_id) => {
  const sql =
    "SELECT order_id, product_id, quantity*unit_weight as product_weight FROM order_details od LEFT JOIN products USING(product_id) WHERE (order_id=? AND train_order_partition_id IS NULL) ORDER BY product_weight DESC";
  product_weights = await db.query(sql, [order_id]);
  // console.log(product_weights[0]);
  return product_weights[0];
};

const get_truck_details = async (branch_id = 1) => {
  sql =
    "SELECT * FROM truck_deliveries LEFT JOIN trucks USING(truck_id) where branch_id = ? ORDER BY capacity_free DESC";
  const result = await db.query(sql, [branch_id]);

  // console.log(result[0])
  return result[0];
};

// get_truck_details();
const update_truck_partitions = async (partitions) => {
  for (let i = 0; i < partitions.length; i++) {
    const partition = partitions[i];
    try {
      await db.query("START TRANSACTION");
      await db.query(
        "INSERT INTO truck_order_partitions (order_id,status_id) VALUES (?,?)",
        [partition.order_id, partition.status_id]
      );
      const truck_order_partition_id = await db.query(
        "SELECT LAST_INSERT_ID() AS truck_order_partition_id"
      );

      const p_id = truck_order_partition_id[0][0].truck_order_partition_id;
      await db.query("INSERT INTO delivery_details  VALUES (?,?)", [
        p_id,
        partition.delivery_id,
      ]);
      // console.log(p_id);
      await db.query(
        "UPDATE truck_deliveries SET capacity_free=?,route_id=? WHERE delivery_id=?",
        [partition.trip_weight, partition.route_id, partition.delivery_id]
      );
      for (let i = 0; i < partition.products.length; i++) {
        const product = partition.products[i];
        await db.query(
          "UPDATE order_details SET truck_order_partition_id=? WHERE product_id=? AND order_id=?",
          [p_id, product.product_id, product.order_id]
        );
      }
      // continue;
      await db.query("COMMIT");
    } catch (err) {
      // console.log(err);
      await db.query("ROLLBACK");
    }
  }
};

const add_truck_deliveries = async (branch_id) => {
  const truck_id_detail = await db.query(
    "SELECT truck_id FROM truck_deliveries JOIN trucks USING(truck_id) WHERE branch_id = ? GROUP BY truck_id ORDER BY COUNT(delivery_id) LIMIT 1",
    [branch_id]
  );
  const truck_id = truck_id_detail[0][0].truck_id;

  const capacity = await db.query(
    "SELECT capacity FROM trucks WHERE truck_id=?",
    [truck_id]
  );
  const capacity_free = capacity[0][0].capacity;

  await db.query(
    "INSERT INTO truck_deliveries (truck_id,capacity_free) VALUES(?,?)",
    [truck_id, capacity_free]
  );
};

const make_partitions = async () => {
  branch_id = 1;
  const orders = await get_orders(branch_id);
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

      const product_list = await get_orders_products(order_id);
      if (product_list.length == 0) continue;
      const trucks = await get_truck_details(branch_id);
      if (missed[order_id].length == 0) {
        for (let i = 0; i < product_list.length; i++) {
          const product_id = product_list[i].product_id;
          missed[order_id].push(product_id);
        }
      }
      // console.log(trucks)

      const min_weight = product_list[product_list.length - 1].product_weight;

      for (let i = 0; i < trucks.length; i++) {
        if (missed[order_id].length == 0) continue;
        let truck = trucks[i];
        console.log(truck);
        const partition = {
          order_id: order_id,
          status_id: status_id,
          route_id: route_id,
          delivery_id: truck.delivery_id,

          trip_weight: truck.capacity_free,
          products: [],
        };

        for (let j = 0; j < product_list.length; j++) {
          const detail = product_list[j];

          if (Number(truck.capacity_free) < min_weight) break;
          if (Number(truck.capacity_free) < Number(detail.product_weight))
            continue;

          if (!missed[order_id].includes(detail.product_id)) continue;
          // console.log(detail);
          truck.capacity_free -= detail.product_weight;
          partition.trip_weight = truck.capacity_free;
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

      await update_truck_partitions(partitions);
      // console.log(order_id, missed[order_id].length == 0);
      if (missed[order_id].length == 0) {
        assigned.push(order_id);
        continue;
      }
      await add_truck_deliveries(branch_id);
    }
  }
  process.exit();
};

// exports.make_partitions = make_partitions;
make_partitions();

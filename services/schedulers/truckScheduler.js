const { db } = require("../../database/db-config");
const { order_status_list } = require("../helpers/data");

const get_orders = async() => {
    const order_list = await db.query(
        "SELECT * FROM orders LEFT JOIN routes USING(route_id) WHERE branch_id = 1 AND status_id = (SELECT status_id FROM order_status where status=?) ORDER BY order_date",
        [order_status_list.IN_STORE],
        //"SELECT * FROM trucks t LEFT JOIN routes r USING(branch_id) LEFT JOIN orders o USING(route_id) LEFT JOIN order_details od USING(order_id) WHERE o.order_id=? AND t.availability = 1 AND t.branch_id = 1 AND od.truck_order_partition_id IS NULL ORDER BY order_date"
    );
    console.log(order_list[0])
    return order_list[0];
};

const get_orders_products = async(order_id) => {
    const sql = 
        "SELECT order_id, product_id, quantity*unit_weight as product_weight FROM order_details od LEFT JOIN products USING(product_id) WHERE (order_id=? AND train_order_partition_id IS NULL) ORDER BY product_weight DESC";
    product_weights = await db.query(sql, [order_id]);
    return product_weights[0];
};

const get_truck_details = async(branch_id=1) => {
    sql = 
        "SELECT * FROM truck_deliveries LEFT JOIN trucks USING(truck_id) where branch_id = ? ORDER BY capacity_free DESC";
    const result = await db.query(sql, [branch_id]);
    
    // console.log(result[0])
    return result[0];
}

// get_truck_details();

const make_partitions = async () => {
    const orders = await get_orders();
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
        // const route_id = orders[i].route_id;
        branch_id = 1;
  
        const product_list = await get_order_products(order_id);
        if (product_list.length == 0) continue;
        const trucks = await get_truck_details(branch_id);
        if (missed[order_id].length == 0) {
          for (let i = 0; i < product_list.length; i++) {
            const product_id = product_list[i].product_id;
            missed[order_id].push(product_id);
          }
        }
        const min_weight = product_list[product_list.length - 1].product_weight;
  
        for (let i = 0; i < trucks.length; i++) {
          if (missed[order_id].length == 0) continue;
          let truck = trucks[i];
  
          const partition = {
            order_id: order_id,
            status_id: status_id,
            // route_id: route_id,
            // trip_id: trip.trip_id,
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


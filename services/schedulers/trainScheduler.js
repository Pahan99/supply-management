const { db } = require("../../database/db-config");
const { order_status_list } = require("../helpers/data");

const get_new_orders = async () => {
  const new_orders = await db.query(
    "SELECT * FROM orders WHERE status_id=(SELECT status_id FROM order_status WHERE status=?) ORDER BY order_date",
    [order_status_list.NOT_LOADED_TRAIN]
  );
  return new_orders[0];
};

const get_order_weights = async () => {
  const orders = await get_new_orders();
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const weight = await db.query(
      "SELECT total_weight FROM get_tot_weight WHERE order_id=?",
      [order.order_id]
    );
    order.weight = weight[0][0].total_weight;
  }
  //   process.exit();
  return orders;
};

const make_partitions = async () => {
  const order_weights = await get_order_weights();
  order_weights.forEach(order => {
    
  });
};

make_partitions();

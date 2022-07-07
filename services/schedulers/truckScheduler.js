const { db } = require("../../database/db-config");
const { order_status_list } = require("../helpers/data");

const get_orders = async() => {
    const order_list = await db.query(
        "SELECT * FROM orders LEFT JOIN routes USING(route_id) WHERE branch_id = 1 AND status_id = (SELECT status_id FROM order_status where status=?) ORDER BY order_date",
        [order_status_list.IN_STORE],
        //"SELECT * FROM trucks t LEFT JOIN routes r USING(branch_id) LEFT JOIN orders o USING(route_id) LEFT JOIN order_details od USING(order_id) WHERE o.order_id=? AND t.availability = 1 AND t.branch_id = 1 AND od.truck_order_partition_id IS NULL ORDER BY order_date"
    );
    console.log(order_list[0])
}

get_orders();

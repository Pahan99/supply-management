const { db } = require("../database/db-config");

orders = [
    { customer_id: 1, cost: 0, route_id: 1, status_id: 2, order_date: "2022-06-17", delivery_date: "2022-06-18" }
];

orders.forEach((order) => {
    sql = "INSERT INTO orders (customer_id, cost, route_id, status_id, order_date, delivery_date) VALUES (?,?,?,?,?,?)";
    db.query(sql, [order.customer_id, order.cost, order.route_id, order.status_id, order.order_date, order.delivery_date], function (err, result) {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
});
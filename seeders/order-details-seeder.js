const { db } = require("../database/db-config");

// remove the unit price column from the order_details table
order_details = [
    { order_id: 1, product_id: 1, quantity: 2 },
    { order_id: 1, product_id: 2, quantity: 1 },
    { order_id: 1, product_id: 3, quantity: 3 },
    { order_id: 1, product_id: 1, quantity: 1 },
    { order_id: 1, product_id: 4, quantity: 4 },
    { order_id: 1, product_id: 5, quantity: 4 },
    { order_id: 1, product_id: 2, quantity: 2 },
    { order_id: 1, product_id: 3, quantity: 3 },
    { order_id: 1, product_id: 5, quantity: 1 },
    { order_id: 1, product_id: 1, quantity: 5 },
    { order_id: 1, product_id: 2, quantity: 3 },
    { order_id: 1, product_id: 5, quantity: 1 },
    { order_id: 1, product_id: 3, quantity: 1 },
    { order_id: 1, product_id: 4, quantity: 2 },
];

// remove unit_price
order_details.forEach((order) => {
    sql = "INSERT INTO order_details (order_id, product_id, quantity) VALUES (?,?,?)";
    db.query(sql, [order.order_id, order.product_id, order.quantity, order.unit_price], function (err, result) {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
});
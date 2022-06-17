const { db } = require("../database/db-config");

delivery_details = [
    {
        delivery_id: 1,
        order_id: 1
    },
    {
        delivery_id: 1,
        order_id: 1
    },
    {
        delivery_id: 3,
        order_id: 1
    },
    {
        delivery_id: 3,
        order_id: 1
    },
    {
        delivery_id: 6,
        order_id: 1
    }
    
]

delivery_details.forEach((delivery) => {
    sql = "INSERT INTO delivery_details (delivery_id,order_id) VALUES (?,?)";
    db.query(sql, [delivery.delivery_id, delivery.order_id], function (err, result) {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
});
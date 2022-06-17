const { db } = require("../database/db-config");

// pendingTrain, pendingTruck, 
order_status = [
    { status: "not_loaded_train" },
    { status: "loaded_train" },
    { status: "in_store" },
    { status: "loaded_truck" },
    { status: "completed" }
    
];

order_status.forEach((order_status) => {
  sql = "INSERT INTO order_status (status) VALUES (?)";
  db.query(sql, [order_status.status], function (err, result) {
    if (err) throw err;
    console.log(result);
    process.exit();
  });
});
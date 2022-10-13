const { db } = require("../database/db-config");

// pendingTrain, pendingTruck,
order_status = [
  { status_id: 1, status: "not_loaded_train" },
  { status_id: 2, status: "loaded_train" },
  { status_id: 3, status: "in_store" },
  { status_id: 4, status: "loaded_truck" },
  { status_id: 5, status: "completed" },
];

order_status.forEach((order_status) => {
  sql = "INSERT INTO order_status VALUES (?,?)";
  db.query(sql, [order_status.status_id, order_status.status])
    .then((result) => {
      console.log(result);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});

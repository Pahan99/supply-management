const { db } = require("../database/db-config");

train_trip_details = [
  { order_id: 1, trip_id: 1 },
  { order_id: 1, trip_id: 1 },
  { order_id: 1, trip_id: 1 },
  { order_id: 1, trip_id: 2 },
  { order_id: 1, trip_id: 2 },
  { order_id: 1, trip_id: 2 },
  { order_id: 1, trip_id: 3 },
  { order_id: 1, trip_id: 3 },
  { order_id: 1, trip_id: 3 },
  { order_id: 1, trip_id: 3 },
];

train_trip_details.forEach((trip_details) => {
  sql = "INSERT INTO train_trip_details (order_id, trip_id) VALUES (?,?)";
  db.query(sql, [trip_details.order_id, trip_details.trip_id])
    .then((result) => {
      console.log(result);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});

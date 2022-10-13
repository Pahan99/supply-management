// const { db } = require("../database/db-config");

// truck_delivery = [
//   {
//     delivery_status: "TRUE",
//     driver_assistant_id: 1,
//     driver_id: 2,
//     route_id: 3,
//     truck_id: 2,
//   },
//   {
//     delivery_status: "TRUE",
//     driver_assistant_id: 2,
//     driver_id: 3,
//     route_id: 2,
//     truck_id: 3,
//   },
//   {
//     delivery_status: "TRUE",
//     driver_assistant_id: 2,
//     driver_id: 1,
//     route_id: 1,
//     truck_id: 1,
//   },
//   {
//     delivery_status: "TRUE",
//     driver_assistant_id: 4,
//     driver_id: 2,
//     route_id: 4,
//     truck_id: 5,
//   },
//   {
//     delivery_status: "TRUE",
//     driver_assistant_id: 5,
//     driver_id: 3,
//     route_id: 5,
//     truck_id: 4,
//   },
// ];

// truck_delivery.forEach((delivery) => {
//   sql =
//     "INSERT INTO truck_deliveries (delivery_status, driver_assistant_id,driver_id,route_id,truck_id) VALUES (?,?,?,?,?)";
//   db.query(sql, [
//     delivery.delivery_status,
//     delivery.driver_assistant_id,
//     delivery.driver_id,
//     delivery.route_id,
//     delivery.truck_id,
//   ])
//     .then((result) => {
//       console.log(result);
//       process.exit();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

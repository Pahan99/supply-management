const { db } = require("../database/db-config");

truck_delivery = [
  {
    delivery_id: 1,
    driver_id: 2,
    driver_assistant_id: 1,
    truck_id: 2,
    route_id: 3,
    delivery_status: "TRUE",
  },
  {
    delivery_id: 1,
    driver_id: 3,
    driver_assistant_id: 2,
    truck_id: 3,
    route_id: 2,
    delivery_status: "TRUE",
  },
  {
    delivery_id: 1,
    driver_id: 1,
    driver_assistant_id: 2,
    truck_id: 1,
    route_id: 1,
    delivery_status: "TRUE",
  },
  {
    delivery_id: 1,
    driver_id: 2,
    driver_assistant_id: 4,
    truck_id: 5,
    route_id: 4,
    delivery_status: "TRUE",
  },
  {
    delivery_id: 1,
    driver_id: 3,
    driver_assistant_id: 5,
    truck_id: 4,
    route_id: 5,
    delivery_status: "TRUE",
  },
];

truck_delivery.forEach((delivery) => {
  sql =
    "INSERT INTO truck_deliveries (delivery_id, driver_id, driver_assistant_id, truck_id, route_id,delivery_status, ) VALUES (?,?,?,?,?,?)";
  db.query(sql, [
    delivery.delivery_id,
    delivery.driver_id,
    delivery.driver_assistant_id,
    delivery.truck_id,
    delivery.route_id,
    delivery.delivery_status,
  ])
    .then((result) => {
      console.log(result);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});

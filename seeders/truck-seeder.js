const { db } = require("../database/db-config");

trucks = [
  {
    vehicle_no: "LD - 2323",
    capacity: 1000,
  },
  {
    vehicle_no: "LK - 7565",
    capacity: 950,
  },
  {
    vehicle_no: "LE - 1236",
    capacity: 800,
  },
  {
    vehicle_no: "LN - 9806",
    capacity: 1100,
  },
  {
    vehicle_no: "LM - 5547",
    capacity: 1000,
  },
];

trucks.forEach((truck) => {
  sql = "INSERT INTO trucks (vehicle_no, capacity) VALUES (?,?)";
  db.query(sql, [truck.vehicle_no, truck.capacity])
    .then((result) => {
      console.log(result);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});

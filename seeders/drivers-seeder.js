const { db } = require("../database/db-config");

drivers = [
  {
    user_id: 1,
    availability: "TRUE",
    worked_hours: 10,
    last_delivery_id: 1,
  },
  {
    user_id: 2,
    availability: "FALSE",
    worked_hours: 10,
    last_delivery_id: 3,
  },
  {
    user_id: 1,
    availability: "TRUE",
    worked_hours: 10,
    last_delivery_id: 2,
  },
];

drivers.forEach((driver) => {
  sql = "INSERT INTO drivers VALUES (?,?,?,?)";
  db.query(
    sql,
    [
      driver.user_id,
      driver.availability,
      driver.worked_hours,
      driver.last_delivery_id,
    ],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      process.exit();
    }
  );
});

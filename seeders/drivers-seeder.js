const { db } = require("../database/db-config");

drivers = [
  {
    user_id: 1,
    availability: "TRUE",
    worked_hours: 10,
  },
  {
    user_id: 2,
    availability: "FALSE",
    worked_hours: 10,
  },
  {
    user_id: 3,
    availability: "TRUE",
    worked_hours: 10,
  },
];

drivers.forEach((driver) => {
  sql = "INSERT INTO drivers VALUES (?,?,?)";
  db.query(sql, [driver.user_id, driver.availability, driver.worked_hours])
    .then((result) => {
      console.log(result);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});

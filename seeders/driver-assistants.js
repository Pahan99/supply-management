const { db } = require("../database/db-config");

driver_assistants = [
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

driver_assistants.forEach((driver_assistant) => {
  sql = "INSERT INTO driver_assistants VALUES (?,?,?,?)";
  db.query(
    sql,
    [
      driver_assistant.user_id,
      driver_assistant.availability,
      driver_assistant.worked_hours,
      driver_assistant.last_delivery_id,
    ],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      process.exit();
    }
  );
});

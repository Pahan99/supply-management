const { db } = require("../database/db-config");

driver_assistants = [
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
    user_id: 1,
    availability: "TRUE",
    worked_hours: 10,
  },
];

driver_assistants.forEach((driver_assistant) => {
  sql = "INSERT INTO driver_assistants VALUES (?,?,?)";
  db.query(
    sql,
    [
      driver_assistant.user_id,
      driver_assistant.availability,
      driver_assistant.worked_hours
    ],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      process.exit();
    }
  );
});

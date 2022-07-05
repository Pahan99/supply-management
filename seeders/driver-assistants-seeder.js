// const { db } = require("../database/db-config");

// driver_assistants = [
//   {
//     user_id: 5,
//     availability: "TRUE",
//     worked_hours: 0,
//   },
// ];

// driver_assistants.forEach((driver_assistant) => {
//   sql = "INSERT INTO driver_assistants VALUES (?,?,?)";
//   db.query(sql, [
//     driver_assistant.user_id,
//     driver_assistant.availability,
//     driver_assistant.worked_hours,
//   ])
//     .then((result) => {
//       console.log(result);
//       process.exit();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

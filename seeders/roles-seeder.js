const { db } = require("../database/db-config");

roles = [
  { role_id: 1, role_name: "Supervisor" },
  { role_id: 2, role_name: "Truck Driver" },
  { role_id: 3, role_name: "Truck Driver Assistant" },
];

roles.forEach((role) => {
  sql = "INSERT INTO roles (role_id, role_name) VALUES (?,?)";
  db.query(sql, [role.role_id, role.role_name])
    .then((result) => {
      console.log(result);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});

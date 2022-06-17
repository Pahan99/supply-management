const { db } = require("../database/db-config");

roles = [
  { ID: 1, name: "Supervisor" },
  { ID: 2, name: "Truck Driver" },
  { ID: 3, name: "Truck Driver Assistant" },
];

roles.forEach((role) => {
  sql = "INSERT INTO roles VALUES (?,?)";
  db.query(sql, [role.ID, role.name], function (err, result) {
    if (err) throw err;
    console.log(result);
    return;
  });
});

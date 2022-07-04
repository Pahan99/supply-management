const { db } = require("../database/db-config");

users = [
  {
    user_id: 1,
    name: "akash tharuka",
    email: "test@gmail.com",
    password: "password",
    phone: "0123456789",
    role_id: 1,
    branch_id: 0,
  },
  {
    user_id: 2,
    name: "pahan pahan",
    email: "test2@gmail.com",
    password: "password",
    phone: "0123452289",
    role_id: 2,
    branch_id: 1,
  },
  {
    user_id: 3,
    name: "sanduni sanduni",
    email: "test3@gmail.com",
    password: "password",
    phone: "0123456789",
    role_id: 3,
    branch_id: 1,
  },
  {
    user_id: 4,
    name: "nipun nipun",
    email: "test4@gmail.com",
    password: "password",
    phone: "0123456789",
    role_id: 4,
    branch_id: 1,
  },
  {
    user_id: 5,
    name: "sahan sahan",
    email: "test5@gmail.com",
    password: "password",
    phone: "0123456789",
    role_id: 3,
    branch_id: 1,
  },
];

users.forEach((user) => {
  sql =
    "INSERT INTO users (name, email, password, phone, role_id, branch_id) VALUES (?,?,?,?,?,?)";
  db.query(sql, [
    user.name,
    user.email,
    user.password,
    user.phone,
    user.role_id,
    user.branch_id,
  ])
    .then(() => {
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});

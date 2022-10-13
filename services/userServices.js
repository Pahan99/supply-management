const { db } = require("../database/db-config");
const User = require("../models/User");

const findUser = async (username) => {
  const user = await db.query("SELECT * FROM `users` WHERE `name`=?", [
    username,
  ]);
  return user[0];
};

const findRole = async (user_id) => {
  const role = await db.query(
    "SELECT role_name FROM `users` NATURAL JOIN `roles` WHERE `user_id`=?",
    [user_id]
  );
  return role[0][0].role_name;
};

const findBranch = async (user_id) => {
  const branch = await db.query(
    "SELECT branch_id FROM `users` WHERE `user_id`=?",
    [user_id]
  );
  return branch[0][0].branch_id;
};

module.exports = {
  findUser,
  findRole,
  findBranch,
};

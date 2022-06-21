const { db } = require("../database/db-config");

const findUser = async (username) => {
  const user = await db.query("SELECT * FROM `users` WHERE `name`=?", [
    username,
  ]);
  return user[0];
};

const findRole = async (user_id) => {
  const role = await db.query("SELECT role_name FROM `users` NATURAL JOIN `roles` WHERE `user_id`=?", [user_id]);
  return role[0][0].role_name;
}

module.exports = {
  findUser,
  findRole
};

const { db, dbConn } = require("../database/db-config");

const findUserByUsername = async (username) => {
  const user = await db.query("SELECT * FROM `users` WHERE `name`=?", [
    username,
  ]);
  return user[0];
};

const findRoleByUserId = async (user_id) => {
    const role = await db.query("SELECT role_name FROM `users` NATURAL JOIN `roles` WHERE `user_id`=?", [user_id]);
    return role[0][0].role_name;
  }

  
  exports.findUserByUsername=findUserByUsername;
  exports.findRoleByUserId=findRoleByUserId;
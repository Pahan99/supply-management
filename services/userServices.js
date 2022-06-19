const { db } = require("../database/db-config");

const findUser = async (username) => {
  const user = await db.query("SELECT * FROM `users` WHERE `name`=?", [
    username,
  ]);
  return user[0];
};

exports.findUser = findUser;

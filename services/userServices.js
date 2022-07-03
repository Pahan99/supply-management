const { db } = require("../database/db-config");
const User = require("../models/User");

const findUser = async (username) => {
  const user = await User.findUserByUsername(username);
  return user;
};

const findRole = async (user_id) => {
  const role = await User.findRoleByUserId(user_id);
  return role;
};

module.exports = {
  findUser,
  findRole,
};

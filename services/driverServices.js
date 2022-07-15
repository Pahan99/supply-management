const { db } = require("../database/db-config");

const getAvailableDrivers = async (branch_id) => {
  const sql =
    "SELECT user_id,name,branch_id,weekly_hours,total_hours,availability FROM drivers LEFT JOIN users USING(user_id) WHERE weekly_hours < 60 AND availability = TRUE AND user_id NOT IN (SELECT * FROM last_assigned_driver) AND branch_id=?";
  const result = await db.query(sql, [branch_id]);
  return result[0];
};

const updateAvailability = async (user_id) => {
  await db.query(
    "UPDATE drivers SET availability=(SELECT NOT(SELECT availability FROM drivers WHERE user_id=?)) WHERE user_id=?",
    [user_id, user_id]
  );
};

module.exports = {
  getAvailableDrivers,
  updateAvailability,
};

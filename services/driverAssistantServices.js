const { db } = require("../database/db-config");

const getAvailableDriverAssistants = async (branch_id) => {
  const sql =
    "SELECT user_id, name, branch_id, weekly_hours, total_hours, availability FROM driver_assistants LEFT JOIN users USING(user_id) WHERE weekly_hours < 40 AND availability = 1 AND user_id NOT IN (SELECT d_id_1 as user_id FROM(SELECT driver_assistant_id as d_id_1, LEAD(driver_assistant_id) OVER(ORDER BY assigned_at) as d_id_2 FROM truck_deliveries LIMIT 1) AS t WHERE t.d_id_1 = t.d_id_2) AND branch_id=?";
  const result = await db.query(sql, [branch_id]);
  return result[0];
};
const updateAvailability = async (user_id) => {
  await db.query(
    "UPDATE driver_assistants SET availability=(SELECT NOT(SELECT availability FROM driver_assistants WHERE user_id=?)) WHERE user_id=?",
    [user_id, user_id]
  );
};
module.exports = {
  getAvailableDriverAssistants,
  updateAvailability,
};

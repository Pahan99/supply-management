const { db } = require("../database/db-config");

const getAvailableDrivers = async () => {
  const sql =
    "SELECT * FROM drivers WHERE weekly_hours < 60 AND availability = 1 AND user_id NOT IN (SELECT driver_id FROM truck_deliveries ORDER BY assigned_at LIMIT 1)";
  return db.query(sql);
};

module.exports = {
  getAvailableDrivers,
};

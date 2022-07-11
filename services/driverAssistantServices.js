const { db } = require("../database/db-config");

const getAvailableDriverAssistants = async() =>{
    const sql = "SELECT * FROM driver_assistants WHERE weekly_hours < 40 AND availability = 1 AND user_id NOT IN (SELECT d_id_1 as user_id FROM(SELECT driver_assistant_id as d_id_1, LEAD(driver_assistant_id) OVER(ORDER BY assigned_at) as d_id_2 FROM truck_deliveries LIMIT 1) AS t WHERE t.d_id_1 = t.d_id_2)";
    return db.query(sql);
};

module.exports={
    getAvailableDriverAssistants
};
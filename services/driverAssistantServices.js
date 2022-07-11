const { db } = require("../database/db-config");

const getAvailableDriverAssistants = async() =>{
    const sql = "SELECT * FROM driver_assistants WHERE weekly_hours < 40 AND availability = 1";
    return db.query(sql);
};

module.exports={
    getAvailableDriverAssistants
};
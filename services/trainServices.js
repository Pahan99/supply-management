const { db } = require("../database/db-config");

const getAllTrains = async (id,name) => {
    const sql = "SELECT ... WHERE id=? name=?"
  const result = await db.query(sql,[id,name]);
  console.log(result)
//   return result
// 
};

exports.getAllTrains = getAllTrains;

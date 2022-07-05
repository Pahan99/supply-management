const { db } = require("../database/db-config");

trucks = [
  {
    truck_id: 1,
    vehicle_no: "LD - 2323",
    capacity: 1000,
    branch_id: 1,
  },
  {
    truck_id: 2,
    vehicle_no: "LK - 7565",
    capacity: 950,
    branch_id: 2,
  },
  {
    truck_id: 3,
    vehicle_no: "LE - 1236",
    capacity: 800,
    branch_id: 3,
  },
  {
    truck_id: 4,
    vehicle_no: "LN - 9806",
    capacity: 1100,
    branch_id: 1,
  },
  {
    truck_id: 5,
    vehicle_no: "LM - 5547",
    capacity: 2000,
    branch_id: 4,
  },
  {
    truck_id: 6,
    vehicle_no: "PV - 3464",
    capacity: 600,
    branch_id: 3,
  },
  {
    truck_id: 7,
    vehicle_no: "PB - 3698",
    capacity: 800,
    branch_id: 4,
  },
  {
    truck_id: 8,
    vehicle_no: "LG - 9922",
    capacity: 600,
    branch_id: 2,
  },
  {
    truck_id: 9,
    vehicle_no: "LI - 7445",
    capacity: 1000,
    branch_id: 4,
  },
  {
    truck_id: 10,
    vehicle_no: "LM - 6653",
    capacity: 1000,
    branch_id: 2,
  },
];

async function addTrucks() {
  for (let i = 0; i < trucks.length; i++) {
    truck = trucks[i];
    sql =
      "INSERT INTO trucks (truck_id, vehicle_no, capacity, branch_id) VALUES (?,?,?,?)";
    await db.query(sql, [
      truck.truck_id,
      truck.vehicle_no,
      truck.capacity,
      truck.branch_id,
    ]);
  }
  process.exit();
}
addTrucks();

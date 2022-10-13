const { db } = require("../database/db-config");

routes = [
  {
    route_id: 1,
    route_name: "Colombo - Maharagama",
    completion_time: "01.00",
    branch_id: 1,
  },
  {
    route_id: 2,
    route_name: "Colombo - Gampaha",
    completion_time: "01.50",
    branch_id: 1,
  },
  {
    route_id: 3,
    route_name: "Negombo - Kurunegala",
    completion_time: "03.00",
    branch_id: 2,
  },
  {
    route_id: 4,
    route_name: "Galle - Ambalangoda",
    completion_time: "02.00",
    branch_id: 3,
  },
  {
    route_id: 5,
    route_name: "Matara - Hambantota",
    completion_time: "03.50",
    branch_id: 4,
  },
  {
    route_id: 6,
    route_name: "Jaffna - Kilinochchi",
    completion_time: "02.50",
    branch_id: 5,
  },
  {
    route_id: 7,
    route_name: "Trinco - Vavuniya",
    completion_time: "03.50",
    branch_id: 6,
  },
  {
    route_id: 8,
    route_name: "Colombo - Kalutara",
    completion_time: "02.20",
    branch_id: 1,
  },
  {
    route_id: 9,
    route_name: "Colombo - Rathnapura",
    completion_time: "05.00",
    branch_id: 1,
  },
  {
    route_id: 10,
    route_name: "Colombo - Katunayaka",
    completion_time: "02.00",
    branch_id: 1,
  },
  {
    route_id: 11,
    route_name: "Negombo - Puttalam",
    completion_time: "05.00",
    branch_id: 2,
  },
  {
    route_id: 12,
    route_name: "Galle - Elpitiya",
    completion_time: "02.00",
    branch_id: 3,
  },
  {
    route_id: 13,
    route_name: "Matara - Embilipitiya",
    completion_time: "03.00",
    branch_id: 4,
  },
  {
    route_id: 14,
    route_name: "Trinco - Anuradhapura",
    completion_time: "04.00",
    branch_id: 6,
  },
  {
    route_id: 15,
    route_name: "Jaffna - Mulattivu",
    completion_time: "04.50",
    branch_id: 5,
  },
];

async function add_routes() {
  for (let i = 0; i < routes.length; i++) {
    route = routes[i];
    sql =
      "INSERT INTO routes (route_id, route_name,completion_time,branch_id) VALUES (?,?,?,?)";
    await db.query(sql, [
      route.route_id,
      route.route_name,
      route.completion_time,
      route.branch_id,
    ]);
  }
  process.exit();
}
add_routes();

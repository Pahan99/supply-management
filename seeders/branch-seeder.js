const { db } = require("../database/db-config");

branches = [
  { branch_id: 0, branch_name: "Factory" },
  { branch_id: 1, branch_name: "Colombo" },
  { branch_id: 2, branch_name: "Negombo" },
  { branch_id: 3, branch_name: "Galle" },
  { branch_id: 4, branch_name: "Matara" },
  { branch_id: 5, branch_name: "Jaffna" },
  { branch_id: 6, branch_name: "Trinco" },
];

async function addBranches() {
  for (let i = 0; i < branches.length; i++) {
    branch = branches[i];
    sql = "INSERT INTO branches (branch_id,branch_name) VALUES (?,?)";
    await db.query(sql, [branch.branch_id, branch.branch_name]);
  }
  process.exit();
}
addBranches();

const { db } = require("../database/db-config");

trains = [
  {
    train_id: 1044,
    branch_id: 1,
  },
  {
    train_id: 1044,
    branch_id: 2,
  },
  {
    train_id: 1030,
    branch_id: 1,
  },
  {
    train_id: 1036,
    branch_id: 1,
  },
  {
    train_id: 1036,
    branch_id: 2,
  },
  {
    train_id: 1016,
    branch_id: 1,
  },
  {
    train_id: 8040,
    branch_id: 3,
  },
  {
    train_id: 8040,
    branch_id: 4,
  },
  {
    train_id: 1040,
    branch_id: 4,
  },
  {
    train_id: 1040,
    branch_id: 3,
  },
  {
    train_id: 1020,
    branch_id: 3,
  },
  {
    train_id: 1020,
    branch_id: 1,
  },
  {
    train_id: 1583,
    branch_id: 5,
  },
  {
    train_id: 1002,
    branch_id: 5,
  },
  {
    train_id: 4077,
    branch_id: 5,
  },
  {
    train_id: 7083,
    branch_id: 6,
  },
];

async function addTrainsBranches() {
  for (let i = 0; i < trains.length; i++) {
    train = trains[i];
    sql = "INSERT INTO train_branches (train_id, branch_id) VALUES (?,?)";
    await db.query(sql, [train.train_id, train.branch_id]);
  }
  process.exit();
}

addTrainsBranches();

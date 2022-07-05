const { db } = require("../database/db-config");

trains = [
  {
    train_id: 1044,
    train_name: "1044-LONG DISTANCE",
    departure: "03:40:00",
    destination: "Colombo",
    capacity: 1100,
  },
  {
    train_id: 1030,
    train_name: "1030-INTERCITY",
    departure: "06:15:00",
    destination: "Colombo",
    capacity: 1100,
  },
  {
    train_id: 1036,
    train_name: "COLOMBO COMMUTER",
    departure: "08:00:00",
    destination: "Colombo",
    capacity: 1100,
  },
  {
    train_id: 1016,
    train_name: "Udarata Menike",
    departure: "13:10:00",
    destination: "Colombo",
    capacity: 1200,
  },
  {
    train_id: 8040,
    train_name: "8040-EXPRESS TRAIN",
    departure: "05:00:00",
    destination: "Matara",
    capacity: 1200,
  },
  {
    train_id: 1020,
    train_name: "1020-EXPRESS TRAIN",
    departure: "15:35:00",
    destination: "Colombo",
    capacity: 1120,
  },
  {
    train_id: 1583,
    train_name: "1583-LOCAL TRAIN",
    departure: "18:25:00",
    destination: "Jaffna",
    capacity: 1100,
  },
  {
    train_id: 1002,
    train_name: "1002-INTERCITY",
    departure: "16:50:00",
    destination: "Jaffna",
    capacity: 1150,
  },
  {
    train_id: 4077,
    train_name: "4077-LONG DISTANCE",
    departure: "08:00:00",
    destination: "Jaffna",
    capacity: 1120,
  },
  {
    train_id: 1040,
    train_name: "1040-LONG DISTANCE",
    departure: "10:00:00",
    destination: "Matara",
    capacity: 1120,
  },
  {
    train_id: 7083,
    train_name: "7083-Night Mail",
    departure: "13:00:00",
    destination: "Trincomalee",
    capacity: 1100,
  },
];

async function addTrains() {
  for (let i = 0; i < trains.length; i++) {
    train = trains[i];
    sql =
      "INSERT INTO trains (train_id, train_name, departure, destination,capacity) VALUES (?,?,?,?,?)";
    await db.query(sql, [
      train.train_id,
      train.train_name,
      train.departure,
      train.destination,
      train.capacity,
    ]);
  }
  process.exit();
}

addTrains();

const { db } = require("../database/db-config");

trains = [
  {
    train_name: "Train A",
    start_station: "Colombo",
    end_station: "Galle",
    departure: "2022-06-17 12:19:21"
  },
  {
    train_name: "Train B",
    start_station: "Colombo",
    end_station: "Kandy",
    departure: "2022-06-18 12:20:21"
  },
  {
    train_name: "Train C",
    start_station: "Colombo",
    end_station: "Jaffna",
    departure: "2022-06-19 12:21:21"
  },
];

trains.forEach((train) => {
  sql = "INSERT INTO trains (train_name, start_station, end_station, departure) VALUES (?,?,?,?)";
  db.query(
    sql,
    [train.train_name, train.start_station, train.end_station, train.departure],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      process.exit();
    }
  );
});

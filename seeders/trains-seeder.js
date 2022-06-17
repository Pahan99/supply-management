const { db } = require("../database/db-config");

trains = [
  {
    train_name: "Train A",
    start_station: "Colombo",
    end_station: "Galle",
  },
  {
    train_name: "Train B",
    start_station: "Colombo",
    end_station: "Kandy",

  },
  {
    train_name: "Train C",
    start_station: "Colombo",
    end_station: "Jaffna",
  },
];

trains.forEach((train) => {
  sql = "INSERT INTO trains VALUES (?,?,?)";
  db.query(
    sql,
    [train.train_name, train.start_station, train.end_station],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      return;
    }
  );
});

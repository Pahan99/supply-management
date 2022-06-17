const { db } = require("../database/db-config");

train_trips = [
    { train_id: 1, destination: "Galle", capacity_occupied: 100 },
    { train_id: 2, destination: "Kandy", capacity_occupied: 90 },
    { train_id: 3, destination: "Jaffna", capacity_occupied: 120 }
];

train_trips.forEach((trip) => {
    sql = "INSERT INTO train_trips (train_id, destination, capacity_occupied) VALUES (?,?,?)";
    db.query(sql, [trip.train_id, trip.destination, trip.capacity_occupied], function (err, result) {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
});
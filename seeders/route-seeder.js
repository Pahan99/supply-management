const { db } = require("../database/db-config");

trucks = [
    {
        route_name: "Colombo - Moratuwa"
    },
    {
        route_name: "Colombo - Panadura"
    },
    {
        route_name: "Colombo - Kalutara"
    },
    {
        route_name: "Galle - Hikkaduwa"
    },
    {
        route_name: "Matara - Mirissa"
    },
]

routes.forEach((route) => {
    sql = "INSERT INTO route (route_name, capacity) VALUES (?,?)";
    db.query(sql, [truck.route_name], function (err, result) {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
});
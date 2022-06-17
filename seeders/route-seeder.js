const { db } = require("../database/db-config");

routes = [
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
    sql = "INSERT INTO routes (route_name) VALUES (?)";
    db.query(sql, [route.route_name], function (err, result) {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
});
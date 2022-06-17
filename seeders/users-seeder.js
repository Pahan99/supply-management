const { db } = require("../database/db-config");

users = [
    {
        name: "akash tharuka",
        email: "test@gmail.com",
        password: "password",
        phone: "0123456789",
        role_id: 1
    },
    {
        name: "pahan pahan",
        email: "test2@gmail.com",
        password: "password",
        phone: "0123452289",
        role_id: 2
    },
    {
        name: "sanduni sanduni",
        email: "test3@gmail.com",
        password: "password",
        phone: "0123456789",
        role_id: 3
    },
    {
        name: "nipun nipun",
        email: "test4@gmail.com",
        password: "password",
        phone: "0123456789",
        role_id: 2
    },
    {
        name: "sahan sahan",
        email: "test5@gmail.com",
        password: "password",
        phone: "0123456789",
        role_id: 3
    }
];

users.forEach((user) => {
    sql = "INSERT INTO users (name, email, password, phone, role_id) VALUES (?,?,?,?,?)";
    db.query(sql, [user.name, user.email, user.password, user.phone, user.role_id], function (err, result) {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
});
const { db } = require("../database/db-config");

customers = [
    {
        customer_name: "Sasani", 
        address: "Moratuwa, Colombo", 
        phone: "0771133436"
    },
    {
        customer_name: "Hirun", 
        address: "Karapitiya, Galle", 
        phone: "0775769392"
    },
    {
        customer_name: "Kalani", 
        address: "Temple Rd, Matara", 
        phone: "0779900446"
    },
    {
        customer_name: "Jilan", 
        address: "Flower Rd, Colombo", 
        phone: "0762342234"
    },
    {
        customer_name: "Piumi", 
        address: "Jaffna", 
        phone: "0756780987"
    }
]

customers.forEach((customer) => {
sql = "INSERT INTO customers (customer_name, address, phone) VALUES (?,?,?)";
db.query(sql, [customer.customer_name, customer.address, customer.phone], function (err, result) {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
})
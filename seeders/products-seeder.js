const { db } = require("../database/db-config");

products = [
    {
        product_name: "Toy",
        unit_price: 450,
        allocated_space: 0,
        unit_weight: 0.01
    },
    {
        product_name: "Phone",
        unit_price: 45000,
        allocated_space: 0,
        unit_weight: 0.02
    },
    {
        product_name: "Shoes",
        unit_price: 2000,
        allocated_space: 0,
        unit_weight: 0.5
    },
    {
        product_name: "Denims",
        unit_price: 1800,
        allocated_space: 0,
        unit_weight: 0.01
    },
    {
        product_name: "Bottle",
        unit_price: 500,
        allocated_space: 0,
        unit_weight: 0.01
    }
]

products.forEach((product) => {
    sql = "INSERT INTO products (product_name, unit_price, allocated_space, unit_weight) VALUES (?,?,?,?)";
    db.query(sql, [product.product_name, product.unit_price, product.allocated_space, product.unit_weight], function (err, result) {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
})
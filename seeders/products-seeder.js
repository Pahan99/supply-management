const { db } = require("../database/db-config");

products = [
  {
    product_id: 1,
    product_name: "Shirt Long Sleeved(Large)",
    unit_price: 1800.00,
    allocated_space: 0,
    unit_weight: 0.09,
  },
  {
    product_id: 2,
    product_name: "Shirt Long Sleeved(Medium)",
    unit_price: 1700.00,
    allocated_space: 0,
    unit_weight: 0.09,
  },
  {
    product_id: 3,
    product_name: "Shirt Long Sleeved(Small)",
    unit_price: 1750.00,
    allocated_space: 0,
    unit_weight: 0.08,
  },
  {
    product_id: 4,
    product_name: "Shirt Short Sleeved(Large)",
    unit_price: 1700.00,
    allocated_space: 0,
    unit_weight: 0.085,
  },
  {
    product_id: 5,
    product_name: "Shirt Short Sleeved(Medium)",
    unit_price: 1650.00,
    allocated_space: 0,
    unit_weight: 0.085,
  },
  {
    product_id: 6,
    product_name: "Shirt Long Sleeved(Small)",
    unit_price: 1600.00,
    allocated_space: 0,
    unit_weight: 0.08,
  },
  {
    product_id: 7,
    product_name: "T-Shirt (Large)",
    unit_price: 1600.00,
    allocated_space: 0,
    unit_weight: 0.09,
  },
  {
    product_id: 8,
    product_name: "T-Shirt (Medium)",
    unit_price: 1550.00,
    allocated_space: 0,
    unit_weight: 0.09,
  },
  {
    product_id: 9,
    product_name: "T-Shirt (Small)",
    unit_price: 1500.00,
    allocated_space: 0,
    unit_weight: 0.08,
  },
  {
    product_id: 10,
    product_name: "Trouser (Larger)",
    unit_price: 2000.00,
    allocated_space: 0,
    unit_weight: 0.09,
  },
  {
    product_id: 11,
    product_name: "Trouser (Medium)",
    unit_price: 1900.00,
    allocated_space: 0,
    unit_weight: 0.09,
  },
  {
    product_id: 12,
    product_name: "Trouser (Small)",
    unit_price: 1850.00,
    allocated_space: 0,
    unit_weight: 0.08,
  },  
];

products.forEach((product) => {
  sql =
    "INSERT INTO products (product_id,product_name, unit_price, allocated_space, unit_weight) VALUES (?,?,?,?,?)";
  db.query(sql, [
    product.product_id,
    product.product_name,
    product.unit_price,
    product.allocated_space,
    product.unit_weight,
  ])
    .then((result) => {
      console.log(result);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});

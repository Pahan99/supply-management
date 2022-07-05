const { db } = require("../database/db-config");

orders = [
  {
    order_id:1,
    customer_id: 1,
    route_id: 1,
    status_id: 0,
    order_date: "2022-06-17",
    delivery_date: "2022-07-01",
  },
  {
    order_id:2,
    customer_id: 6,
    route_id: 1,
    status_id: 0,
    order_date: "2022-07-01",
    delivery_date: "2022-07-13",
  },
  {
    order_id:3,
    customer_id: 7,
    route_id: 4,
    status_id: 0,
    order_date: "2022-07-02",
    delivery_date: "2022-07-10",
  },
  {
    order_id:4,
    customer_id: 4,
    route_id: 1,
    status_id: 0,
    order_date: "2022-07-02",
    delivery_date: "2022-07-11",
  },
  {
    order_id:5,
    customer_id: 11,
    route_id: 1,
    status_id: 0,
    order_date: "2022-07-02",
    delivery_date: "2022-07-10",
  },
  {
    order_id:6,
    customer_id: 12,
    route_id: 1,
    status_id: 0,
    order_date: "2022-07-02",
    delivery_date: "2022-07-10",
  },
  {
    order_id:7,
    customer_id: 9,
    route_id: 1,
    status_id: 0,
    order_date: "2022-07-02",
    delivery_date: "2022-07-10",
  },
  {
    order_id:8,
    customer_id: 10,
    route_id: 2,
    status_id: 0,
    order_date: "2022-07-01",
    delivery_date: "2022-07-14",
  },
  {
    order_id:9,
    customer_id: 2,
    route_id: 3,
    status_id: 0,
    order_date: "2022-06-30",
    delivery_date: "2022-07-09",
  },
  {
    order_id:10,
    customer_id: 5,
    route_id: 5,
    status_id: 0,
    order_date: "2022-06-30",
    delivery_date: "2022-07-11",
  },
  {
    order_id:11,
    customer_id: 10,
    route_id: 2,
    status_id: 0,
    order_date: "2022-07-04",
    delivery_date: "2022-07-14",
  },
  {
    order_id:12,
    customer_id: 13,
    route_id: 3,
    status_id: 0,
    order_date: "2022-06-30",
    delivery_date: "2022-07-09",
  },
  {
    order_id:13,
    customer_id: 8,
    route_id: 6,
    status_id: 0,
    order_date: "2022-07-04",
    delivery_date: "2022-07-14",
  },
  {
    order_id:14,
    customer_id: 14,
    route_id: 4,
    status_id: 0,
    order_date: "2022-07-07",
    delivery_date: "2022-07-14",
  },
  {
    order_id:15,
    customer_id: 15,
    route_id: 6,
    status_id: 0,
    order_date: "2022-07-08",
    delivery_date: "2022-07-20",
  },
];

orders.forEach((order) => {
  sql =
    "INSERT INTO orders (order_id,customer_id, route_id, status_id, order_date, delivery_date) VALUES (?,?,?,?,?,?)";
  db.query(sql, [
    order.order_id,
    order.customer_id,
    order.route_id,
    order.status_id,
    order.order_date,
    order.delivery_date,
  ])
    .then((result) => {
      console.log(result);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});

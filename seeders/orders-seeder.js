const { db } = require("../database/db-config");

orders = orders = [
  {
    order_id: 1,
    customer_id: 1,
    route_id: 8,
    status_id: 1,
    order_date: "2022-06-17",
    delivery_date: "2022-07-01",
  },
  {
    order_id: 2,
    customer_id: 6,
    route_id: 10,
    status_id: 1,
    order_date: "2022-07-01",
    delivery_date: "2022-07-13",
  },
  {
    order_id: 3,
    customer_id: 7,
    route_id: 5,
    status_id: 1,
    order_date: "2022-07-02",
    delivery_date: "2022-07-10",
  },
  {
    order_id: 4,
    customer_id: 4,
    route_id: 1,
    status_id: 3,
    order_date: "2022-07-02",
    delivery_date: "2022-07-11",
  },
  {
    order_id: 5,
    customer_id: 11,
    route_id: 10,
    status_id: 1,
    order_date: "2022-07-02",
    delivery_date: "2022-07-10",
  },
  {
    order_id: 6,
    customer_id: 12,
    route_id: 2,
    status_id: 1,
    order_date: "2022-07-02",
    delivery_date: "2022-07-10",
  },
  {
    order_id: 7,
    customer_id: 9,
    route_id: 2,
    status_id: 1,
    order_date: "2022-07-02",
    delivery_date: "2022-07-10",
  },
  {
    order_id: 8,
    customer_id: 10,
    route_id: 3,
    status_id: 1,
    order_date: "2022-07-01",
    delivery_date: "2022-07-14",
  },
  {
    order_id: 9,
    customer_id: 2,
    route_id: 4,
    status_id: 1,
    order_date: "2022-06-30",
    delivery_date: "2022-07-09",
  },
  {
    order_id: 10,
    customer_id: 5,
    route_id: 6,
    status_id: 1,
    order_date: "2022-06-30",
    delivery_date: "2022-07-11",
  },
  {
    order_id: 11,
    customer_id: 10,
    route_id: 3,
    status_id: 1,
    order_date: "2022-07-04",
    delivery_date: "2022-07-14",
  },
  {
    order_id: 12,
    customer_id: 13,
    route_id: 12,
    status_id: 1,
    order_date: "2022-06-30",
    delivery_date: "2022-07-09",
  },
  {
    order_id: 13,
    customer_id: 8,
    route_id: 7,
    status_id: 1,
    order_date: "2022-07-04",
    delivery_date: "2022-07-14",
  },
  {
    order_id: 14,
    customer_id: 14,
    route_id: 5,
    status_id: 1,
    order_date: "2022-07-07",
    delivery_date: "2022-07-14",
  },
  {
    order_id: 15,
    customer_id: 15,
    route_id: 15,
    status_id: 1,
    order_date: "2022-07-08",
    delivery_date: "2022-07-20",
  },
  {
    order_id: 16,
    customer_id: 3,
    route_id: 5,
    status_id: 1,
    order_date: "2022-07-14",
    delivery_date: "2022-07-21",
  },
  {
    order_id: 17,
    customer_id: 16,
    route_id: 9,
    status_id: 1,
    order_date: "2022-07-01",
    delivery_date: "2022-07-14",
  },
  {
    order_id: 18,
    customer_id: 17,
    route_id: 11,
    status_id: 1,
    order_date: "2022-07-05",
    delivery_date: "2022-07-15",
  },
  {
    order_id: 19,
    customer_id: 18,
    route_id: 13,
    status_id: 1,
    order_date: "2022-07-08",
    delivery_date: "2022-07-20",
  },
  {
    order_id: 20,
    customer_id: 19,
    route_id: 14,
    status_id: 1,
    order_date: "2022-07-04",
    delivery_date: "2022-07-14",
  },
  {
    order_id: 21,
    customer_id: 20,
    route_id: 1,
    status_id: 1,
    order_date: "2022-07-14",
    delivery_date: "2022-07-28",
  },
  {
    order_id: 22,
    customer_id: 1,
    route_id: 8,
    status_id: 1,
    order_date: "2022-07-05",
    delivery_date: "2022-07-17",
  },
  {
    order_id: 23,
    customer_id: 2,
    route_id: 4,
    status_id: 1,
    order_date: "2022-07-10",
    delivery_date: "2022-07-20",
  },
  {
    order_id: 24,
    customer_id: 3,
    route_id: 5,
    status_id: 1,
    order_date: "2022-07-05",
    delivery_date: "2022-07-14",
  },
  {
    order_id: 25,
    customer_id: 4,
    route_id: 1,
    status_id: 1,
    order_date: "2022-07-02",
    delivery_date: "2022-07-10",
  },
  {
    order_id: 26,
    customer_id: 5,
    route_id: 6,
    status_id: 1,
    order_date: "2022-07-01",
    delivery_date: "2022-07-11",
  },
  {
    order_id: 27,
    customer_id: 6,
    route_id: 10,
    status_id: 1,
    order_date: "2022-07-14",
    delivery_date: "2022-07-25",
  },
  {
    order_id: 28,
    customer_id: 7,
    route_id: 5,
    status_id: 1,
    order_date: "2022-07-11",
    delivery_date: "2022-07-20",
  },
  {
    order_id: 29,
    customer_id: 8,
    route_id: 7,
    status_id: 1,
    order_date: "2022-07-15",
    delivery_date: "2022-07-26",
  },
  {
    order_id: 30,
    customer_id: 9,
    route_id: 2,
    status_id: 1,
    order_date: "2022-07-12",
    delivery_date: "2022-07-21",
  },
  {
    order_id: 31,
    customer_id: 11,
    route_id: 10,
    status_id: 1,
    order_date: "2022-07-13",
    delivery_date: "2022-07-24",
  },
  {
    order_id: 32,
    customer_id: 12,
    route_id: 10,
    status_id: 1,
    order_date: "2022-07-13",
    delivery_date: "2022-07-24",
  },
  {
    order_id: 33,
    customer_id: 13,
    route_id: 12,
    status_id: 1,
    order_date: "2022-07-09",
    delivery_date: "2022-07-18",
  },
  {
    order_id: 34,
    customer_id: 14,
    route_id: 5,
    status_id: 1,
    order_date: "2022-07-15",
    delivery_date: "2022-07-23",
  },
  {
    order_id: 35,
    customer_id: 15,
    route_id: 15,
    status_id: 1,
    order_date: "2022-07-13",
    delivery_date: "2022-07-20",
  },
  {
    order_id: 36,
    customer_id: 16,
    route_id: 9,
    status_id: 1,
    order_date: "2022-07-15",
    delivery_date: "2022-07-30",
  },
  {
    order_id: 37,
    customer_id: 17,
    route_id: 1,
    status_id: 1,
    order_date: "2022-07-09",
    delivery_date: "2022-07-20",
  },
  {
    order_id: 38,
    customer_id: 18,
    route_id: 13,
    status_id: 1,
    order_date: "2022-07-01",
    delivery_date: "2022-07-08",
  },
  {
    order_id: 39,
    customer_id: 19,
    route_id: 14,
    status_id: 1,
    order_date: "2022-07-14",
    delivery_date: "2022-07-22",
  },
  {
    order_id: 40,
    customer_id: 20,
    route_id: 1,
    status_id: 1,
    order_date: "2022-07-01",
    delivery_date: "2022-07-13",
  },
  {
    order_id: 41,
    customer_id: 1,
    route_id: 8,
    status_id: 1,
    order_date: "2022-07-14",
    delivery_date: "2022-07-23",
  },
  {
    order_id: 42,
    customer_id: 2,
    route_id: 4,
    status_id: 1,
    order_date: "2022-07-18",
    delivery_date: "2022-07-29",
  },
  {
    order_id: 43,
    customer_id: 3,
    route_id: 5,
    status_id: 1,
    order_date: "2022-07-20",
    delivery_date: "2022-07-30",
  },
  {
    order_id: 44,
    customer_id: 4,
    route_id: 1,
    status_id: 1,
    order_date: "2022-07-13",
    delivery_date: "2022-07-24",
  },
  {
    order_id: 45,
    customer_id: 5,
    route_id: 6,
    status_id: 1,
    order_date: "2022-07-15",
    delivery_date: "2022-07-30",
  },
];

async function add_orders() {
  for (let i = 0; i < orders.length; i++) {
    order = orders[i];
    sql =
      "INSERT INTO orders (order_id,customer_id, route_id, status_id, order_date, delivery_date) VALUES (?,?,?,?,?,?)";
    await db.query(sql, [
      order.order_id,
      order.customer_id,
      order.route_id,
      order.status_id,
      order.order_date,
      order.delivery_date,
    ]);
  }
  process.exit();
}
add_orders();

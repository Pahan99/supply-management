const { db } = require("../database/db-config");
const report_tests = require("../test/report_tests");

const getQuarterYearlySalesDetails = async (year, quarter) => {
  let end = 3 * quarter;
  let start = end - 2;

  // uncomment the line below for testing
  // report_tests.testGetQuarterYearlySalesDetails(year, quarter);

  // once the column in the where cluase is wrapped with a function, indexing won't optimize the query

  const sql_num_of_sales = `SELECT SUM(quantity) as num_of_sales 
                            FROM order_details LEFT OUTER JOIN orders 
                            USING(order_id) 
                            WHERE EXTRACT(YEAR FROM order_date)=? AND 
                            EXTRACT(MONTH FROM order_date) BETWEEN ? AND ? 
                            AND status_id=5;`;

  const sql_revenue = `SELECT SUM(unit_price*quantity) AS cost 
                        FROM order_details 
                        LEFT OUTER JOIN orders USING(order_id) 
                        LEFT OUTER JOIN products USING(product_id) 
                        WHERE EXTRACT(YEAR FROM order_date)=? AND 
                        EXTRACT(MONTH FROM order_date) BETWEEN ? AND ?
                        AND status_id=5;`;

  const data_num_of_sales = await db.query(sql_num_of_sales, [
    year,
    start,
    end,
  ]);
  const data_revenue = await db.query(sql_revenue, [year, start, end]);

  const num_of_sales = data_num_of_sales[0][0].num_of_sales
    ? data_num_of_sales[0][0].num_of_sales
    : 0;
  const revenue = data_revenue[0][0].cost ? data_revenue[0][0].cost : 0;

  const result = {
    num_of_sales,
    revenue,
  };

  return result;
};

const getCityRouteSalesDetails = async (branch, route) => {
  const branch_id = branch;
  const route_id = route;

  // uncomment the line below for testing
  // report_tests.testGetCityRouteSalesDetails(branch, route);

  // number of sales per route per branch
  const sql_num_of_sales = `SELECT SUM(quantity) AS num_of_sales 
                                FROM order_details LEFT OUTER JOIN orders USING(order_id) 
                                LEFT OUTER JOIN routes USING(route_id)
                                WHERE status_id=5
                                AND branch_id=?
                                AND route_id=?;`;

  // revenue per route per branch
  const sql_revenue = `SELECT SUM(unit_price*quantity) AS cost 
                            FROM order_details 
                            LEFT OUTER JOIN orders USING(order_id) 
                            LEFT OUTER JOIN products USING(product_id) 
                            LEFT OUTER JOIN routes USING(route_id) 
                            WHERE status_id=5
                            AND branch_id=?
                            AND route_id=?;`;

  const data_num_of_sales = await db.query(sql_num_of_sales, [
    branch_id,
    route_id,
  ]);
  const data_revenue = await db.query(sql_revenue, [branch_id, route_id]);

  const num_of_sales = data_num_of_sales[0][0].num_of_sales
    ? data_num_of_sales[0][0].num_of_sales
    : 0;
  const revenue = data_revenue[0][0].cost ? data_revenue[0][0].cost : 0;

  const result = {
    num_of_sales,
    revenue,
  };

  return result;
};

const getRoutesForBranch = async (branch) => {
  const sql_routes = `SELECT route_id, route_name 
                        FROM routes 
                        WHERE branch_id=?;`;
  const routes = await db.query(sql_routes, [branch]);

  return routes[0];
};

const getTrendingItemsDetails = async () => {
  // uncomment the line below for testing
  // report_tests.testGetTrendingItemsDetails();

  const sql_trending_products = `SELECT DISTINCT product_id, product_name, unit_price, quantity 
                                FROM order_details 
                                LEFT OUTER JOIN orders USING(order_id) 
                                LEFT OUTER JOIN products USING(product_id)
                                WHERE status_id=5 
                                ORDER BY quantity DESC LIMIT 10;`;

  const trending_product_details = await db.query(sql_trending_products);
  return trending_product_details[0];
};

const getDriverDetails = async () => {
  // uncomment the line below for testing
  // report_tests.testGetDriverDetails();

  const sql_driver_details = `SELECT user_id, name, total_hours FROM drivers LEFT OUTER JOIN users USING(user_id);`;
  const sql_assistant_details = `SELECT user_id, name, total_hours FROM driver_assistants LEFT OUTER JOIN users USING(user_id);`;

  const driver_details = await db.query(sql_driver_details);
  const assistant_details = await db.query(sql_assistant_details);

  const result = {
    driver_details: driver_details[0],
    assistant_details: assistant_details[0],
  };

  return result;
};

const getTruckDetails = async () => {
  const sql_used_hours = `SELECT truck_id, vehicle_no, SUM(completion_time) AS used_time 
                            FROM truck_deliveries 
                            LEFT OUTER JOIN trucks 
                            USING(truck_id) 
                            LEFT OUTER JOIN routes 
                            USING(route_id) 
                            GROUP BY truck_id;`;

  const data_used_hours = await db.query(sql_used_hours);

  return data_used_hours[0];
};

const getCustomerCount = async () => {
  const sql_customer_count = `SELECT COUNT(DISTINCT customer_id) AS customer_count FROM customers`;

  const customer_count = await db.query(sql_customer_count);

  return customer_count[0][0].customer_count;
};

const getTotalSales = async () => {
  const sql_total_sales = `SELECT SUM(quantity) AS total_sales FROM order_details LEFT OUTER JOIN orders USING(order_id) WHERE status_id=5`;

  const total_sales = await db.query(sql_total_sales);

  return total_sales[0][0].total_sales;
};

const getOrderCustomerDetails = async () => {
  const sql_order_customer_details = `SELECT customer_id, customer_name, order_id, status, order_date 
                                        FROM orders LEFT OUTER JOIN customers 
                                        USING(customer_id) LEFT OUTER JOIN order_status 
                                        USING(status_id) 
                                        ORDER BY order_date;`;

  const order_customer_details = await db.query(sql_order_customer_details);

  return order_customer_details[0];
};

module.exports = {
  getQuarterYearlySalesDetails,
  getCityRouteSalesDetails,
  getTrendingItemsDetails,
  getDriverDetails,
  getTruckDetails,
  getCustomerCount,
  getTotalSales,
  getRoutesForBranch,
  getOrderCustomerDetails,
};

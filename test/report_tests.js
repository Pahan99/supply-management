const { db } = require("../database/db-config");

const testGetQuarterYearlySalesDetails = async (year, quarter) => {
    let end = 3 * quarter;
    let start = end - 2;

    const sql_num_of_sales = `SELECT quantity, EXTRACT(YEAR FROM order_date) AS year, EXTRACT(MONTH FROM order_date) AS month 
                            FROM order_details LEFT OUTER JOIN orders 
                            USING(order_id) 
                            WHERE EXTRACT(YEAR FROM order_date)=? AND 
                            EXTRACT(MONTH FROM order_date) BETWEEN ? AND ? 
                            AND status_id=5;`;

    const sql_revenue = `SELECT unit_price, quantity, unit_price*quantity AS cost, EXTRACT(YEAR FROM order_date) AS year, 
                        EXTRACT(MONTH FROM order_date) AS month 
                        FROM order_details 
                        LEFT OUTER JOIN orders USING(order_id) 
                        LEFT OUTER JOIN products USING(product_id) 
                        WHERE EXTRACT(YEAR FROM order_date)=? AND 
                        EXTRACT(MONTH FROM order_date) BETWEEN ? AND ?
                        AND status_id=5;`;

    const data_num_of_sales = await db.query(sql_num_of_sales, [year, start, end]);
    const data_revenue = await db.query(sql_revenue, [year, start, end]);

    console.log("data number of sales: ");
    console.log(data_num_of_sales[0]);

    console.log("data revenue: ");
    console.log(data_revenue[0]);
}

const testGetCityRouteSalesDetails = async (branch, route) => {
    const branch_id = branch;
    const route_id = route;

    // number of sales per route per branch
    const sql_num_of_sales = `SELECT quantity, branch_id, route_id 
                                FROM order_details LEFT OUTER JOIN orders USING(order_id) 
                                LEFT OUTER JOIN routes USING(route_id)
                                WHERE status_id=5
                                AND branch_id=?
                                AND route_id=?;`;

    // revenue per route per branch
    const sql_revenue = `SELECT unit_price, quantity, unit_price*quantity AS cost, branch_id, route_id 
                            FROM order_details 
                            LEFT OUTER JOIN orders USING(order_id) 
                            LEFT OUTER JOIN products USING(product_id) 
                            LEFT OUTER JOIN routes USING(route_id) 
                            WHERE status_id=5
                            AND branch_id=?
                            AND route_id=?;`;

    const data_num_of_sales = await db.query(sql_num_of_sales, [branch_id, route_id]);
    const data_revenue = await db.query(sql_revenue, [branch_id, route_id]);

    console.log("data number of sales: ");
    console.log(data_num_of_sales[0]);

    console.log("data revenue: ");
    console.log(data_revenue[0]);
}

const testGetTrendingItemsDetails = async () => {
    const sql_trending_products = `SELECT DISTINCT product_id, product_name, unit_price, quantity 
                                FROM order_details 
                                LEFT OUTER JOIN orders USING(order_id) 
                                LEFT OUTER JOIN products USING(product_id)
                                WHERE status_id=5 
                                ORDER BY quantity DESC LIMIT 10;`;

    const trending_product_details = await db.query(sql_trending_products);
    console.log("trending product details: ");
    console.log(trending_product_details[0]);
}

const testGetDriverDetails = async () => {
    const sql_driver_details = `SELECT user_id, name, weekly_hours FROM drivers LEFT OUTER JOIN users USING(user_id);`;
    const sql_assistant_details = `SELECT user_id, name, weekly_hours FROM driver_assistants LEFT OUTER JOIN users USING(user_id);`;

    const driver_details = await db.query(sql_driver_details);
    const assistant_details = await db.query(sql_assistant_details);

    console.log("driver details: ");
    console.log(driver_details[0]);

    console.log("driver assistant details: ");
    console.log(assistant_details[0]);
}

const testGetTruckDetails = async () => {
    const sql_total_used_time = `SELECT SUM(completion_time) AS total_used_time 
                            FROM truck_deliveries LEFT OUTER JOIN routes 
                            USING(route_id) 
                            WHERE delivery_status=5;`;
    
    const data_total_used_time = await db.query(sql_total_used_time);
    const total_used_time = (data_total_used_time[0][0].total_used_time) ? data_total_used_time[0][0].total_used_time : 0;

    // console.log((total_used_time) ? total_used_time : 0);

    result = {
        total_used_time,
    }

    return result;
}

const testGetCustomerCount = async () => {
    const sql_customer_count = `SELECT COUNT(DISTINCT customer_id) AS customer_count FROM customers`;

    const customer_count = await db.query(sql_customer_count);

    console.log("customer count: " + customer_count);
}

const testGetTotalSales = async () => {
    const sql_total_sales = `SELECT SUM(quantity) AS total_sales FROM order_details LEFT OUTER JOIN orders USING(order_id) WHERE status_id=5`;

    const total_sales = await db.query(sql_total_sales);

    console.log("total sales: " + total_sales);
}

const testGetOrderCustomerDetails = async () => {
    const sql_order_customer_details = `SELECT customer_id, customer_name, order_id, status, order_date 
                                        FROM orders LEFT OUTER JOIN customers 
                                        USING(customer_id) LEFT OUTER JOIN order_status 
                                        USING(status_id) 
                                        ORDER BY order_date;`;

    const order_customer_details = await db.query(sql_order_customer_details);

    console.log("order customer details: ");
    console.log(order_customer_details);
}

module.exports = {
    testGetQuarterYearlySalesDetails,
    testGetCityRouteSalesDetails,
    testGetTrendingItemsDetails,
    testGetDriverDetails,
    testGetTruckDetails,
    testGetCustomerCount,
    testGetTotalSales,
    testGetOrderCustomerDetails,
}

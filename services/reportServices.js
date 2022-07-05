const { db } = require("../database/db-config");

const getQuarterYearlySalesDetails = async (year, quarter) => {
    let end = 3 * quarter;
    let start = end - 2;

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

    const data_num_of_sales = await db.query(sql_num_of_sales, [year, start, end]);
    const data_revenue = await db.query(sql_revenue, [year, start, end]);

    const num_of_sales = (data_num_of_sales[0][0].num_of_sales) ? data_num_of_sales[0][0].num_of_sales : 0;
    const revenue = (data_revenue[0][0].cost) ? data_revenue[0][0].cost : 0;

    const result = {
        num_of_sales,
        revenue,
    }

    return result;
}

const getCityRouteSalesDetails = async (branch, route) => {
    const branch_id = branch;
    const route_id = route;

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

    const data_num_of_sales = await db.query(sql_num_of_sales, [branch_id, route_id]);
    const data_revenue = await db.query(sql_revenue, [branch_id, route_id]);

    const num_of_sales = (data_num_of_sales[0][0].num_of_sales) ? data_num_of_sales[0][0].num_of_sales : 0;
    const revenue = (data_revenue[0][0].cost) ? data_revenue[0][0].cost : 0;

    const result = {
        num_of_sales,
        revenue,
    }

    return result;
}

const getTrendingItemsDetails = async () => {
    const sql_trending_products = `SELECT product_id, product_name, unit_price, quantity 
                                FROM order_details 
                                LEFT OUTER JOIN orders USING(order_id) 
                                LEFT OUTER JOIN products USING(product_id)
                                WHERE status_id=5 
                                ORDER BY quantity DESC LIMIT 3;`;

    const trending_product_details = await db.query(sql_trending_products);
    return trending_product_details[0];
}

const getDriverDetails = async () => {
    const sql_driver_details = `SELECT user_id, name, worked_hours FROM drivers LEFT OUTER JOIN users USING(user_id);`;
    const sql_assistant_details = `SELECT user_id, name, worked_hours FROM driver_assistants LEFT OUTER JOIN users USING(user_id);`;

    const driver_details = await db.query(sql_driver_details);
    const assistant_details = await db.query(sql_assistant_details);

    const result = {
        driver_details: driver_details[0], 
        assistant_details: assistant_details[0],
    }

    return result;
}

const getTruckDetails = async () => {
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

module.exports = {
    getQuarterYearlySalesDetails,
    getCityRouteSalesDetails,
    getTrendingItemsDetails,
    getDriverDetails,
    getTruckDetails,
}
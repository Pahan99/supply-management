CREATE VIEW get_tot_weight AS SELECT 
    od.order_id,
    SUM(p.unit_weight*od.quantity) AS total_weight
FROM order_details od
LEFT JOIN products p USING(product_id)
GROUP BY order_id;
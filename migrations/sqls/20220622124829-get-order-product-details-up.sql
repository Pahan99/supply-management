CREATE VIEW `get_order_product_details` AS SELECT 
    od.order_id,
    p.product_name,
    od.quantity,
    p.unit_weight*od.quantity AS total_weight
FROM order_details od
LEFT JOIN products p USING(product_id);
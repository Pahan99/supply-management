CREATE VIEW get_order_details AS SELECT 
	o.order_id,
	c.address,
    t.train_name,
    t.start_station,
    t.end_station,
    t.departure,
    o.order_date,
    p.product_name,
    os.status,
    (SELECT p.unit_weight*od.quantity WHERE od.product_id = p.product_id) AS weight
FROM order_details od
LEFT JOIN orders o USING(order_id)
LEFT JOIN customers c USING(customer_id)
LEFT JOIN train_trip_details ttd USING(order_id)
LEFT JOIN train_trips tt USING(trip_id)
LEFT JOIN trains t USING(train_id)
LEFT JOIN products p USING(product_id)
LEFT JOIN order_status os USING(status_id)
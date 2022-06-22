CREATE VIEW get_train_order_details AS SELECT 
	o.order_id,
	c.address,
    t.train_name,
    t.start_station,
    t.end_station,
    t.departure,
    o.order_date,
    os.status,
    tt.capacity_occupied
FROM orders o
LEFT JOIN order_details od USING(order_id)
LEFT JOIN customers c USING(customer_id)
LEFT JOIN train_trip_details ttd USING(order_id)
LEFT JOIN train_trips tt USING(trip_id)
LEFT JOIN trains t USING(train_id)
LEFT JOIN order_status os USING(status_id)
group by order_id;
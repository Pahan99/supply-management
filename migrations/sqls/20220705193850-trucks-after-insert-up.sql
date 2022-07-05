CREATE TRIGGER trucks_after_insert
	AFTER INSERT ON trucks
    FOR EACH ROW
BEGIN
	IF (NEW.truck_id NOT IN (SELECT truck_id FROM truck_deliveries)) THEN
		INSERT INTO truck_deliveries (truck_id,capacity_free)  VALUES (NEW.truck_id,NEW.capacity);
    END IF;
    
END
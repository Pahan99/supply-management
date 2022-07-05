CREATE TRIGGER trains_after_insert
	AFTER INSERT ON trains
    FOR EACH ROW
BEGIN
	IF (NEW.train_id NOT IN (SELECT train_id FROM train_trips WHERE departure = DATE(NOW()))) THEN
		INSERT INTO train_trips (train_id,departure,capacity_occupied)  VALUES (NEW.train_id,DATE(NOW()),NEW.capacity);
    END IF;
    
END
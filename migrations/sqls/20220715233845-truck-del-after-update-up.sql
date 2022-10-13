CREATE TRIGGER truck_deliveries_after_update
 AFTER UPDATE ON truck_deliveries
    FOR EACH ROW
BEGIN
 IF (OLD.delivery_status != NEW.delivery_status) THEN
	UPDATE drivers SET weekly_hours = weekly_hours+(SELECT completion_time FROM routes WHERE route_id=OLD.route_id),total_hours= total_hours+(SELECT completion_time FROM routes WHERE route_id=OLD.route_id) WHERE user_id=OLD.driver_id;
	UPDATE driver_assistants SET weekly_hours = weekly_hours+(SELECT completion_time FROM routes WHERE route_id=OLD.route_id),total_hours= total_hours+(SELECT completion_time FROM routes WHERE route_id=OLD.route_id) WHERE user_id=OLD.driver_assistant_id;
 END IF;
    
END
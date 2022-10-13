CREATE TRIGGER truck_order_partitions_after_update
 AFTER UPDATE ON truck_order_partitions
    FOR EACH ROW
BEGIN
 IF ((select count(DISTINCT status_id) AS statuses FROM (SELECT * FROM truck_order_partitions WHERE order_id=NEW.order_id) as T)=1) THEN
  UPDATE orders SET status_id=NEW.status_id WHERE order_id=NEW.order_id;
    END IF;
  /* IF ((NEW.status_id=5) AND (SELECT COUNT(DISTINCT status_id) AS count FROM truck_order_partitions WHERE truck_order_partition_id IN (SELECT truck_order_partition_id FROM delivery_details WHERE delivery_id=(SELECT delivery_id FROM delivery_details WHERE truck_order_partition_id=NEW.truck_order_partition_id)) =1)) THEN
    UPDATE truck_deliveries SET delivery_status=TRUE WHERE delivery_id IN (SELECT delivery_id FROM delivery_details WHERE truck_order_partition_id=NEW.truck_order_partition_id);
    END IF;  */
END
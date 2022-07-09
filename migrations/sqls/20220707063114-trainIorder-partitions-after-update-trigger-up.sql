CREATE TRIGGER train_order_partitions_after_update
 AFTER UPDATE ON train_order_partitions
    FOR EACH ROW
BEGIN
 IF ((select count(DISTINCT status_id) AS statuses FROM (SELECT * FROM train_order_partitions WHERE order_id=NEW.order_id) as T)=1) THEN
  UPDATE orders SET status_id=NEW.status_id WHERE order_id=NEW.order_id;
    END IF;
    
END
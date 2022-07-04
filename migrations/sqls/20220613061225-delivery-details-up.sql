CREATE TABLE `delivery_details` (
	`truck_order_partition_id` INT NOT NULL,
	`delivery_id` INT NOT NULL,
    CONSTRAINT `delivery_details_fk0` FOREIGN KEY (`delivery_id`) REFERENCES `truck_deliveries`(`delivery_id`) ON DELETE CASCADE,
    CONSTRAINT `delivery_details_fk1` FOREIGN KEY (`truck_order_partition_id`) REFERENCES `truck_order_partitions`(`truck_order_partition_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
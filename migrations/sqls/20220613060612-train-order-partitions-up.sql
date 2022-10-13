CREATE TABLE `train_order_partitions` (
	`train_order_partition_id` INT NOT NULL AUTO_INCREMENT,
	`order_id` INT NOT NULL,
	`status_id` INT NOT NULL,
	PRIMARY KEY (`train_order_partition_id`),
    CONSTRAINT `train_order_partitions_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
    CONSTRAINT `train_order_partitions_fk1` FOREIGN KEY (`status_id`) REFERENCES `order_status`(`status_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
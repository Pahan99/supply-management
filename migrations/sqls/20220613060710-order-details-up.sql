CREATE TABLE `order_details` (
	`order_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`train_order_partition_id` INT,
	`truck_order_partition_id` INT,
	`quantity` INT,
    CONSTRAINT `order_details_fk0` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE,
    CONSTRAINT `order_details_fk1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
    CONSTRAINT `order_details_fk2` FOREIGN KEY (`train_order_partition_id`) REFERENCES `train_order_partitions`(`train_order_partition_id`) ON DELETE CASCADE,
    CONSTRAINT `order_details_fk3` FOREIGN KEY (`truck_order_partition_id`) REFERENCES `truck_order_partitions`(`truck_order_partition_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
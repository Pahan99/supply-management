CREATE TABLE `delivery_details` (
	`order_id` INT NOT NULL,
	`delivery_id` INT NOT NULL,
    CONSTRAINT `delivery_details_fk0` FOREIGN KEY (`delivery_id`) REFERENCES `truck_deliveries`(`delivery_id`) ON DELETE CASCADE,
    CONSTRAINT `delivery_details_fk1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
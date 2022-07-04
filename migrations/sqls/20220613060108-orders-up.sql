CREATE TABLE `orders` (
	`order_id` INT NOT NULL,
	`customer_id` INT NOT NULL,
	`cost` DECIMAL(10,2) NOT NULL,
	`route_id` INT NOT NULL,
	`status_id` INT NOT NULL,
    `order_date` DATE,
    `delivery_date` DATE,
	PRIMARY KEY (`order_id`),
    CONSTRAINT `orders_fk0` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE CASCADE,
    CONSTRAINT `orders_fk1` FOREIGN KEY (`route_id`) REFERENCES `routes`(`route_id`) ON DELETE CASCADE,
    CONSTRAINT `orders_fk2` FOREIGN KEY (`status_id`) REFERENCES `order_status`(`status_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
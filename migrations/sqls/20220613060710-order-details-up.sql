CREATE TABLE `order_details` (
	`order_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`quantity` INT,
	`unit_price` DECIMAL(10,2),
    CONSTRAINT `order_details_fk0` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE,
    CONSTRAINT `order_details_fk1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
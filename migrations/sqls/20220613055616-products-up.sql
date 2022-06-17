CREATE TABLE `products` (
	`product_id` INT NOT NULL AUTO_INCREMENT,
	`product_name` varchar(255) NOT NULL,
	`unit_price` DECIMAL(10,2),
	`allocated_space` DECIMAL(10,2),
	`unit_weight` DECIMAL(10,2),
	PRIMARY KEY (`product_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;/* Replace with your SQL commands */
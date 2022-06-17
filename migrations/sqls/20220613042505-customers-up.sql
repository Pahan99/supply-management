CREATE TABLE `customers` (
	`customer_id` INT NOT NULL AUTO_INCREMENT,
	`customer_name` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`phone` varchar(13) NOT NULL,
	PRIMARY KEY (`customer_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
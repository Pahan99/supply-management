CREATE TABLE `order_status` (
	`status_id` INT NOT NULL AUTO_INCREMENT,
	`status` varchar(20) NOT NULL,
	PRIMARY KEY (`status_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
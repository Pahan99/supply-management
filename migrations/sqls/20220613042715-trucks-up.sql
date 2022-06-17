CREATE TABLE `trucks` (
	`truck_id` INT NOT NULL AUTO_INCREMENT,
	`vehicle_no` varchar(25) NOT NULL,
	`capacity` INT,
	PRIMARY KEY (`truck_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
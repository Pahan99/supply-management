CREATE TABLE `routes` (
	`route_id` INT NOT NULL AUTO_INCREMENT,
	`route_name` varchar(255) NOT NULL,
	`completion_time` DECIMAL(5,2) NOT NULL,
	`branch_id` INT NOT NULL,
	PRIMARY KEY (`route_id`),
	CONSTRAINT `routes_fk0` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`branch_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
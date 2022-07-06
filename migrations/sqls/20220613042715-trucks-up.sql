CREATE TABLE `trucks` (
	`truck_id` INT NOT NULL,
	`vehicle_no` varchar(25) NOT NULL,
	`capacity` INT,
	`branch_id` INT NOT NULL,
	`availability` BOOLEAN DEFAULT TRUE,
	PRIMARY KEY (`truck_id`),
	CONSTRAINT `trucks_fk0` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`branch_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
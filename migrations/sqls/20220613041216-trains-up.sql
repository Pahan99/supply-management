
CREATE TABLE `trains` (
	`train_id` INT NOT NULL AUTO_INCREMENT,
	`train_name` varchar(255) NOT NULL,
	`start_station` varchar(255),
	`end_station` varchar(255),
	`departure` DATETIME,
	`branch_id` INT NOT NULL,
	PRIMARY KEY (`train_id`),
	CONSTRAINT `trains_fk0` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`branch_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
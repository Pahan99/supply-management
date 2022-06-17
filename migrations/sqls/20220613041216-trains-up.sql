
CREATE TABLE `trains` (
	`train_id` INT NOT NULL AUTO_INCREMENT,
	`train_name` varchar(255) NOT NULL,
	`start_station` varchar(255),
	`end_station` varchar(255),
	`departure` DATETIME,
	PRIMARY KEY (`train_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `trains` (
	`train_id` INT NOT NULL AUTO_INCREMENT,
	`train_name` varchar(50) NOT NULL,
	`departure` TIME,
	`destination` varchar(50) NOT NULL,
	`capacity` INT,
	PRIMARY KEY (`train_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
CREATE TABLE `train_trips` (
	`trip_id` INT NOT NULL AUTO_INCREMENT,
	`train_id` INT NOT NULL,
	`departure` DATE,
	`capacity_free` DECIMAL(10,2),
    PRIMARY KEY (`trip_id`),
    CONSTRAINT `train_trips_fk0` FOREIGN KEY (`train_id`) REFERENCES `trains`(`train_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
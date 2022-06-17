CREATE TABLE `train_trip_details` (
	`order_id` INT NOT NULL,
	`trip_id` INT NOT NULL,
    CONSTRAINT `train_trip_details_fk0` FOREIGN KEY (`trip_id`) REFERENCES `train_trips`(`trip_id`) ON DELETE CASCADE,
    CONSTRAINT `train_trip_details_fk1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
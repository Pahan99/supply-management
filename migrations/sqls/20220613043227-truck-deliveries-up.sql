CREATE TABLE `truck_deliveries` (
	`delivery_id` INT NOT NULL AUTO_INCREMENT,
	`driver_id` INT,
	`driver_assistant_id` INT,
	`truck_id` INT,
	`route_id` INT,
    `delivery_status` BOOLEAN DEFAULT FALSE,
	`capacity_free` DECIMAL(10,2),
	`assigned_at` DATETIME DEFAULT NULL,
	PRIMARY KEY (`delivery_id`),
    CONSTRAINT `truck_deliveries_fk0` FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`user_id`) ON DELETE CASCADE,
    CONSTRAINT `truck_deliveries_fk1` FOREIGN KEY (`driver_assistant_id`) REFERENCES `driver_assistants`(`user_id`) ON DELETE CASCADE,
    CONSTRAINT `truck_deliveries_fk2` FOREIGN KEY (`truck_id`) REFERENCES `trucks`(`truck_id`) ON DELETE CASCADE,
    CONSTRAINT `truck_deliveries_fk3` FOREIGN KEY (`route_id`) REFERENCES `routes`(`route_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
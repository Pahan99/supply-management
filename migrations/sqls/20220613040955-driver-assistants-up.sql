CREATE TABLE `driver_assistants` (
	`user_id` INT NOT NULL,
	`availability` BOOLEAN NOT NULL,
	`worked_hours` INT NOT NULL DEFAULT 0,
	`last_delivery_id` INT NOT NULL,
    CONSTRAINT `driver_assistants_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/* Last delivery FK */
CREATE TABLE `drivers` (
	`user_id` INT NOT NULL,
	`availability` BOOLEAN NOT NULL,
	`worked_hours` INT NOT NULL DEFAULT 0,
    CONSTRAINT `drivers_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
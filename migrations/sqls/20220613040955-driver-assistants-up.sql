CREATE TABLE `driver_assistants` (
	`user_id` INT NOT NULL,
	`availability` BOOLEAN NOT NULL DEFAULT TRUE,
	`weekly_hours` INT NOT NULL DEFAULT 0,
	`total_hours` INT NOT NULL DEFAULT 0,
    CONSTRAINT `driver_assistants_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

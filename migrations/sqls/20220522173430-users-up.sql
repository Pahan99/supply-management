
CREATE TABLE `users` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	`email` varchar(255),
	`password` varchar(255) NOT NULL,
	`phone` varchar(13) NOT NULL,
	`role_id` INT NOT NULL,
	`branch_id` INT NOT NULL,
	PRIMARY KEY (`user_id`),
    CONSTRAINT `users_fk0` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE CASCADE,
    CONSTRAINT `users_fk1` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`branch_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
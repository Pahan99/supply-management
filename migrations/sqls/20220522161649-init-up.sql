-- CREATE TABLE `roles` (
-- 	`role_id` INT NOT NULL AUTO_INCREMENT,
-- 	`role_name` varchar(15) NOT NULL,
-- 	PRIMARY KEY (`role_id`)
-- );

-- CREATE TABLE `users` (
-- 	`user_id` INT NOT NULL AUTO_INCREMENT,
-- 	`name` varchar(255) NOT NULL,
-- 	`email` varchar(255),
-- 	`password` varchar(255) NOT NULL,
-- 	`phone` varchar(13) NOT NULL,
-- 	`role_id` INT NOT NULL,
-- 	PRIMARY KEY (`user_id`),
    
-- );

-- ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;



CREATE TABLE `train_branches` (
	`train_id` INT NOT NULL,
	`branch_id` INT NOT NULL,
    CONSTRAINT `train_branches_fk0` FOREIGN KEY (`train_id`) REFERENCES `trains`(`train_id`) ON DELETE CASCADE,
    CONSTRAINT `train_branches_fk1` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`branch_id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
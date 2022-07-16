CREATE EVENT weekly_update_work_hours
ON SCHEDULE
	EVERY 1 WEEK
DO BEGIN
	SET SQL_SAFE_UPDATES = 0;
	UPDATE drivers SET weekly_hours = 0;
	UPDATE driver_assistants SET weekly_hours = 0;
	
END
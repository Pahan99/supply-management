CREATE TRIGGER users_after_insert
	AFTER INSERT ON users
    FOR EACH ROW
BEGIN
	IF (NEW.role_id = 3) THEN
		INSERT INTO drivers (user_id) VALUES (NEW.user_id);
    END IF;
    IF (NEW.role_id = 4) THEN
		INSERT INTO driver_assistants (user_id) VALUES (NEW.user_id);
    END IF;
END
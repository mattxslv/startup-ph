SELECT
	u.email,
	CONCAT_WS(' ', u.first_name, u.last_name) AS USER,
	s. `name` AS startups
FROM
	startups AS s
	LEFT JOIN users AS u ON u.id = s.user_id
WHERE
	s.submitted_at IS NOT NULL;

UPDATE
	startups
SET
	status = "UNVERIFIED",
	submitted_at = NULL,
	oath_accepted_at = NULL,
	startup_id = NULL,
	is_verified = 0,
	verified_at = NULL,
	remarks = NULL,
	is_active = 0,
	is_application_completed = 0,
	is_verified = 0,
	returned_at = NULL,
	return_remarks = NULL
WHERE
	submitted_at IS NOT NULL;

SELECT
	b.*,
	s.*
FROM
	startups AS s
	LEFT JOIN barangays AS b ON b.correspondence_code = s.barangay_code
WHERE
	s.barangay_code IS NOT NULL
	AND b.code IS NOT NULL;

UPDATE
	startups AS s
	LEFT JOIN barangays AS b ON b.correspondence_code = s.barangay_code
SET
	s.barangay_code = b.code,
	s.municipality_code = b.municipality_code,
	s.province_code = b.province_code,
	s.region_code = b.region_code
WHERE
	s.barangay_code IS NOT NULL
	AND b.code IS NOT NULL;

SELECT
	s.barangay_code, bo.`name`
FROM
	startups AS s
	LEFT JOIN barangays AS b ON b.code = s.barangay_code
	left join barangays_old as bo on bo.code = s.barangay_code
WHERE
	s.barangay_code IS NOT NULL
	AND b.code IS NULL;

-- 042103031 = 0402103077
-- 042103041 = 0402103082
-- 042103056 = 0402103085
-- 042103072 = 0402103092
-- 042103010 = 0402103079

UPDATE
	startups
SET
	barangay_code = "___"
WHERE barangay_code = "___";

UPDATE
	startups AS s
	LEFT JOIN barangays AS b ON b.code = s.barangay_code
SET
	s.municipality_code = b.municipality_code,
	s.province_code = b.province_code,
	s.region_code = s.region_code
WHERE
	s.barangay_code in(0402103077, 0402103082, 0402103085, 0402103092, 0402103079);
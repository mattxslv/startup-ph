SELECT
	*
FROM
	startups AS s
	LEFT JOIN barangays AS b ON b.code = s.barangay_code
WHERE
	b.code IS NULL
	AND s.barangay_code IS NOT NULL;

SELECT
	*
FROM
	startups AS s
	LEFT JOIN barangays AS b ON b.code = s.barangay_code
WHERE
	b.code IS NULL
	AND s.barangay_code IS NOT NULL;

SELECT
	*
FROM
	startups AS s
	LEFT JOIN municipalities AS m ON m.code = s.municipality_code
WHERE
	m.code IS NULL
	AND s.municipality_code IS NOT NULL;

SELECT
	*
FROM
	startups AS s
	LEFT JOIN provinces AS p ON p.code = s.province_code
WHERE
	p.code IS NULL
	AND s.province_code IS NOT NULL;

SELECT
	*
FROM
	startups AS s
	LEFT JOIN regions AS p ON p.code = s.region_code
WHERE
	p.code IS NULL
	AND s.region_code IS NOT NULL;

UPDATE
	startups AS s
	LEFT JOIN barangays AS b ON b.code = s.barangay_code
SET
	s.municipality_code = b.municipality_code,
	s.province_code = b.province_code,
	s.region_code = b.region_code
WHERE
	s.barangay_code IS NOT NULL;

UPDATE
	startups
SET
	region_code = NULL,
	province_code = NULL,
	municipality_code = NULL
WHERE
	region_code IS NOT NULL
	AND barangay_code IS NULL;

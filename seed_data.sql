-- Assessment Tags
INSERT INTO assessment_tags (code, description, is_active, created_at, updated_at) VALUES 
('EARLY_STAGE', 'Early Stage', 1, NOW(), NOW()),
('GROWTH_STAGE', 'Growth Stage', 1, NOW(), NOW()),
('MATURE_STAGE', 'Mature Stage', 1, NOW(), NOW()),
('PRE_SEED', 'Pre-Seed', 1, NOW(), NOW()),
('SEED', 'Seed', 1, NOW(), NOW()),
('SERIES_A', 'Series A', 1, NOW(), NOW()),
('SERIES_B', 'Series B', 1, NOW(), NOW()),
('SERIES_C_PLUS', 'Series C+', 1, NOW(), NOW());

-- Datasets (for testing dropdowns)
INSERT INTO datasets (code, value, created_at, updated_at) VALUES
('TECHNOLOGY', '{"name": "Technology"}', NOW(), NOW()),
('HEALTHCARE', '{"name": "Healthcare"}', NOW(), NOW()),
('FINANCE', '{"name": "Finance"}', NOW(), NOW()),
('EDUCATION', '{"name": "Education"}', NOW(), NOW()),
('ECOMMERCE', '{"name": "E-commerce"}', NOW(), NOW()),
('AGRICULTURE', '{"name": "Agriculture"}', NOW(), NOW());

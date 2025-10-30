-- Insert business classification options as dataset entries
INSERT INTO datasets (code, value, created_at, updated_at) VALUES
('business-classification', '{"label": "Corporation"}', NOW(), NOW()),
('business-classification', '{"label": "Joint venture"}', NOW(), NOW()),
('business-classification', '{"label": "One person corporation"}', NOW(), NOW()),
('business-classification', '{"label": "Partnership"}', NOW(), NOW()),
('business-classification', '{"label": "Sole proprietorship"}', NOW(), NOW());

-- Fix assessment tags: Remove duplicates and replace development stages with proper return reasons
-- Date: November 4, 2025
-- Description: The assessment_tags table had duplicate development stage entries that were 
-- being used incorrectly as reasons to disapprove/return startup applications.
-- This script replaces them with appropriate rejection/return reasons.

-- Delete all existing assessment tags (duplicates and wrong data)
DELETE FROM assessment_tags WHERE id <= 16;

-- Insert proper return/rejection reasons for startup applications
INSERT INTO assessment_tags (code, description, notes, is_active, created_at, updated_at) VALUES
('INCOMPLETE_DOCUMENTS', 'Incomplete or missing required documents', 'Business registration, permits, or other required documents are incomplete or not submitted', 1, NOW(), NOW()),
('INVALID_REGISTRATION', 'Invalid or expired business registration', 'DTI/SEC/CDA registration is invalid, expired, or does not match submitted information', 1, NOW(), NOW()),
('NOT_STARTUP_CRITERIA', 'Does not meet startup criteria', 'Business does not meet the definition of a startup (innovation, scalability, age requirements)', 1, NOW(), NOW()),
('FRAUDULENT_INFO', 'Fraudulent or misrepresented information', 'Submitted information appears to be false, fraudulent, or intentionally misleading', 1, NOW(), NOW()),
('EXPIRED_PERMITS', 'Expired permits or certificates', 'Business permits, licenses, or other required certificates have expired', 1, NOW(), NOW()),
('DUPLICATE_APPLICATION', 'Duplicate application', 'This startup has already been registered in the system', 1, NOW(), NOW()),
('INVALID_CONTACT_INFO', 'Invalid or unreachable contact information', 'Email, phone number, or address is invalid or cannot be verified', 1, NOW(), NOW()),
('INCOMPLETE_PROFILE', 'Incomplete startup profile', 'Key information about the startup is missing or insufficient (business model, products/services, team)', 1, NOW(), NOW());

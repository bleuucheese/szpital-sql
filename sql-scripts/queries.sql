-- Insert a patient with address and insurance
CALL InsertNewPatient (
    'VN079311117890',
    'Mateusz',
    'Trinh',
    '2004-09-02',
    'Male',
    'O+',
    '1 Bui Vien',
    'Ward 5',
    'District 1',
    'Ho Chi Minh City',
    'INS1101022711',
    '2025-12-31'
);

-- Insert a new patient without insurance and address
CALL InsertNewPatient (
    'VN079311117456',
    'Michal',
    'Kors',
    '1990-06-15',
    'Female',
    'A+',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
);

-- To search for allergens related to a specific symptom
CALL SearchAllergiesBySymptoms ('%nausea%');

-- Insert Multiple Allergies for a Patient
CALL InsertAllergiesForPatient (17, '8,35,2', 'MILD,MILD,CRITICAL');

-- Search for a patient by ID, First Name, Last Name, or a combination of these
CALL SearchPatient ('NAME', NULL, NULL, 'Noble');

CALL SearchPatient ('NAME', NULL, NULL, 'Blaszczyk');

CALL SearchPatient ('NAME', NULL, 'Kevin', 'Darroyo');

CALL SearchPatient ('ID', 7, NULL, NULL);

-- Check staff availability
CALL CheckStaffAvailability (1, '2024-09-07 08:00:00', '2024-09-07 08:23:00'); -- 0

CALL CheckStaffAvailability (1, '2024-09-07 21:59:00', '2024-09-07 22:00:00'); -- 1

-- Insert a new procedure
CALL CheckStaffAvailability(4, '2024-09-07 22:10:00', '2024-09-07 22:23:00', @is_avail);
-- SELECT @is_avail;

CALL CheckStaffAvailability(4, NOW(), NOW(), @is_avail);
SELECT @is_avail;


update shift set end_hour ='23:59:00' where id=18;

CALL AddProcedure(31, 1, 'Checkups', 3, 5, NOW(), NOW());
CALL AddProcedure(31, 41, 'Lab', 50, 1, NOW(), NOW());
CALL AddProcedure(31, 4, 'Image scans', 50, 1, NOW(), NOW());
CALL AddProcedure(31, 4, 'Checkups', NULL, NULL, NOW(), NOW());
CALL AddAdmission(31, 'STANDARD', DATE(NOW()), '2024-09-12');

-- Update the treatment history to mark as complete
UPDATE TreatmentHistory
SET has_completed = TRUE
WHERE id = 4;

-- Modify a staff
UPDATE Staff
SET job_type = 'Doctor', salary = 170000
WHERE id = 41;

-- Insert a new staff member with qualifications
CALL AddNewStaffWithQualifications(
    'Marcel', 
    'Krupa', 
    '2001-03-22', 
    'Nurse', 
    70000.00, 
    date(now()), 
    2,                -- Department ID
    41,             -- Manager ID
    'Bachelor of Nursing, Registered Nurse',   -- Qualification names
    'University of Health, Nursing Board',     -- Qualification providers
    '2023-05-10, 2024-05-01'                   -- Issue dates for qualifications
);

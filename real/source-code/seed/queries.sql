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
CALL CheckStaffAvailability (1, '2024-09-07 08:00:00', '2024-09-07 08:23:00');

-- 0
CALL CheckStaffAvailability (1, '2024-09-07 21:59:00', '2024-09-07 22:00:00');

-- 1
-- Insert a new procedure
CALL CheckStaffAvailability (
    4,
    '2024-09-07 22:10:00',
    '2024-09-07 22:23:00',
    @is_avail
);

SELECT
    @is_avail;

CALL CheckStaffAvailability (4, NOW (), NOW (), @is_avail);

SELECT
    @is_avail;


CALL AddProcedure (21, 1, 'Checkups', 3, 5, NOW (), NOW ());

CALL AddProcedure (21, 41, 'Lab', 50, 1, NOW (), NOW ());

CALL AddProcedure (21, 4, 'Image scans', 50, 1, NOW (), NOW ());

CALL AddProcedure (21, 4, 'Checkups', NULL, NULL, NOW (), NOW ());

CALL AddAdmission (21, 'STANDARD', DATE (NOW ()), '2024-09-12');

-- Update the treatment history to mark as complete
UPDATE TreatmentHistory
SET
    has_completed = TRUE
WHERE
    id = 4;

-- Modify a staff
UPDATE Staff
SET
    job_type = 'Doctor',
    salary = 170000
WHERE
    id = 41;

-- Insert a new staff member with qualifications
CALL AddNewStaffWithQualifications (
    'Marcel',
    'Krupa',
    '2001-03-22',
    'Nurse',
    70000.00,
    date (now ()),
    2, -- Department ID
    41, -- Manager ID
    'Bachelor of Nursing, Registered Nurse', -- Qualification names
    'University of Health, Nursing Board', -- Qualification providers
    '2023-05-10, 2024-05-01' -- Issue dates for qualifications
);

-- Display all staff members within a department
-- Call with department name
CALL ListStaffByDepartment (NULL, 'Cardiology');

-- Call with department ID
CALL ListStaffByDepartment (1, NULL);

-- List staff ids with comma separated in a department
SELECT
	d.id, d.name AS department,
    GROUP_CONCAT(s.id ORDER BY s.id SEPARATOR ', ') AS members
FROM
    Staff s JOIN Department d 
ON s.department_id = d.id
GROUP BY
    d.id, d.name
ORDER BY
	d.id;

SELECT
	d.id,
    d.name AS department,
    GROUP_CONCAT(CASE WHEN s.job_type = 'Doctor' THEN s.id END ORDER BY s.id SEPARATOR ', ') AS doctors,
    GROUP_CONCAT(CASE WHEN s.job_type = 'Nurse' THEN s.id END ORDER BY s.id SEPARATOR ', ') AS nurses
FROM Staff s JOIN Department d 
ON s.department_id = d.id
GROUP BY d.id, d.name
ORDER BY d.id;

-- List staffs by order of names
CALL ListStaffNames ('ASC');

CALL ListStaffNames ('DESC');

-- View a staff schedule
CALL ViewStaffScheduleById(1);

-- View all doctors' schedules
CALL ViewAllDoctorsSchedule('2024-09-06', '2024-09-13');

-- Book an appointment
INSERT INTO appointment VALUES (4, '2024-09-08 14:20:00', '2024-09-08 15:00:00', 'Therapy', 'Booked', 21, 5);
INSERT INTO appointment VALUES (5, '2024-09-08 16:00:00', '2024-09-08 17:00:00', 'Private checkups', 'Booked', 21, 5);
CALL BookAppointment(21, 5, '2024-09-08 21:35:00', '2024-09-08 21:50:00', 'Consulation');
CALL BookAppointment(21, 5, '2024-09-08 23:35:00', '2024-09-08 23:38:00', 'Consulation');

-- Cancel an appointment
CALL CancelAppointment(4);

-- Reports
-- Get the treatment details: what procedures were done for a patient and with any admission details
CALL GetTreatmentDetails(2);

-- Get the treatment history with billing details for a patient
CALL GetPatientTreatmentHistoryWithBilling(1, '2020-01-01', '2024-12-31');

-- Get job changes for a staff member
CALL GetJobChangeHistory(1);

-- Get staff workload 
CALL ListProceduresForAllStaff('2024-09-01', '2024-09-10');
CALL ListProceduresForSpecificStaff(1, '2020-09-01', '2024-09-10');
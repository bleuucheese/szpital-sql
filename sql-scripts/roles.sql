-- Create the Admin role
CREATE ROLE admin_role;

-- Create the Clerk role
CREATE ROLE clerk_role;

-- Create the Doctor role
CREATE ROLE doctor_role;

-- Create the Patient role
CREATE ROLE patient_role;

-- Grant full access to all tables for Admin
GRANT ALL PRIVILEGES ON HospitalManagementSystem.* TO admin_role;

-- Grant select, insert, and update permissions to Clerk on relevant tables
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Patient TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Insurance TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Address TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Staff TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Department TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Shift TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Qualification TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.EmploymentHistory TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Medicine TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.TreatmentHistory TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Billing TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Procedures TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Admission TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Appointment TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Patient_Allergy TO clerk_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Shift_Staff TO clerk_role;

-- Prevent Clerk from deleting records
REVOKE DELETE ON HospitalManagementSystem.* FROM clerk_role;

-- Grant select, insert, and update permissions to Doctor on patient-related tables
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Patient TO doctor_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.TreatmentHistory TO doctor_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Appointment TO doctor_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Medicine TO doctor_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Procedures TO doctor_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Patient_Allergy TO doctor_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Admission TO doctor_role;
GRANT SELECT, INSERT, UPDATE ON HospitalManagementSystem.Qualification TO doctor_role;

-- Grant select permissions on relevant tables to allow Doctor access to necessary information
GRANT SELECT ON HospitalManagementSystem.Insurance TO doctor_role;
GRANT SELECT ON HospitalManagementSystem.Address TO doctor_role;
GRANT SELECT ON HospitalManagementSystem.Shift TO doctor_role;
GRANT SELECT ON HospitalManagementSystem.Department TO doctor_role;
GRANT SELECT ON HospitalManagementSystem.Staff TO doctor_role;

-- Prevent Doctor from deleting records and accessing other sensitive data
REVOKE DELETE ON HospitalManagementSystem.* FROM doctor_role;

-- Grant select and update permissions to Patient on their own records
GRANT SELECT, UPDATE ON HospitalManagementSystem.Patient TO patient_role;
GRANT SELECT, UPDATE ON HospitalManagementSystem.Appointment TO patient_role;
GRANT SELECT, UPDATE ON HospitalManagementSystem.Address TO patient_role;
GRANT SELECT ON HospitalManagementSystem.TreatmentHistory TO patient_role;
GRANT SELECT ON HospitalManagementSystem.Billing TO patient_role;

-- Restrict Patient from accessing or modifying other patients' data
REVOKE INSERT, DELETE ON HospitalManagementSystem.* FROM patient_role;

-- View for Doctors to see patient treatment history
CREATE VIEW DoctorPatientTreatmentView AS
SELECT p.id AS patient_id, p.first_name, p.last_name, th.disease, th.visited_date, th.has_completed
FROM Patient p
JOIN TreatmentHistory th ON p.id = th.patient_id;

-- View for Clerks to manage appointments without sensitive data
CREATE VIEW ClerkAppointmentView AS
SELECT a.id AS appointment_id, p.first_name, p.last_name, a.start_time, a.end_time, a.purpose, a.status
FROM Appointment a
JOIN Patient p ON a.patient_id = p.id;

-- Grant permissions on views to roles
GRANT SELECT ON DoctorPatientTreatmentView TO doctor_role;
GRANT SELECT, UPDATE ON ClerkAppointmentView TO clerk_role;

-- Grant execution rights on stored procedures
GRANT EXECUTE ON PROCEDURE InsertNewPatient TO admin_role;
GRANT EXECUTE ON PROCEDURE InsertNewPatient TO clerk_role;

-- Procedure to handle patient record access based on role
CREATE PROCEDURE AccessPatientRecord(IN patient_id INT)
BEGIN
    IF (SELECT role FROM UserRoles WHERE user_id = CURRENT_USER_ID()) = 'doctor_role' THEN
        SELECT * FROM Patient WHERE id = patient_id;
    ELSIF (SELECT role FROM UserRoles WHERE user_id = CURRENT_USER_ID()) = 'patient_role' THEN
        SELECT * FROM Patient WHERE id = CURRENT_USER_ID();
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unauthorized Access';
    END IF;
END;

-- Grant execute permissions
GRANT EXECUTE ON PROCEDURE AccessPatientRecord TO doctor_role, patient_role;
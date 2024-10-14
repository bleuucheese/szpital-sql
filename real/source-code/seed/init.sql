/*
														Project: Hospital Management System
														Author: Nguyen Ha

	A. CREATE DATABASE
	B. CREATE TABLES (INCLUDING CONSTRAINTS (FK , UNIQUE, DEFAULT, INDEXING, PARTITIONING))
    C. SAMPLE DATA POPULATION
	D. CREATE FUNCTIONS
	E. CREATE TRIGGERS
    F. CREATE STORED PROCEDURES

*/

/************************************************************************************************/
-- A. CREATE DATABASE
/************************************************************************************************/
DROP DATABASE IF EXISTS Hospital;
CREATE DATABASE IF NOT EXISTS Hospital;

/************************************************************************************************/
-- B. CREATE TABLES
/************************************************************************************************/

USE Hospital;
-- Reset the database
-- Drop foreign key constraints if they exist
SET @sql = IF(
    (SELECT COUNT(*) FROM information_schema.KEY_COLUMN_USAGE 
     WHERE TABLE_NAME = 'Staff' AND CONSTRAINT_NAME = 'fk_department' 
     AND CONSTRAINT_SCHEMA = DATABASE()) > 0,
    'ALTER TABLE Staff DROP FOREIGN KEY fk_department', 
    'SELECT "No such foreign key fk_department in Staff table"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (SELECT COUNT(*) FROM information_schema.KEY_COLUMN_USAGE 
     WHERE TABLE_NAME = 'Department' AND CONSTRAINT_NAME = 'fk_manager' 
     AND CONSTRAINT_SCHEMA = DATABASE()) > 0,
    'ALTER TABLE Department DROP FOREIGN KEY fk_manager', 
    'SELECT "No such foreign key fk_manager in Department table"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Drop tables if they exist
DROP TABLE IF EXISTS Patient_Allergy;
DROP TABLE IF EXISTS Shift_Staff;
DROP TABLE IF EXISTS Procedures;
DROP TABLE IF EXISTS Admission;
DROP TABLE IF EXISTS Billing;
DROP TABLE IF EXISTS TreatmentHistory;
DROP TABLE IF EXISTS Appointment;
DROP TABLE IF EXISTS EmploymentHistory;
DROP TABLE IF EXISTS Qualification;
DROP TABLE IF EXISTS Shift;
DROP TABLE IF EXISTS Medicine;
DROP TABLE IF EXISTS Address;
DROP TABLE IF EXISTS Insurance;
DROP TABLE IF EXISTS Patient;
DROP TABLE IF EXISTS Allergy;
DROP TABLE IF EXISTS Department; 
DROP TABLE IF EXISTS Staff;

CREATE TABLE Allergy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    allergen VARCHAR(255) NOT NULL,
    symptoms TEXT NOT NULL
);

CREATE TABLE Patient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cid VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    blood_type VARCHAR(10) NOT NULL
);

CREATE TABLE Insurance (
    code VARCHAR(50) PRIMARY KEY,
    expired_date DATE NOT NULL,
    patient_id INT UNIQUE,  -- Enforcing one-to-one relationship with Patient
    FOREIGN KEY (patient_id) REFERENCES Patient(id) ON DELETE CASCADE
);

CREATE TABLE Address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address_line VARCHAR(255) NOT NULL,
    ward VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    patient_id INT UNIQUE,  -- Enforcing one-to-one relationship with Patient
    FOREIGN KEY (patient_id) REFERENCES Patient(id) ON DELETE CASCADE
);

CREATE TABLE Staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    job_type VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hired_date DATE NOT NULL,
    department_id INT,
    manager_id INT
);

CREATE TABLE Department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    manager_id INT UNIQUE  -- Enforcing one-to-one relationship with Staff
);

CREATE TABLE Shift (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day_of_week VARCHAR(50) NOT NULL CHECK (day_of_week IN ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN')),
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL
);

CREATE TABLE Qualification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    staff_id INT,
    FOREIGN KEY (staff_id) REFERENCES Staff(id) ON DELETE CASCADE
);

CREATE TABLE EmploymentHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    previous_department_id INT,
    current_department_id INT,
    previous_salary DECIMAL(10, 2),
    current_salary DECIMAL(10, 2),
    previous_job_title VARCHAR(255),
    current_job_title VARCHAR(255),
    applied_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    staff_id INT,
    FOREIGN KEY (staff_id) REFERENCES Staff(id) ON DELETE CASCADE,
    FOREIGN KEY (previous_department_id) REFERENCES Department(id) ON DELETE SET NULL,
    FOREIGN KEY (current_department_id) REFERENCES Department(id) ON DELETE SET NULL
);

CREATE TABLE Medicine (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    effect TEXT,
    side_effect TEXT,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE TreatmentHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL CHECK (type IN ('INPATIENT', 'OUTPATIENT')) DEFAULT 'OUTPATIENT',
    disease TEXT,
    visited_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    has_completed BOOLEAN NOT NULL DEFAULT FALSE, -- When done print bill
    patient_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient(id) ON DELETE CASCADE
);

CREATE TABLE Billing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    billing_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    due_date DATE NOT NULL DEFAULT (DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY)),
    payment_status VARCHAR(50) NOT NULL CHECK (payment_status IN ('UNPAID', 'PAID')),
    treatment_history_id INT,
    patientId INT,
    FOREIGN KEY (treatment_history_id) REFERENCES TreatmentHistory(id) ON DELETE CASCADE,
    FOREIGN KEY (patientId) REFERENCES Patient(id) ON DELETE CASCADE
);

CREATE TABLE Procedures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    staff_id INT,
    patient_id INT,
    medicineId INT,
    medicine_quantity INT,
    performed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    treatment_history_id INT,
    FOREIGN KEY (staff_id) REFERENCES Staff(id) ON DELETE SET NULL,
    FOREIGN KEY (patient_id) REFERENCES Patient(id) ON DELETE CASCADE,
    FOREIGN KEY (medicineId) REFERENCES Medicine(id) ON DELETE SET NULL,
    FOREIGN KEY (treatment_history_id) REFERENCES TreatmentHistory(id) ON DELETE CASCADE
);

CREATE TABLE Admission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    admitted_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    discharged_date DATE,
    room_type VARCHAR(50) NOT NULL CHECK (room_type IN ('STANDARD', 'PREMIUM')),
    price DECIMAL(10, 2) NOT NULL, -- Per day (DATE_DIFF), std: $100, prem: $200
    treatment_history_id INT,
    FOREIGN KEY (treatment_history_id) REFERENCES TreatmentHistory(id) ON DELETE CASCADE
);

CREATE TABLE Appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('BOOKED', 'ONGOING', 'COMPLETED', 'CANCELLED')),
    patient_id INT,
    staff_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient(id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES Staff(id) ON DELETE SET NULL,
    CHECK (end_time > start_time)  -- Ensure that end_time is after start_time
);


CREATE TABLE Patient_Allergy (
    patient_id INT,
    allergy_id INT,
    severity VARCHAR(50) CHECK (severity IN ('MILD', 'CRITICAL')),
    PRIMARY KEY (patient_id, allergy_id),
    FOREIGN KEY (patient_id) REFERENCES Patient(id) ON DELETE CASCADE,
    FOREIGN KEY (allergy_id) REFERENCES Allergy(id) ON DELETE CASCADE
);

CREATE TABLE Shift_Staff (
    staffId INT,
    shiftId INT,
    PRIMARY KEY (staffId, shiftId),
    FOREIGN KEY (staffId) REFERENCES Staff(id) ON DELETE CASCADE,
    FOREIGN KEY (shiftId) REFERENCES Shift(id) ON DELETE CASCADE
);

-- Avoid circular reference
ALTER TABLE Staff
ADD CONSTRAINT fk_department
FOREIGN KEY (department_id) REFERENCES Department(id) ON DELETE SET NULL;

ALTER TABLE Staff
ADD CONSTRAINT fk_manager
FOREIGN KEY (manager_id) REFERENCES Staff(id) ON DELETE SET NULL;

ALTER TABLE Department
ADD CONSTRAINT fk_deptmanager
FOREIGN KEY (manager_id) REFERENCES Staff(id) ON DELETE SET NULL;
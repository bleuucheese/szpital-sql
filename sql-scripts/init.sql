/*
														Project: Hospital Management System
														Author: Nguyen Ha

	A. CREATE DATABASE
	B. DROP AND CREATE FUNCTIONS
	C. DROP AND CREATE TABLE (INCLUDING CONSTRAINTS (FK , UNIQUE, DEFAULT, INDEXING, PARTITIONING))
	D. CREATE STORE PROCEDURE
	E. CREATE TRIGGER
	F. DATA POPULATION
	G. CREATE VIEWS

NOTE:- 
	1. Roles for Security:
    -
    
    2. Computed Columns based on a function:
		- 

	3. Views for Report:
		- 

	4. Indexes, Stored Procedures, Triggers, Functions:
		- 

*/

/************************************************************************************************/
--- A. CREATE DATABASE
/************************************************************************************************/
DROP DATABASE HospitalManagementSystem;
CREATE DATABASE IF NOT EXISTS HospitalManagementSystem;

/************************************************************************************************/
--- B. CREATE TRIGGERS
/************************************************************************************************/


/************************************************************************************************/
--- C. CREATE TABLES
/************************************************************************************************/

USE HospitalManagementSystem;

-- Reset the database
DROP TABLE IF EXISTS Patient_Allergy;
DROP TABLE IF EXISTS Staff_Shift;
DROP TABLE IF EXISTS Procedures;
DROP TABLE IF EXISTS Admission;
DROP TABLE IF EXISTS TreatmentHistory;
DROP TABLE IF EXISTS Appointment;
DROP TABLE IF EXISTS EmploymentHistory;
DROP TABLE IF EXISTS Qualification;
DROP TABLE IF EXISTS Shift;
DROP TABLE IF EXISTS Medicine;
DROP TABLE IF EXISTS Billing;
DROP TABLE IF EXISTS Patient;
DROP TABLE IF EXISTS Address;
DROP TABLE IF EXISTS Insurance;
DROP TABLE IF EXISTS Allergy;
ALTER TABLE Staff DROP FOREIGN KEY fk_department;
ALTER TABLE Department DROP FOREIGN KEY fk_manager;
DROP TABLE IF EXISTS Staff; 
DROP TABLE IF EXISTS Department;



CREATE TABLE Allergy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    allergen VARCHAR(255) NOT NULL,
    symptoms TEXT NOT NULL
);

CREATE TABLE Insurance (
    code VARCHAR(50) PRIMARY KEY,
    end_date DATE NOT NULL
);

CREATE TABLE Address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    ward VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL
);

CREATE TABLE Patient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cid VARCHAR(50) NOT NULL,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    blood_type VARCHAR(10),
    insurance VARCHAR(50),
    address INT,
    FOREIGN KEY (insurance) REFERENCES Insurance(code),
    FOREIGN KEY (address) REFERENCES Address(id)
);

CREATE TABLE Staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    job_type VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hired_date DATE NOT NULL,
    department INT,
    director INT
);

CREATE TABLE Department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    manager INT
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
    issued_date DATE NOT NULL,
    holder INT,
    FOREIGN KEY (holder) REFERENCES Staff(id)
);

CREATE TABLE EmploymentHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    change_type VARCHAR(255) NOT NULL,
    prev_dept INT,
    new_dept INT,
    prev_salary DECIMAL(10, 2),
    new_salary DECIMAL(10, 2),
    prev_title VARCHAR(255),
    new_title VARCHAR(255),
    applied_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    staff INT,
    FOREIGN KEY (prev_dept) REFERENCES Department(id),
    FOREIGN KEY (new_dept) REFERENCES Department(id),
    FOREIGN KEY (staff) REFERENCES Staff(id)
);

CREATE TABLE Medicine (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    effect TEXT,
    side_effect TEXT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Billing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    billing_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    due_date DATE NOT NULL DEFAULT (DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY)),
    payment_status VARCHAR(50) NOT NULL CHECK (payment_status IN ('UNPAID', 'PAID'))
);

CREATE TABLE TreatmentHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL CHECK (type IN ('INPATIENT', 'OUTPATIENT')) DEFAULT 'OUTPATIENT',
    diseases TEXT,
    visited_date DATE NOT NULL,
    has_completed BOOLEAN NOT NULL DEFAULT FALSE, -- when done print bill
    patient INT,
    bill INT,
    FOREIGN KEY (patient) REFERENCES Patient(id),
    FOREIGN KEY (bill) REFERENCES Billing(id)
);

CREATE TABLE Procedures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    performer INT,
    patient INT,
    medicine INT,
    med_quantity INT,
    performed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    history INT,
    FOREIGN KEY (performer) REFERENCES Staff(id),
    FOREIGN KEY (patient) REFERENCES Patient(id),
    FOREIGN KEY (medicine) REFERENCES Medicine(id),
    FOREIGN KEY (history) REFERENCES TreatmentHistory(id)
);

CREATE TABLE Admission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    admitted_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    discharged_date DATE,
    room_type VARCHAR(50) NOT NULL CHECK (room_type IN ('STANDARD', 'PREMIUM')),
    price DECIMAL(10, 2) NOT NULL, -- per day (DATE_DIFF), std: $100, prem: $200
    history INT,
    FOREIGN KEY (history) REFERENCES TreatmentHistory(id)
);

CREATE TABLE Appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('BOOKED', 'ONGOING', 'COMPLETED', 'CANCELLED')),
    patient INT,
    doctor INT,
    FOREIGN KEY (patient) REFERENCES Patient(id),
    FOREIGN KEY (doctor) REFERENCES Staff(id)
);

CREATE TABLE Patient_Allergy (
    patient_id INT,
    allergy_id INT,
    severity VARCHAR(50) CHECK (severity IN ('MILD', 'CRITICAL')),
    PRIMARY KEY (patient_id, allergy_id),
    FOREIGN KEY (patient_id) REFERENCES Patient(id),
    FOREIGN KEY (allergy_id) REFERENCES Allergy(id)
);

CREATE TABLE Staff_Shift (
    staff_id INT,
    shift_id INT,
    PRIMARY KEY (staff_id, shift_id),
    FOREIGN KEY (staff_id) REFERENCES Staff(id),
    FOREIGN KEY (shift_id) REFERENCES Shift(id)
);

-- Avoid circular reference
ALTER TABLE Staff
ADD CONSTRAINT fk_department
FOREIGN KEY (department) REFERENCES Department(id);

ALTER TABLE Staff
ADD CONSTRAINT fk_director
FOREIGN KEY (director) REFERENCES Staff(id);

ALTER TABLE Department
ADD CONSTRAINT fk_manager
FOREIGN KEY (manager) REFERENCES Staff(id);
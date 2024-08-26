create database test2408;
use test2408;
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
    director INT,
    FOREIGN KEY (director) REFERENCES Staff(id)
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

CREATE TABLE Department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    manager INT,
    FOREIGN KEY (manager) REFERENCES Staff(id)
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
    billing_date DATE NOT NULL,
    due_date DATE NOT NULL,
    payment_status VARCHAR(50) NOT NULL CHECK (payment_status IN ('UNPAID', 'PAID'))
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
    FOREIGN KEY (performer) REFERENCES Staff(id),
    FOREIGN KEY (patient) REFERENCES Patient(id),
    FOREIGN KEY (medicine) REFERENCES Medicine(id)
);

CREATE TABLE TreatmentHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL CHECK (type IN ('INPATIENT', 'OUTPATIENT')),
    diseases TEXT,
    visited_date DATE NOT NULL,
    patient INT,
    bill INT,
    FOREIGN KEY (patient) REFERENCES Patient(id),
    FOREIGN KEY (bill) REFERENCES Billing(id)
);

CREATE TABLE Admission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    admitted_date DATE NOT NULL,
    discharged_date DATE,
    room_type VARCHAR(50) NOT NULL CHECK (room_type IN ('STANDARD', 'PREMIUM')),
    price DECIMAL(10, 2) NOT NULL,
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

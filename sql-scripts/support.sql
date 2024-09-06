/************************************************************************************************/
-- CREATE INDEXES
/************************************************************************************************/
-- Create secondary index on last_name and first_name in Patient table
CREATE INDEX idx_patient_first_name ON Patient (first_name);
CREATE INDEX idx_patient_last_name ON Patient (last_name);
-- Create secondary index on last_name and first_name in Staff table
CREATE INDEX idx_staff_first_name ON Staff (first_name);
CREATE INDEX idx_staff_last_name ON Staff (last_name);
-- Create secondary index on blood_type in Patient table
CREATE INDEX idx_patient_blood_type ON Patient (blood_type);
-- Create composite index on start_time and end_time in Appointment table
CREATE INDEX idx_appointment_time ON Appointment (start_time, end_time);
-- Create composite index on category and performed_date in Procedures table
CREATE INDEX idx_procedures_category_date ON Procedures (category, performed_date);
-- Create full-text index on symptoms in Allergy table
CREATE FULLTEXT INDEX idx_allergy_symptoms ON Allergy (symptoms);
-- Create full-text index on effect and side_effect in Medicine table
CREATE FULLTEXT INDEX idx_medicine_effects ON Medicine (effect);
CREATE FULLTEXT INDEX idx_medicine_side_effects ON Medicine (side_effect);

/************************************************************************************************/
-- CREATE PARTITIONS
/************************************************************************************************/
-- Partitioning TreatmentHistory Table by visited_date [RANGE]: By partitioning the TreatmentHistory table, the system can perform time-based queries more efficiently. For instance, retrieving all treatments within a particular year or month now involves scanning only the relevant partitions rather than the entire table, resulting in faster query execution times and improved system responsiveness.
ALTER TABLE TreatmentHistory
DROP PRIMARY KEY,
ADD PRIMARY KEY (id, visited_date);

ALTER TABLE TreatmentHistory
PARTITION BY RANGE (YEAR(visited_date)) (
    PARTITION p_before2020 VALUES LESS THAN (2020),
    PARTITION p_2020 VALUES LESS THAN (2021),
    PARTITION p_2021 VALUES LESS THAN (2022),
    PARTITION p_2022 VALUES LESS THAN (2023),
    PARTITION p_2023 VALUES LESS THAN (2024),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Partitioning Procedures Table by category [LIST]: List partitioning is suitable because the category column has a predefined set of possible values. This approach reduces the query load by limiting the data scanned to specific procedure types. It also makes it easier to manage and maintain the data.
ALTER TABLE Procedures
DROP PRIMARY KEY,
ADD PRIMARY KEY (id, category);

ALTER TABLE Procedures
PARTITION BY LIST COLUMNS (category) (
    PARTITION p_checkups VALUES IN ('Checkups'),
    PARTITION p_prescription VALUES IN ('Prescription'),
    PARTITION p_operations VALUES IN ('Operations'),
    PARTITION p_ultrasound VALUES IN ('Ultrasound'),
    PARTITION p_imagescans_lab VALUES IN ('Image scans', 'Lab')
);

-- Partitioning Admission Table by admitted_date [RANGE]: Partitioning the Admission table by admitted_date is beneficial because it allows for efficient querying and reporting based on admission periods. This is particularly useful for hospital management to quickly access records for recent admissions versus historical data. Range partitioning by admission date makes data management and archival more effective.
ALTER TABLE Admission
DROP PRIMARY KEY,
ADD PRIMARY KEY (id, admitted_date);

ALTER TABLE Admission
PARTITION BY RANGE (YEAR(admitted_date)) (
    PARTITION p_before2020 VALUES LESS THAN (2020),
    PARTITION p_2020 VALUES LESS THAN (2021),
    PARTITION p_2021 VALUES LESS THAN (2022),
    PARTITION p_2022 VALUES LESS THAN (2023),
    PARTITION p_2023 VALUES LESS THAN (2024),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Partitioning Billing Table by billing_date [RANGE]: This reduces the query load by limiting the data scanned to specific billing periods, which is especially beneficial during financial audits, reporting, or when generating end-of-month financial statements.
ALTER TABLE Billing
DROP PRIMARY KEY,
ADD PRIMARY KEY (id, billing_date);

ALTER TABLE Billing
PARTITION BY RANGE (YEAR(billing_date)) (
    PARTITION p_before2020 VALUES LESS THAN (2020),
    PARTITION p_2020 VALUES LESS THAN (2021),
    PARTITION p_2021 VALUES LESS THAN (2022),
    PARTITION p_2022 VALUES LESS THAN (2023),
    PARTITION p_2023 VALUES LESS THAN (2024),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Partitioning EmploymentHistory Table by applied_date [RANGE & HASH]: Primary Partitioning by year: By limiting the data scanned to a specific year, the database engine reduces the number of rows processed during queries, leading to faster execution times and improved overall performance. Subpartitioning by staff_id: Queries targeting specific staff members are more efficient, as the data is organized in a way that reduces the amount of data scanned. This approach also enhances concurrency, as different queries targeting different staff members are more likely to access separate subpartitions, reducing lock contention.

ALTER TABLE EmploymentHistory
DROP PRIMARY KEY,
ADD PRIMARY KEY (id, applied_date, staff_id);

ALTER TABLE EmploymentHistory
PARTITION BY RANGE (YEAR(applied_date))
SUBPARTITION BY HASH(staff_id)
SUBPARTITIONS 4 (
    PARTITION p_before2020 VALUES LESS THAN (2020),
    PARTITION p_2020 VALUES LESS THAN (2021),
    PARTITION p_2021 VALUES LESS THAN (2022),
    PARTITION p_2022 VALUES LESS THAN (2023),
    PARTITION p_2023 VALUES LESS THAN (2024),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

/************************************************************************************************/
-- CREATE STORED PROCEDURES
/************************************************************************************************/
-- Add a new patient

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
-- CREATE USER-DEFINED FUNCTIONS
/************************************************************************************************/
-- Function to split a string by a delimiter and return the value at a specific position
DELIMITER $$

CREATE FUNCTION SPLIT_STRING(str TEXT, delim CHAR(1), pos INT)
RETURNS TEXT
DETERMINISTIC
BEGIN
    DECLARE output TEXT;
    SET output = REPLACE(SUBSTRING(SUBSTRING_INDEX(str, delim, pos),
                  LENGTH(SUBSTRING_INDEX(str, delim, pos - 1)) + 1), delim, '');
    RETURN output;
END $$

DELIMITER ;


-- Calculate procedure costs
DELIMITER $$

CREATE FUNCTION CalculateProcedureCost(
    p_category VARCHAR(255),
    p_medicine_id INT,          -- Medicine ID
    p_medicine_quantity INT     -- Medicine quantity
) RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
    DECLARE category_cost DECIMAL(10, 2);
    DECLARE medicine_cost DECIMAL(10, 2);

    -- Assign a base cost based on the procedure category
    SET category_cost = CASE
        WHEN p_category = 'Checkups' THEN 100.00
        WHEN p_category = 'Prescription' THEN 50.00
        WHEN p_category = 'Operations' THEN 3000.00
        WHEN p_category = 'Ultrasound' THEN 400.00
        WHEN p_category = 'Image scans' THEN 80.00
        WHEN p_category = 'Labs' THEN 150.00
        ELSE 0.00
    END;

    -- Check if medicine is used (medicine ID is not NULL and quantity > 0)
    IF p_medicine_id IS NOT NULL AND p_medicine_quantity > 0 THEN
        -- Get the price of the medicine and multiply by the quantity
        SET medicine_cost = (SELECT price FROM Medicine WHERE id = p_medicine_id) * p_medicine_quantity;
    ELSE
        -- If no medicine is used, set medicine cost to 0
        SET medicine_cost = 0.00;
    END IF;

    -- Return the total procedure cost (category cost + medicine cost)
    RETURN category_cost + medicine_cost;
END $$

DELIMITER ;



/************************************************************************************************/
-- CREATE STORED PROCEDURES AND TRANSACTION HANDLING
/************************************************************************************************/
-- Add a new patient
DELIMITER $$

CREATE PROCEDURE InsertNewPatient(
    IN p_cid VARCHAR(50), 
    IN p_first_name VARCHAR(255), 
    IN p_last_name VARCHAR(255), 
    IN p_dob DATE, 
    IN p_gender VARCHAR(10), 
    IN p_blood_type VARCHAR(10), 
    IN p_address_line VARCHAR(255), 
    IN p_ward VARCHAR(255), 
    IN p_district VARCHAR(255), 
    IN p_city VARCHAR(255), 
    IN p_insurance_code VARCHAR(50), 
    IN p_insurance_expired_date DATE
)
BEGIN
    -- Declare variables
    DECLARE new_patient_id INT;

    -- Declare exit handler for errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback any changes if an error occurs
        ROLLBACK;
        -- Signal a custom error message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction failed and was rolled back';
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Step 1: Insert the patient into the Patient table
    INSERT INTO Patient (cid, first_name, last_name, dob, gender, blood_type)
    VALUES (p_cid, p_first_name, p_last_name, p_dob, p_gender, p_blood_type);

    -- Step 2: Get the last inserted patient's ID
    SET new_patient_id = LAST_INSERT_ID();

    -- Step 3: If address is provided, insert into the Address table
    IF p_address_line IS NOT NULL AND p_ward IS NOT NULL AND p_district IS NOT NULL AND p_city IS NOT NULL THEN
        INSERT INTO Address (address_line, ward, district, city, patient_id)
        VALUES (p_address_line, p_ward, p_district, p_city, new_patient_id);
    END IF;

    -- Step 4: If insurance code is provided, validate and insert into the Insurance table
    IF p_insurance_code IS NOT NULL THEN
        -- Validate the insurance expired_date (must be greater than or equal to today's date)
        IF p_insurance_expired_date < CURDATE() THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Insurance expired date cannot be earlier than today';
        ELSE
            INSERT INTO Insurance (code, expired_date, patient_id)
            VALUES (p_insurance_code, p_insurance_expired_date, new_patient_id);
        END IF;
    END IF;

    -- Commit the transaction if no errors
    COMMIT;

END $$

DELIMITER ;

-- Full-Text Search on Symptoms
DELIMITER $$

CREATE PROCEDURE SearchAllergiesBySymptoms(
    IN search_term VARCHAR(255)
)
BEGIN
    -- Perform a full-text search on the symptoms column and retrieve associated allergens
    SELECT *
    FROM Allergy 
    WHERE MATCH(symptoms) AGAINST(search_term IN NATURAL LANGUAGE MODE);
END $$

DELIMITER ;


-- Insert Multiple Allergies for a Patient
DELIMITER $$

CREATE PROCEDURE InsertAllergiesForPatient(
    IN p_patient_id INT,
    IN allergy_ids TEXT,        -- Comma-separated allergy IDs
    IN severities TEXT          -- Comma-separated severities (corresponding to allergy IDs)
)
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE allergy_id INT;
    DECLARE severity VARCHAR(50);
    DECLARE allergy_count INT;

    -- Declare a handler for duplicate key errors (error code 1062)
    DECLARE CONTINUE HANDLER FOR 1062
    BEGIN
        -- Continue execution when duplicate key error occurs
        SET @duplicate_skipped = @duplicate_skipped + 1; -- (Optional) Track skipped duplicates if needed
    END;

    -- Count how many allergies exist in the string
    SET allergy_count = (LENGTH(allergy_ids) - LENGTH(REPLACE(allergy_ids, ',', '')) + 1);

    -- Loop through each allergy ID and severity
    WHILE i <= allergy_count DO
        -- Get the allergy ID and severity at position i
        SET allergy_id = CAST(SPLIT_STRING(allergy_ids, ',', i) AS UNSIGNED);
        SET severity = SPLIT_STRING(severities, ',', i);

        -- Insert the allergy into the Patient_Allergy table
        INSERT INTO Patient_Allergy (patient_id, allergy_id, severity)
        VALUES (p_patient_id, allergy_id, severity);

        -- Increment the loop counter
        SET i = i + 1;
    END WHILE;

END $$

DELIMITER ;


-- Search for Patients by Name or ID
DELIMITER $$

CREATE PROCEDURE SearchPatient(
    IN search_by VARCHAR(10),     -- Search type: 'ID' or 'NAME'
    IN p_patient_id INT,          -- Patient ID (used if searching by ID)
    IN p_first_name VARCHAR(255), -- Patient first name (used if searching by name)
    IN p_last_name VARCHAR(255)   -- Patient last name (used if searching by name)
)
BEGIN
    -- Check if the search type is provided correctly
    IF search_by NOT IN ('ID', 'NAME') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid search type. Please specify either "ID" or "NAME".';

    -- Search by patient ID
    ELSEIF search_by = 'ID' THEN
        -- Check if patient ID is provided
        IF p_patient_id IS NOT NULL THEN
            SELECT id, cid, first_name, last_name, dob, gender, blood_type
            FROM Patient
            WHERE id = p_patient_id;
            
            -- Check if any rows were returned
            IF ROW_COUNT() = 0 THEN
                SIGNAL SQLSTATE '02000'
                SET MESSAGE_TEXT = 'No patient found with the provided ID.';
            END IF;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Patient ID must be provided when searching by ID.';
        END IF;

    -- Search by patient name
    ELSEIF search_by = 'NAME' THEN
        -- Check if either first or last name is provided
        IF p_first_name IS NOT NULL OR p_last_name IS NOT NULL THEN
            -- Handle NULL values correctly and search based on provided name(s)
            SELECT id, cid, first_name, last_name, dob, gender, blood_type
            FROM Patient
            WHERE (p_first_name IS NULL OR first_name LIKE CONCAT('%', p_first_name, '%'))
            AND (p_last_name IS NULL OR last_name LIKE CONCAT('%', p_last_name, '%'));

            -- Check if any rows were returned
            IF ROW_COUNT() = 0 THEN
                SIGNAL SQLSTATE '02000'
                SET MESSAGE_TEXT = 'No patient found with the provided name.';
            END IF;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'At least one name (first or last) must be provided when searching by name.';
        END IF;
    END IF;

END $$

DELIMITER ;


-- Check Staff Availability
DELIMITER $$

CREATE PROCEDURE CheckStaffAvailability(
    IN p_staff_id INT,
    IN p_start_time DATETIME,
    IN p_end_time DATETIME,
    OUT p_available INT
)
BEGIN
    DECLARE current_day_of_week VARCHAR(10);
    DECLARE shift_start TIME;
    DECLARE shift_end TIME;
    DECLARE conflicting_appointment INT DEFAULT 0;
    DECLARE conflicting_procedure INT DEFAULT 0;

    -- Assume staff is not available initially
    SET p_available = 0;

    -- Get the current day of the week (e.g., 'MON', 'TUE', 'WED', etc.)
    SET current_day_of_week = (SELECT DATE_FORMAT(p_start_time, '%a'));

    -- Step 1: Check if the staff has a shift on the current day and within the requested time
    -- This query handles multiple shifts within the same day
    SELECT COUNT(*)
    INTO p_available
    FROM Shift sh
    JOIN Shift_Staff ss ON ss.shiftId = sh.id
    WHERE ss.staffId = p_staff_id
    AND sh.day_of_week = current_day_of_week
    AND (TIME(p_start_time) >= sh.start_hour AND TIME(p_end_time) <= sh.end_hour);

    -- If the staff is available during their shift, proceed to check for conflicting appointments or procedures
    IF p_available = 1 THEN
        -- Step 2: Check for overlapping appointments or procedures during the specified time
        SELECT COUNT(*)
        INTO conflicting_appointment
        FROM Appointment
        WHERE staff_id = p_staff_id
        AND (start_time < p_end_time AND end_time > p_start_time); -- Overlapping time

        SELECT COUNT(*)
        INTO conflicting_procedure
        FROM Procedures
        WHERE staff_id = p_staff_id
        AND (performed_date BETWEEN p_start_time AND p_end_time); -- Procedure overlap

        -- If there is any conflict, mark the staff as unavailable
        IF conflicting_appointment > 0 OR conflicting_procedure > 0 THEN
            SET p_available = 0;
        END IF;
    END IF;
END $$

DELIMITER ;




-- Add a new procedure
DELIMITER $$
CREATE PROCEDURE AddProcedure(
    IN p_patient_id INT,
    IN p_staff_id INT,
    IN p_category VARCHAR(255),
    IN p_medicine_id INT DEFAULT NULL,          -- Default medicine ID to NULL if no medicine is used
    IN p_medicine_quantity INT DEFAULT NULL,    -- Default quantity to NULL if no medicine is used
    IN p_start_time DATETIME,
    IN p_end_time DATETIME
)
BEGIN
    DECLARE staff_available INT;
    DECLARE procedure_cost DECIMAL(10, 2);
    DECLARE treatment_history_id INT;
    DECLARE open_treatment_exists INT;

    -- Start transaction
    START TRANSACTION;

    -- Check if the staff is available (capture the output from CheckStaffAvailability)
    CALL CheckStaffAvailability(p_staff_id, p_start_time, p_end_time, @staff_available);
    SELECT @staff_available INTO staff_available;

    -- If the staff is not available, roll back the transaction
    IF staff_available = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Staff member is not available during the specified time.';
        ROLLBACK;
    ELSE
        -- Check if the patient has an open treatment history for the current date
        SELECT COUNT(*) INTO open_treatment_exists
        FROM TreatmentHistory
        WHERE patient_id = p_patient_id
        AND visited_date = CURDATE()
        AND has_completed = FALSE;

        -- If no open treatment history exists, create a new treatment history record
        IF open_treatment_exists = 0 THEN
            INSERT INTO TreatmentHistory (type, disease, visited_date, has_completed, patient_id)
            VALUES ('OUTPATIENT', '', CURDATE(), FALSE, p_patient_id);

            -- Get the new treatment history ID
            SET treatment_history_id = LAST_INSERT_ID();
        ELSE
            -- Get the existing treatment history ID
            SELECT id INTO treatment_history_id
            FROM TreatmentHistory
            WHERE patient_id = p_patient_id
            AND visited_date = CURDATE()
            AND has_completed = FALSE;
        END IF;

        -- Calculate the procedure cost, handling the case where no medicine is used
        IF p_medicine_id IS NOT NULL AND p_medicine_quantity IS NOT NULL THEN
            SET procedure_cost = (SELECT CalculateProcedureCost(p_category, p_medicine_quantity));
        ELSE
            -- If no medicine is used, calculate the procedure cost based on the category alone
            SET procedure_cost = (SELECT CalculateProcedureCost(p_category, 0));  -- Assuming 0 for no medicine
        END IF;

        -- Insert into the Procedures table, handle the case when no medicine is used
        IF p_medicine_id IS NOT NULL AND p_medicine_quantity IS NOT NULL THEN
            INSERT INTO Procedures (category, price, staff_id, patient_id, medicineId, medicine_quantity, performed_date, history)
            VALUES (p_category, procedure_cost, p_staff_id, p_patient_id, p_medicine_id, p_medicine_quantity, NOW(), treatment_history_id);
        ELSE
            -- If no medicine is used, insert NULL values for medicineId and medicine_quantity
            INSERT INTO Procedures (category, price, staff_id, patient_id, medicineId, medicine_quantity, performed_date, history)
            VALUES (p_category, procedure_cost, p_staff_id, p_patient_id, NULL, NULL, NOW(), treatment_history_id);
        END IF;

        -- Commit the transaction if everything is successful
        COMMIT;
    END IF;

END $$

DELIMITER ;


-- Add a new admission
DELIMITER $$

CREATE PROCEDURE AddAdmission(
    IN p_patient_id INT,
    IN p_room_type VARCHAR(50),
    IN p_admission_date DATE,
    IN p_discharged_date DATE
)
BEGIN
    DECLARE treatment_history_id INT;
    DECLARE open_treatment_exists INT;
    DECLARE admission_cost_per_day DECIMAL(10, 2);
    DECLARE total_admission_cost DECIMAL(10, 2);
    DECLARE days_of_stay INT;

    -- Start transaction
    START TRANSACTION;

    -- Check if the patient has an open treatment history for the current date
    SELECT COUNT(*) INTO open_treatment_exists
    FROM TreatmentHistory
    WHERE patient_id = p_patient_id
    AND visited_date = CURDATE()
    AND has_completed = FALSE;

    -- If no open treatment history exists, create a new treatment history record
    IF open_treatment_exists = 0 THEN
        INSERT INTO TreatmentHistory (type, disease, visited_date, has_completed, patient_id)
        VALUES ('INPATIENT', '', CURDATE(), FALSE, p_patient_id);

        -- Get the new treatment history ID
        SET treatment_history_id = LAST_INSERT_ID();
    ELSE
        -- Get the existing treatment history ID
        SELECT id INTO treatment_history_id
        FROM TreatmentHistory
        WHERE patient_id = p_patient_id
        AND visited_date = CURDATE()
        AND has_completed = FALSE;
    END IF;

    -- Step 1: Calculate the days of stay
    SET days_of_stay = DATEDIFF(p_discharged_date, p_admission_date);

    -- Step 2: Get the admission cost per day (based on room type: 'STANDARD' or 'PREMIUM')
    IF p_room_type = 'STANDARD' THEN
        SET admission_cost_per_day = 100.00;  -- Example rate for Standard room
    ELSEIF p_room_type = 'PREMIUM' THEN
        SET admission_cost_per_day = 200.00;  -- Example rate for Premium room
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid room type. Must be either STANDARD or PREMIUM.';
        ROLLBACK;
    END IF;

    -- Step 3: Calculate the total admission cost
    SET total_admission_cost = days_of_stay * admission_cost_per_day;

    -- Step 4: Insert into the Admission table with discharged date and cost
    INSERT INTO Admission (status, admitted_date, discharged_date, room_type, price, treatment_history_id)
    VALUES ('COMPLETED', p_admission_date, p_discharged_date, p_room_type, total_admission_cost, treatment_history_id);

    -- Commit the transaction if everything is successful
    COMMIT;

END $$

DELIMITER ;

-- Add a new staff
DELIMITER $$

CREATE PROCEDURE AddNewStaffWithQualifications(
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_dob DATE,
    IN p_job_type VARCHAR(255),
    IN p_salary DECIMAL(10, 2),
    IN p_hired_date DATE,
    IN p_department_id INT,              -- Department the staff belongs to
    IN p_manager_id INT,                 -- Manager (can be NULL)
    
    -- Qualification details as separate arrays, all qualifications should match in length
    IN qualification_names TEXT,         -- Comma-separated list of qualification names
    IN qualification_providers TEXT,     -- Comma-separated list of providers
    IN qualification_issue_dates TEXT    -- Comma-separated list of issue dates (in 'YYYY-MM-DD' format)
)
BEGIN
    DECLARE new_staff_id INT;
    DECLARE qual_name VARCHAR(255);
    DECLARE qual_provider VARCHAR(255);
    DECLARE qual_issue_date DATE;
    DECLARE i INT DEFAULT 1;
    DECLARE qual_count INT;

    -- Start transaction
    START TRANSACTION;

    -- Step 1: Insert the new staff into the Staff table
    INSERT INTO Staff (first_name, last_name, dob, job_type, salary, hired_date, department_id, manager_id)
    VALUES (p_first_name, p_last_name, p_dob, p_job_type, p_salary, p_hired_date, p_department_id, p_manager_id);

    -- Step 2: Get the newly inserted staff ID
    SET new_staff_id = LAST_INSERT_ID();

    -- Step 3: Determine the number of qualifications based on the number of entries in the comma-separated lists
    SET qual_count = (LENGTH(qualification_names) - LENGTH(REPLACE(qualification_names, ',', ''))) + 1;

    -- Step 4: Loop through each qualification and insert it into the Qualification table
    WHILE i <= qual_count DO
        -- Extract individual qualification details from the comma-separated strings
        SET qual_name = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(qualification_names, ',', i), ',', -1));
        SET qual_provider = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(qualification_providers, ',', i), ',', -1));
        SET qual_issue_date = STR_TO_DATE(TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(qualification_issue_dates, ',', i), ',', -1)), '%Y-%m-%d');

        -- Insert the qualification for the new staff member
        INSERT INTO Qualification (name, provider, issue_date, staff_id)
        VALUES (qual_name, qual_provider, qual_issue_date, new_staff_id);

        -- Increment loop counter
        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;

END $$

DELIMITER ;

/************************************************************************************************/
-- CREATE TRIGGERS
/************************************************************************************************/
-- Trigger to generate a bill after a treatment is marked as complete
DELIMITER $$

CREATE TRIGGER GenerateBillAfterTreatmentComplete
AFTER UPDATE ON TreatmentHistory
FOR EACH ROW
BEGIN
    DECLARE total_procedure_cost DECIMAL(10, 2);
    DECLARE total_admission_cost DECIMAL(10, 2);
    DECLARE total_cost DECIMAL(10, 2);
    
    -- Only generate a bill if the treatment has been marked as complete
    IF NEW.has_completed = TRUE THEN
        -- Step 1: Calculate the total cost of all procedures for this treatment
        SELECT IFNULL(SUM(price), 0) INTO total_procedure_cost
        FROM Procedures
        WHERE treatment_history_id = NEW.id;

        -- Step 2: Calculate the total cost of the related admission (if any)
        SELECT IFNULL(SUM(price), 0) INTO total_admission_cost
        FROM Admission
        WHERE treatment_history_id = NEW.id;

        -- Step 3: Sum up procedure and admission costs to get total cost
        SET total_cost = total_procedure_cost + total_admission_cost;

        -- Step 4: Insert a new billing record with the calculated total cost
        INSERT INTO Billing (amount, billing_date, payment_status, treatment_history_id, patientId)
        VALUES (total_cost, NOW(), 'UNPAID', NEW.id, NEW.patient_id);
    END IF;
END $$

DELIMITER ;

-- Trigger to set Treatment to 'INPATIENT' when an admission is added
DELIMITER $$

CREATE TRIGGER UpdateTreatmentToInpatient
AFTER INSERT ON Admission
FOR EACH ROW
BEGIN
    -- Update the TreatmentHistory to set the type as 'INPATIENT'
    UPDATE TreatmentHistory
    SET type = 'INPATIENT'
    WHERE id = NEW.treatment_history_id;
END $$

-- Trigger to set Treatment to 'OUTPATIENT' when an admission is deleted
CREATE TRIGGER UpdateTreatmentToOutpatient
AFTER DELETE ON Admission
FOR EACH ROW
BEGIN
    -- Check if there are no other admissions for this treatment history
    IF (SELECT COUNT(*) FROM Admission WHERE treatment_history_id = OLD.treatment_history_id) = 0 THEN
        -- If no more admissions exist, set treatment type to 'OUTPATIENT'
        UPDATE TreatmentHistory
        SET type = 'OUTPATIENT'
        WHERE id = OLD.treatment_history_id;
    END IF;
END $$

DELIMITER ;

-- Trigger to track staff changes
DELIMITER $$

CREATE TRIGGER TrackStaffChanges
AFTER UPDATE ON Staff
FOR EACH ROW
BEGIN
    -- Check if the job title, salary, or department has changed
    IF OLD.job_type <> NEW.job_type OR OLD.salary <> NEW.salary OR OLD.department_id <> NEW.department_id THEN
        -- Insert a new record into EmploymentHistory
        INSERT INTO EmploymentHistory (
            staff_id,
            previous_job_title,
            current_job_title,
            previous_salary,
            current_salary,
            previous_department_id,
            current_department_id,
            applied_date
        ) VALUES (
            NEW.id,
            OLD.job_type,
            NEW.job_type,
            OLD.salary,
            NEW.salary,
            OLD.department_id,
            NEW.department_id,
            NOW()  -- Record the current date
        );
    END IF;
END $$

DELIMITER ;




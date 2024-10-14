-- View workers in each department
SELECT
	d.id, d.name AS department,
    GROUP_CONCAT(s.id ORDER BY s.id SEPARATOR ', ') AS workers
FROM
    Staff s JOIN Department d 
ON s.department = d.id
GROUP BY
    d.id, d.name
ORDER BY
	d.id;

-- View doctors and nurses in each department
SELECT
	d.id,
    d.name AS department,
    GROUP_CONCAT(CASE WHEN s.job_type = 'Doctor' THEN s.id END ORDER BY s.id SEPARATOR ', ') AS doctors,
    GROUP_CONCAT(CASE WHEN s.job_type = 'Nurse' THEN s.id END ORDER BY s.id SEPARATOR ', ') AS nurses
FROM Staff s JOIN Department d 
ON s.department = d.id
GROUP BY d.id, d.name
ORDER BY d.id;


SELECT
    s.id AS staff_id,
    CONCAT(
        'Day: ', sh.day_of_week, 
        ', Start: ', sh.start_hour, 
        ', End: ', sh.end_hour
    ) AS working_hours
FROM
    Staff_Shift ss
JOIN
    Shift sh ON ss.shift_id = sh.id
JOIN
    Staff s ON ss.staff_id = s.id
ORDER BY
    s.id, sh.day_of_week, sh.start_hour;
    
use test2408;
DROP FUNCTION fn_CalculateAge;
DELIMITER $$
CREATE FUNCTION fn_CalculateAge (BirthDate DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE CurrentDate DATE;
    DECLARE Age INT;

    -- Get the current date
    SET CurrentDate = CURDATE();

    -- Calculate the age
    SET Age = TIMESTAMPDIFF(YEAR, BirthDate, CurrentDate);

    RETURN Age;
END $$
DELIMITER ;

DROP trigger update_procedure_price;
DROP trigger update_procedure_price_update;
-- Create a function for calculating the cost of a procedure, also substracting the quantity from the medicine
-- Categories including Checkups: $100/Prescription: Med ID*Quantity/Operations: $3000/Ultrasound: $400/Image scans+Lab: $80
DELIMITER $$

CREATE TRIGGER update_procedure_price
BEFORE INSERT ON Procedures
FOR EACH ROW
BEGIN
    IF NEW.category = 'Checkups' THEN
        SET NEW.price = 100.00;
    ELSEIF NEW.category = 'Prescription' THEN
        -- Assuming you have a table named Medicines with fields medicine_id and price
        SET NEW.price = (SELECT price FROM Medicine WHERE id = NEW.medicineId) * NEW.medicine_quantity;
    ELSEIF NEW.category = 'Operations' THEN
        SET NEW.price = 3000.00;
    ELSEIF NEW.category = 'Ultrasound' THEN
        SET NEW.price = 400.00;
    ELSEIF NEW.category = 'Image scans' OR NEW.category = 'Lab' THEN
        SET NEW.price = 80.00;
    ELSE
        SET NEW.price = 0.00; -- Default price if the category is not matched
    END IF;

    -- Add medicine cost if applicable
    IF NEW.category <> 'Prescription' AND NEW.medicineId IS NOT NULL AND NEW.medicine_quantity IS NOT NULL THEN
        SET NEW.price = NEW.price + (SELECT price FROM Medicine WHERE id = NEW.medicineId) * NEW.medicine_quantity;
    END IF;
END $$

CREATE TRIGGER update_procedure_price_update
BEFORE UPDATE ON Procedures
FOR EACH ROW
BEGIN
    IF NEW.category = 'Checkups' THEN
        SET NEW.price = 100.00;
    ELSEIF NEW.category = 'Prescription' THEN
        SET NEW.price = (SELECT price FROM Medicine WHERE id = NEW.medicineId) * NEW.medicine_quantity;
    ELSEIF NEW.category = 'Operations' THEN
        SET NEW.price = 3000.00;
    ELSEIF NEW.category = 'Ultrasound' THEN
        SET NEW.price = 400.00;
    ELSEIF NEW.category = 'Image scans' OR NEW.category = 'Lab' THEN
        SET NEW.price = 80.00;
    ELSE
        SET NEW.price = 0.00; -- Default price if the category is not matched
    END IF;

    -- Add medicine cost if applicable
    IF NEW.category <> 'Prescription' AND NEW.medicineId IS NOT NULL AND NEW.medicine_quantity IS NOT NULL THEN
        SET NEW.price = NEW.price + (SELECT price FROM Medicine WHERE id = NEW.medicineId) * NEW.medicine_quantity;
    END IF;
END $$

DELIMITER ;


/****************************************************************************************
 * A function to calculate the total cost of a patient's treatment history
 ****************************************************************************************/
DELIMITER $$
CREATE FUNCTION fn_CalculateBillTotalCost(treatmentHistoryId INT)
RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
    DECLARE totalCost DECIMAL(10, 2);

    -- Initialize totalCost
    SET totalCost = 0.00;

    -- Sum up the costs from the Procedures table
    SELECT COALESCE(SUM(price), 0.00) INTO totalCost
    FROM Procedures
    WHERE treatment_history_id = treatmentHistoryId;

    -- Add costs from the Admission table (if available)
    SET totalCost = totalCost +
    (
        SELECT COALESCE(SUM(
            CASE
                WHEN room_type = 'STANDARD' THEN 100 * DATEDIFF(COALESCE(discharged_date, CURRENT_DATE), admitted_date)
                WHEN room_type = 'PREMIUM' THEN 200 * DATEDIFF(COALESCE(discharged_date, CURRENT_DATE), admitted_date)
                ELSE 0
            END
        ), 0.00)
        FROM Admission
        WHERE treatment_history_id = treatmentHistoryId
    );

    RETURN totalCost;
END $$
DELIMITER ;

SELECT fn_CalculateBillTotalCost(3);


CREATE FUNCTION fn_calculateAppointmentDuration(start_time DATETIME, end_time DATETIME) RETURNS INT
BEGIN
    RETURN TIMESTAMPDIFF(MINUTE, start_time, end_time);
END;


/****************************************************************************************
 * Triggers and Procedures
 ****************************************************************************************/
-- Trigger to prevent overlapping shifts for staff members
CREATE TRIGGER before_staff_shift_insert
BEFORE INSERT ON Staff_Shift
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 FROM Staff_Shift ss
        JOIN Shift s ON ss.shift_id = s.id
        WHERE ss.staff_id = NEW.staff_id
        AND (s.start_hour <= NEW.end_hour AND s.end_hour >= NEW.start_hour)
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Shift overlap detected for staff member.';
    END IF;
END;

-- Procedure to book an appointment
CREATE PROCEDURE book_appointment(
    IN p_start_time DATETIME,
    IN p_end_time DATETIME,
    IN p_purpose VARCHAR(255),
    IN p_patient INT,
    IN p_doctor INT
)
BEGIN
    DECLARE appointment_count INT;
    SELECT COUNT(*) INTO appointment_count
    FROM Appointment
    WHERE staff_id = p_doctor
    AND ((start_time <= p_start_time AND end_time > p_start_time)
    OR (start_time < p_end_time AND end_time >= p_end_time));

    IF appointment_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Doctor is already booked during the selected time.';
    ELSE
        INSERT INTO Appointment (start_time, end_time, purpose, status, patient_id, staff_id)
        VALUES (p_start_time, p_end_time, p_purpose, 'BOOKED', p_patient, p_doctor);
    END IF;
END;

-- Procedure to generate a staff workload report
CREATE PROCEDURE generate_staff_workload_report(
    IN p_staff_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT s.fname, s.lname, COUNT(a.id) AS total_appointments, COUNT(p.id) AS total_procedures
    FROM Staff s
    LEFT JOIN Appointment a ON a.staff_id = s.id AND a.start_time BETWEEN p_start_date AND p_end_date
    LEFT JOIN Procedures p ON p.staff_id = s.id AND p.performed_date BETWEEN p_start_date AND p_end_date
    WHERE s.id = p_staff_id
    GROUP BY s.id;
END;


select * from Shift where day_of_week LIKE (SELECT DATE_FORMAT(curdate(), '%a'));
select first_name, last_name, day_of_week, start_hour, end_hour 
FROM shift_staff ss, staff st, shift sh
WHERE ss.shiftId = sh.id AND ss.staffId = st.id AND sh.id IN (select id from Shift where day_of_week LIKE (SELECT DATE_FORMAT(curdate(), '%a')));



-- Use the function with a subquery
SELECT id, fname, lname, dob, job_type, fn_CalculateAge(DOB) AS Age
FROM test2408.staff
ORDER BY Age;

INSERT INTO Patient (cid, first_name, last_name, dob, gender, blood_type) VALUES
('079304025xxx', 'Ha', 'Trinh', '2004-11-08', 'Female', 'A+');
INSERT INTO Insurance (code, expired_date, patient_id) VALUES
('ENDMYSUFFER123', '2030-12-31', 21);
INSERT INTO Address (address_line, ward, district, city, patient_id) VALUES
('159 Xa lo Ha Noi', 'Thao Dien Ward', 'District 2', 'Ho Chi Minh City', 21);

INSERT INTO TreatmentHistory(type, disease, visited_date, patient_id) VALUES
('OUTPATIENT', 'Depression', '2024-08-29', 21);

SELECT * FROM TreatmentHistory where patient_id = 21 and visited_date = CURDATE();

INSERT INTO Procedures (category, performer, patient, medicine, med_quantity, performed_date, history) VALUES
('Checkups', 9, 21, 30, 2, '2020-01-15 10:29:58', 4);


UPDATE Procedures set medicine = 31 where id = 10;


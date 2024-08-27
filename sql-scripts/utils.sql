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
        SET NEW.price = (SELECT price FROM Medicine WHERE id = NEW.medicine) * NEW.med_quantity;
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
    IF NEW.category <> 'Prescription' AND NEW.medicine IS NOT NULL AND NEW.med_quantity IS NOT NULL THEN
        SET NEW.price = NEW.price + (SELECT price FROM Medicine WHERE id = NEW.medicine) * NEW.med_quantity;
    END IF;
END $$

CREATE TRIGGER update_procedure_price_update
BEFORE UPDATE ON Procedures
FOR EACH ROW
BEGIN
    IF NEW.category = 'Checkups' THEN
        SET NEW.price = 100.00;
    ELSEIF NEW.category = 'Prescription' THEN
        SET NEW.price = (SELECT price FROM Medicine WHERE id = NEW.medicine) * NEW.med_quantity;
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
    IF NEW.category <> 'Prescription' AND NEW.medicine IS NOT NULL AND NEW.med_quantity IS NOT NULL THEN
        SET NEW.price = NEW.price + (SELECT price FROM Medicine WHERE id = NEW.medicine) * NEW.med_quantity;
    END IF;
END $$

DELIMITER ;


-- Use the function with a subquery
SELECT id, fname, lname, dob, job_type, fn_CalculateAge(DOB) AS Age
FROM test2408.staff
ORDER BY Age;

INSERT INTO Insurance (code, end_date) VALUES
('ENDMYSUFFER123', '2030-12-31');
INSERT INTO Address (street, ward, district, city) VALUES
('159 Xa lo Ha Noi', 'Thao Dien Ward', 'District 2', 'Ho Chi Minh City');
INSERT INTO Patient (cid, fname, lname, dob, gender, blood_type, insurance, address) VALUES
('079304025xxx', 'Ha', 'Trinh', '2004-11-08', 'Female', 'A+', 'ENDMYSUFFER123', 21);

INSERT INTO TreatmentHistory(type, diseases, visited_date, patient) VALUES
('OUTPATIENT', 'Depression', '2024-08-27', 21);

SELECT * FROM TreatmentHistory where patient = 21 and visited_date = CURDATE();

INSERT INTO Procedures (category, performer, patient, medicine, med_quantity, performed_date, history) VALUES
('Checkups', 9, 21, 30, 2, '2020-01-15 10:29:58', 4);


UPDATE Procedures set medicine = 31 where id = 10;


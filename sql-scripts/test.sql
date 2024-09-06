use hospitalmanagementsystem;
INSERT INTO Allergy (allergen, symptoms, category) VALUES
-- Food allergens
('Balsam of Peru', 'Redness, swelling, itching, dermatitis reactions, stomatitis, cheilitis, pruritus, hand eczema, rhinitis, conjunctivitis, and blisters.', 'Food'),
('Buckwheat', 'Asthma, rhinitis, pruritus, gastrointestinal disturbances, urticaria, angioedema, shock, anaphylaxis', 'Food'),
('Celery', 'Abdominal pain, nausea, vomiting, oral allergy syndrome, urticaria, neck or facial swelling, severe asthma symptoms, exercise-induced anaphylaxis, potentially fatal anaphylactic shocks', 'Food'),
('Egg', 'Anaphylaxis, swelling, sometimes flatulence and vomiting', 'Food'),
('Fish', 'Respiratory reactions, anaphylaxis, oral allergy syndrome, sometimes vomiting', 'Food'),
('Fruit', 'Mild itching, rash, generalized urticaria, oral allergy syndrome, abdominal pain, vomiting, anaphylaxis', 'Food'),
('Garlic', 'Dermatitis, asymmetrical fissure', 'Food'),
('Oats', 'Dermatitis, respiratory problems, anaphylaxis', 'Food'),
('Maize', 'Hives, pallor, confusion, dizziness, stomach pain, swelling, vomiting, indigestion, diarrhea, cough, tightness in throat', 'Food'),
('Milk', 'Skin rash, hives, vomiting, diarrhea, constipation, stomach pain, flatulence, colitis, nasal congestion, dermatitis, blisters, migraine, anaphylaxis', 'Food'),
('Mustard', 'Eczema, rash, hives, facial swelling, other skin reactions, oral allergy syndrome, conjunctivitis', 'Food'),
('Peanut', 'Anaphylaxis and swelling, sometimes vomiting', 'Food'),
('Poultry Meat', 'Hives, swelling, nausea, vomiting, diarrhea, severe oral allergy syndrome, shortness of breath, rarely anaphylactic shock', 'Food'),
('Red Meat', 'Hives, swelling, dermatitis, stomach pain, nausea, vomiting, dizziness, fainting, shortness of breath, anaphylaxis', 'Food'),
('Rice', 'Sneezing, runny nose, itching, stomachache, eczema.', 'Food'),
('Sesame', 'Possible respiratory, skin, and gastrointestinal reactions which can trigger serious systemic anaphylactic responses.', 'Food'),
('Shellfish', 'Respiratory symptoms, anaphylaxis, oral allergy syndrome, gastrointestinal symptoms, rhinitis, conjunctivitis', 'Food'),
('Soy', 'Anaphylaxis, asthma exacerbation, rhinitis, allergic conjunctivitis, hives, atopic dermatitis, swelling, diarrhea, nausea, vomiting', 'Food'),
('Sulfites', 'Hives, rash, redness of skin, headache, burning behind eyes, asthma-like breathing difficulties, anaphylaxis', 'Food'),
('Tartrazine', 'Skin irritation, hives, rash', 'Food'),
('Tree nut', 'Anaphylaxis, swelling, rash, hives, sometimes vomiting', 'Food'),
('Wheat', 'Eczema, hives, asthma, hay fever, oral allergy syndrome, angioedema, abdominal cramps, celiac disease, exercise-induced anaphylaxis', 'Food'),
-- Medical allergens
('Tetracycline', 'Severe headache, dizziness, blurred vision, fever, chills, body aches, flu symptoms, dark colored urine', 'Medical'),
('Dilantin', 'Swollen glands, easy bruising or bleeding, fever, sore throat', 'Medical'),
('Tegretol', 'Shortness of breath, wheezing or difficulty breathing, swelling of the face, lips, tongue, hives', 'Medical'),
('Penicillin', 'Diarrhea, hypersensitivity, nausea, rash, neurotoxicity, urticaria', 'Medical'),
('Cephalosporins', 'Maculopapular, serum-sickness–like reactions, and anaphylaxis.', 'Medical'),
('Sulfonamides', 'Urinary tract disorders, haemopoietic disorder, Stevens–Johnson syndrome', 'Medical'),
('Non-steroidal anti-inflammatories', 'Swollen eyes, lips, or tongue, difficulty swallowing', 'Medical'),
('Intravenous contrast dye', 'Anaphylactoid reactions and contrast-induced nephropathy', 'Medical'),
('Local anesthetics', 'Urticaria and rash, dyspnea, wheezing, flushing, cyanosis, tachycardia', 'Medical'),
-- Environmental allergens
('Pollen', 'Sneezing, irritation of the nose, nasal congestion, minor fatigue', 'Environmental'),
('Cat', 'Sneezing, itchy swollen eyes, rash, congestion, wheezing', 'Environmental'),
('Dog', 'Rash, sneezing, congestion, wheezing, vomiting from coughing, itchy welts.', 'Environmental'),
('Insect sting', 'Hives, wheezing, possible anaphylaxis', 'Environmental'),
('Mold', 'Sneeze, coughing, itchy, discharge from the nose, respiratory irritation, congested feeling', 'Environmental'),
('Perfume', 'Itchy eyes, runny nose, sore throat, headaches, muscle/joint pain, asthma attack', 'Environmental'),
('Cosmetics', 'Contact dermatitis, irritant contact dermatitis, conjunctivitis, sneezing', 'Environmental'),
('Semen', 'Burning, pain and swelling, swelling or blisters, vaginal redness, fever, runny nose, extreme fatigue', 'Environmental'),
('Latex', 'Contact dermatitis, hypersensitivity', 'Environmental'),
('Water', 'Epidermal itching, swelling of the oral cavity after drinking water, anaphylaxis', 'Environmental'),
('Cold stimuli', 'Hives, itching', 'Environmental'),
('House dust mite', 'Asthma', 'Environmental'),
('Nickel', 'Allergic contact dermatitis, dyshidrotic eczema', 'Environmental'),
('Gold', 'Allergic contact dermatitis', 'Environmental'),
('Chromium', 'Allergic contact dermatitis', 'Environmental'),
('Cobalt chloride', 'Allergic contact dermatitis', 'Environmental'),
('Formaldehyde', 'Allergic contact dermatitis', 'Environmental'),
('Photographic developers', 'Allergic contact dermatitis', 'Environmental'),
('Fungicide', 'Allergic contact dermatitis, fever, anaphylaxis', 'Environmental'),
-- Contact allergens
('Dimethylaminopropylamine (DMAPA)', 'Eyelid dermatitis', 'Contact'),
('Latex', 'Ethylene-ripened fruits, allergic contact dermatitis, hypersensitivity', 'Contact'),
('Paraphenylenediamine (PPD)', 'Eyelid dermatitis, black hair dye, color developer, scuba gear, henna', 'Contact'),
('Glyceryl monothioglycolate', 'Eyelid dermatitis, permanent hair waving solutions', 'Contact'),
('Toluenesulfonamide formaldehyde', 'Eyelid dermatitis, nail polish', 'Contact'),
('Tennis ball felt waterproofing agent (Nano Titanium dioxide)', 'Weight gain in middle-aged subjects, physical contact in hypersensitive patients only', 'Contact');


INSERT INTO Medicine (name, effect, side_effect, price) VALUES
-- Emergency
('Epinephrine', 'Treatment of severe allergic reactions, cardiac arrest', 'Palpitations, anxiety',25.00),
('Atropine', 'Treatment of bradycardia, poisoning', 'Dry mouth, blurred vision', 15.00),
('Naloxone', 'Reverses opioid overdose', 'Rapid heart rate, sweating', 18.00),
-- Anaesthetics
('Propofol', 'Induces and maintains anesthesia', 'Low blood pressure, respiratory depression', 50.00),
('Lidocaine', 'Local anesthetic', 'Dizziness, numbness', 12.00),
('Fentanyl', 'Pain relief, anesthetic adjunct', 'Nausea, respiratory depression', 75.00),
-- Surgery
('Cefazolin', 'Prevents infection during surgery', 'Allergic reactions, diarrhea', 20.00),
('Heparin', 'Prevents blood clots during surgery', 'Bleeding, thrombocytopenia', 30.00),
('Ketamine', 'Induction of anesthesia, pain relief', 'Hallucinations, hypertension', 40.00),
-- Laboratory
('Glucose', 'Blood sugar regulation', 'Hyperglycemia in high doses', 5.00),
('Saline', 'Fluid replacement', 'Overhydration', 2.50),
('Potassium chloride', 'Electrolyte replenishment', 'Hyperkalemia', 10.00),
-- Pediatrics
('Amoxicillin', 'Treats bacterial infections', 'Rash, diarrhea', 8.00),
('Ibuprofen (Pediatric)', 'Pain relief, fever reducer', 'Stomach upset, kidney damage', 6.00),
('Diphenhydramine', 'Allergy relief, sleep aid', 'Drowsiness, dry mouth', 7.50),
-- Neurology
('Diazepam', 'Anxiety relief, muscle relaxation', 'Drowsiness, dizziness', 20.00),
('Carbamazepine', 'Treats seizures, neuropathic pain', 'Dizziness, nausea', 22.00),
('Levetiracetam', 'Seizure prevention', 'Fatigue, mood changes', 25.00),
-- Ophthalmology
('Timolol', 'Reduces intraocular pressure', 'Burning sensation, blurred vision', 15.00),
('Atropine (Ophthalmic)', 'Dilates pupils', 'Dry mouth, blurred vision', 12.00),
('Prednisolone acetate', 'Reduces eye inflammation', 'Increased eye pressure', 18.00),
-- Otorhinolaryngology
('Fluticasone nasal spray', 'Reduces nasal inflammation', 'Nosebleeds, throat irritation', 10.00),
('Cetirizine', 'Allergy relief', 'Drowsiness, dry mouth', 8.00),
('Amoxicillin-clavulanate', 'Treats ENT infections', 'Diarrhea, rash', 14.00),
-- Cardiology
('Atenolol', 'Reduces blood pressure, treats angina', 'Bradycardia, fatigue', 20.00),
('Lisinopril', 'Lowers blood pressure, treats heart failure', 'Cough, hyperkalemia', 18.00),
('Clopidogrel', 'Prevents blood clots', 'Bleeding, rash', 25.00),
-- Gastroenterology
('Omeprazole', 'Reduces stomach acid', 'Headache, diarrhea', 12.00),
('Metoclopramide', 'Treats nausea, GERD', 'Drowsiness, restlessness', 10.00),
('Lactulose', 'Treats constipation, hepatic encephalopathy', 'Bloating, diarrhea', 15.00),
-- Gynaecology
('Estradiol', 'Hormone replacement therapy', 'Breast tenderness, nausea', 25.00),
('Medroxyprogesterone', 'Prevents endometrial hyperplasia', 'Weight gain, mood changes', 20.00),
('Clomiphene', 'Treats infertility', 'Hot flashes, ovarian enlargement', 30.00),
-- Orthopedics
('Methocarbamol', 'Muscle relaxation', 'Drowsiness, dizziness', 18.00),
('Alendronate', 'Treats osteoporosis', 'Esophageal irritation, muscle pain', 25.00),
('Naproxen', 'Pain relief, anti-inflammatory', 'Stomach ulcers, kidney damage', 12.00),
-- Additional Medicines
('Aspirin', 'Pain relief, anti-inflammatory, fever reducer', 'Gastric irritation, bleeding', 5.00),
('Paracetamol', 'Pain relief, fever reducer', 'Liver damage in high doses', 3.50),
('Ibuprofen', 'Pain relief, anti-inflammatory, fever reducer', 'Stomach ulcers, kidney damage', 4.20),
('Hydrocortisone', 'Reduces inflammation', 'Weight gain, mood changes', 10.00),
('Warfarin', 'Prevents blood clots', 'Bleeding, bruising', 22.00),
('Clindamycin', 'Treats bacterial infections', 'Diarrhea, nausea', 15.00),
('Dexamethasone', 'Reduces inflammation', 'Increased appetite, weight gain', 18.00),
('Gentamicin', 'Treats serious bacterial infections', 'Kidney damage, hearing loss', 30.00),
('Tetracycline', 'Treats bacterial infections', 'Photosensitivity, nausea', 12.00),
('Morphine', 'Pain relief', 'Respiratory depression, nausea', 35.00),
('Furosemide', 'Diuretic, reduces fluid buildup', 'Dehydration, electrolyte imbalance', 8.00),
('Verapamil', 'Treats high blood pressure, angina', 'Constipation, dizziness', 22.00),
('Losartan', 'Lowers blood pressure', 'Dizziness, increased potassium levels', 20.00),
('Spironolactone', 'Diuretic, treats heart failure', 'Hyperkalemia, breast tenderness', 25.00),
('Digoxin', 'Treats heart failure, arrhythmias', 'Nausea, dizziness', 28.00),
('Nitroglycerin', 'Treats angina', 'Headache, dizziness', 18.00),
('Ceftriaxone', 'Treats bacterial infections', 'Diarrhea, rash', 20.00),
('Hydrochlorothiazide', 'Diuretic, treats high blood pressure', 'Low potassium, dizziness', 10.00),
('Simvastatin', 'Lowers cholesterol', 'Muscle pain, liver damage', 15.00),
('Metformin', 'Treats type 2 diabetes', 'Nausea, diarrhea', 12.00),
('Insulin', 'Lowers blood sugar levels', 'Hypoglycemia, weight gain', 35.00),
('Salbutamol', 'Bronchodilator, treats asthma', 'Tremor, palpitations', 10.00),
('Montelukast', 'Treats asthma, allergies', 'Headache, abdominal pain', 15.00),
('Ranitidine', 'Reduces stomach acid', 'Headache, dizziness', 10.00),
('Azithromycin', 'Treats bacterial infections', 'Diarrhea, nausea', 20.00),
('Clotrimazole', 'Treats fungal infections', 'Skin irritation, rash', 8.00);

INSERT INTO Patient (cid, first_name, last_name, dob, gender, blood_type) VALUES
('1A2B3C4D5E6F7G8', 'Kevin', 'Darroyo', '1993-04-12', 'Male', 'O+'),
('2B3C4D5E6F7G8H9', 'Elise', 'Jasinki', '2014-06-22', 'Female', 'A-'),
('3C4D5E6F7G8H9I0', 'Jakub', 'Nowak', '2009-11-13', 'Male', 'B+'),
('4D5E6F7G8H9I0J1', 'Lochlan', 'Noble', '1981-02-08', 'Female', 'AB+'),
('5E6F7G8H9I0J1K2', 'Kacper', 'Blaszczyk', '1934-09-19', 'Male', 'O-'),
('6F7G8H9I0J1K2L3', 'Karin', 'Oktawian', '1987-01-15', 'Female', 'A+'),
('7G8H9I0J1K2L3M4', 'Olaf', 'Grodzki', '1995-03-23', 'Male', 'B-'),
('8H9I0J1K2L3M4N5', 'Julia', 'Wajda', '1975-07-30', 'Female', 'AB-'),
('9I0J1K2L3M4N5O6', 'Antek', 'Rachwal', '1969-05-25', 'Male', 'O+'),
('0J1K2L3M4N5O6P7', 'Dominika', 'Mycio', '1982-10-09', 'Female', 'A-'),
('1K2L3M4N5O6P7Q8', 'Lukasz', 'Zuchniewicz', '2003-08-17', 'Male', 'B+'),
('2L3M4N5O6P7Q8R9', 'Amine', 'Harizi', '2001-02-11', 'Female', 'AB+'),
('3M4N5O6P7Q8R9S0', 'Milosz', 'Rogala', '1981-05-21', 'Male', 'O-'),
('4N5O6P7Q8R9S0T1', 'Niko', 'Rakus', '2000-09-07', 'Male', 'A+'),
('5O6P7Q8R9S0T1U2', 'Attila', 'Szlancsik', '1992-09-13', 'Male', 'B-'),
('6P7Q8R9S0T1U2V3', 'Pawel', 'Biernat', '1969-12-11', 'Female', 'AB-'),
('7Q8R9S0T1U2V3W4', 'Magdalena', 'Bulgakov', '1955-02-05', 'Female', 'O+'),
('8R9S0T1U2V3W4X5', 'Andrius', 'Baltutis', '1994-01-05', 'Male', 'A-'),
('9S0T1U2V3W4X5Y6', 'Ivan', 'Filipenko', '1995-04-17', 'Male', 'B+'),
('0T1U2V3W4X5Y6Z7', 'Wiktoria', 'Sekrit', '1972-06-01', 'Female', 'AB+');

INSERT INTO Insurance (code, expired_date, patient_id) VALUES
('XK92JF7B2A', '2025-12-31', 1),
('DL84YH3K9P', '2025-11-30', 2),
('QA19ZR5T4M', '2026-01-15', 3),
('WT65XC8V1L', '2025-09-20', 4),
('PM93ND2G7O', '2026-02-10', 5),
('FV27TH9Q6B', '2025-08-05', 6),
('YN38UI4M5A', '2026-03-25', 7),
('MK65RX2F9C', '2025-07-14', 8),
('BC21VJ7P8K', '2026-04-18', 9),
('TR89ZP3M4D', '2025-10-22', 10),
('NJ47GL2Q5E', '2026-05-30', 11),
('QW93FX6T1Y', '2025-06-17', 12),
('LH83PT9R4U', '2026-08-01', 13),
('EU62DN5V7B', '2025-03-12', 14),
('OI74SK1G9F', '2026-09-27', 15),
('PB67ZC3R2M', '2025-04-15', 16),
('CK45XJ8Q1A', '2026-10-11', 17),
('HY92DF3P7N', '2025-01-30', 18),
('ZM74XR6T5L', '2026-11-08', 19),
('VW28KM9Q2B', '2025-02-23', 20);

INSERT INTO Address (address_line, ward, district, city, patient_id) VALUES
('22 Le Loi', 'Ward 1', 'District 1', 'Ho Chi Minh City', 1),
('36 Quoc Huong', 'Thao Dien Ward', 'District 2', 'Ho Chi Minh City', 2),
('1 Vo Van Tan', 'Vo Thi Sau Ward', 'District 3', 'Ho Chi Minh City', 3),
('101 Cong Hoa', 'Ward 8', 'District 4', 'Ho Chi Minh City', 4),
('235 Nguyen Van Cu', 'Ward 4', 'District 5', 'Ho Chi Minh City', 5),
('303 Hai Ba Trung', 'Ward 6', 'District 6', 'Ho Chi Minh City', 6),
('701 Nguyen Van Linh', 'Tan Phong Ward', 'District 7', 'Ho Chi Minh City', 7),
('505 Nguyen Thi Minh Khai', 'Ward 8', 'District 8', 'Ho Chi Minh City', 8),
('12 Le Duan', 'Ward 9', 'District 9', 'Ho Chi Minh City', 9),
('69 Ba Hat', 'Ward 10', 'District 10', 'Ho Chi Minh City', 10),
('520 Vo Thi Sau', 'Ward 11', 'District 11', 'Ho Chi Minh City', 11),
('99 Cong Quynh', 'Ward 12', 'District 12', 'Ho Chi Minh City', 12),
('327 No Trang Long', 'Ward 13', 'Binh Thanh District', 'Ho Chi Minh City', 13),
('83 Nguyen Van Troi', 'Ward 14', 'Go Vap District', 'Ho Chi Minh City', 14),
('28 Truong Chinh', 'Ward 1', 'Tan Binh District', 'Ho Chi Minh City', 15),
('132 Cong Hoa', 'Ward 16', 'Tan Phu District', 'Ho Chi Minh City', 16),
('33 Phan Van Tri', 'Ward 17', 'Binh Tan District', 'Ho Chi Minh City', 17),
('402 Phan Xich Long', 'Ward 2', 'Phu Nhuan District', 'Ho Chi Minh City', 18),
('1616 Hiep Binh', 'Ward 4', 'Thu Duc District', 'Ho Chi Minh City', 19),
('49 Phan Van Bay', 'Ward 2', 'Nha Be District', 'Ho Chi Minh City', 20);

INSERT INTO Department (name) VALUES
('Emergency'),
('Anaesthetics'),
('Surgery'),
('Laboratory'),
('Pediatrics'),
('Neurology'),
('Ophthalmology'),
('Otorhinolaryngology'),
('Cardiology'),
('Gastroenterology'),
('Gynaecology'),
('Orthopedics');


INSERT INTO Staff (first_name, last_name, dob, job_type, salary, hired_date, department_id, manager_id) VALUES
-- Administrative Personnel
('Meredith', 'Grey', '1955-07-22', 'Administrative Personnel', 500000.00, '2017-01-01', 1, NULL), -- president
('Shaun', 'Murphy', '1962-11-05', 'Administrative Personnel', 450000.00, '2017-03-15', 1, 1), -- vice president
('Derek', 'Shepherd', '1960-02-15', 'Administrative Personnel', 380000.00, '2017-06-23', 1, 1), -- director
-- Doctors
('Martin', 'Nevels', '1992-11-11', 'Doctor', 120000.00, '2018-01-01', 1, 3), -- 4
('Christine', 'Yang', '1980-06-12', 'Doctor', 110000.00, '2018-06-12', 2, 3),
('Emily', 'Davis', '1982-12-25', 'Doctor', 115000.00, '2018-09-25', 3, 3), -- 6
('Joshua', 'Hansen', '1978-09-30', 'Doctor', 118000.00, '2018-10-30', 4, 3),
('Sarah', 'Wilson', '1985-05-16', 'Doctor', 112000.00, '2018-12-16',5, 3), -- 8
('David', 'Clark', '1983-08-08', 'Doctor', 119000.00, '2018-12-25', 6, 3),
('Susan', 'Lewis', '1977-01-13', 'Doctor', 121000.00, '2018-12-31', 7, 3), -- 10
('Paul', 'Walker', '1979-10-18', 'Doctor', 117000.00, '2019-01-18', 8, 3),
('Nancy', 'Hall', '1984-04-21', 'Doctor', 113000.00, '2019-04-21', 9, 3),
('Mark', 'Allen', '1986-11-29', 'Doctor', 116000.00, '2019-05-07', 10, 3), -- 13
('Donna', 'Evans', '1975-08-22', 'Doctor', 85000.00, '2019-08-17', 11, 3),
('Jason', 'Morris', '1977-10-06', 'Doctor', 82000.00, '2019-10-09', 12, 3), -- 15
('Gordon', 'Ramsey', '1982-12-14', 'Doctor', 88000.00, '2019-11-07', 1, 4),
('Joseph', 'Rivera', '1985-02-28', 'Doctor', 86000.00, '2019-11-20', 2, 5),
('Betty', 'Robinson', '1979-04-17', 'Doctor', 83000.00, '2020-01-17', 3, 6), -- 18
('Richard', 'Phillips', '1981-11-09', 'Doctor', 84500.00, '2020-02-09', 4, 7),
('Barbara', 'Campbell', '1986-01-25', 'Doctor', 87500.00, '2020-04-25', 5, 8),
('Christopher', 'Parker', '1978-07-31', 'Doctor', 89500.00, '2020-04-30', 6, 9), -- 21
('Sandra', 'Young', '1980-03-13', 'Doctor', 87000.00, '2020-06-21', 7, 10),
('Levi', 'Nguyen', '1996-12-21', 'Doctor', 87000.00, '2020-07-04', 8, 11),
('Elizabeth', 'Stewart', '1984-09-21', 'Doctor', 87000.00, '2020-08-15', 9, 12), -- 24
('Catherine', 'Young', '1990-02-14', 'Doctor', 65000.00, '2020-09-22', 10, 13),
('Brian', 'King', '1988-07-09', 'Doctor', 63000.00, '2020-10-10', 11, 14),
('Jessica', 'Scott', '1992-12-03', 'Doctor', 67000.00, '2021-12-03', 12, 15), -- 27
-- Nurses
('Steven', 'Spielberg', '1991-04-27', 'Nurse', 64000.00, '2018-04-27', 1, 4),
('Melissa', 'Adams', '1987-09-05', 'Nurse', 68000.00, '2019-09-05', 2, 5),
('Kevin', 'Nelson', '1989-01-20', 'Nurse', 66000.00, '2020-01-20', 3, 6),
('Patricia', 'Carter', '1983-06-30', 'Nurse', 62000.00, '2021-06-30', 4, 7), -- 31
('George', 'Mitchell', '1986-08-19', 'Nurse', 64500.00, '2022-08-19', 5, 8),
('Laura', 'Perez', '1984-03-11', 'Nurse', 67000.00, '2023-03-11', 6, 9),
('Frank', 'Roberts', '1993-05-18', 'Nurse', 65500.00, '2023-05-18', 7, 10),
('Anthony', 'Cook', '1980-06-07', 'Nurse', 81500.00, '2023-06-07', 8, 11),
('Daniel', 'Collins', '1973-02-02', 'Nurse', 88000.00, '2023-11-02', 8, 11), -- 36
('Michelle', 'Ward', '1974-03-10', 'Nurse', 83000.00, '2024-01-22', 9, 12),
('Thomas', 'Bailey', '1969-11-14', 'Nurse', 89000.00, '2024-03-30', 9, 12),
('Sheldon', 'Cooper', '1972-07-27', 'Nurse', 81000.00, '2024-07-05', 10, 13),
('Missy', 'Sippy', '1999-07-27', 'Nurse', 81000.00, '2024-07-27', 11, 14),
('Matthew', 'Sanchez', '2003-05-23', 'Nurse', 85000.00, '2024-08-23', 12, 15); -- 41

UPDATE Department SET manager_id = 4 WHERE name = 'Emergency';
UPDATE Department SET manager_id = 5 WHERE name = 'Anaesthetics';
UPDATE Department SET manager_id = 6 WHERE name = 'Surgery';
UPDATE Department SET manager_id = 7 WHERE name = 'Laboratory';
UPDATE Department SET manager_id = 8 WHERE name = 'Pediatrics';
UPDATE Department SET manager_id = 9 WHERE name = 'Neurology';
UPDATE Department SET manager_id = 10 WHERE name = 'Ophthalmology';
UPDATE Department SET manager_id = 11 WHERE name = 'Otorhinolaryngology';
UPDATE Department SET manager_id = 12 WHERE name = 'Cardiology';
UPDATE Department SET manager_id = 13 WHERE name = 'Gastroenterology';
UPDATE Department SET manager_id = 14 WHERE name = 'Gynaecology';
UPDATE Department SET manager_id = 15 WHERE name = 'Orthopedics';

INSERT INTO Qualification (name, provider, issue_date, staff_id) VALUES
-- Holders with two certifications
('MBA in Healthcare Management', 'Harvard Business School', '2005-05-20', 1),
('MSc in Clinical Psychology', 'University of Edinburgh', '2010-06-25', 1),
('Certified Medical Administrative Assistant', 'Johns Hopkins University', '2010-11-15', 2),
('Certificate in Health Economics', 'London School of Economics', '2015-01-18', 2),
('PhD in Medicine', 'Stanford University', '2008-03-12', 3),
('Certificate in Healthcare Strategy', 'University of Oxford', '2012-11-22', 3),
-- Holders with one certification each
('Certified Trauma Practitioner', 'American Nurses Association', '2013-08-18', 4),
('PhD in Neuroscience', 'NHA', '2012-09-10', 5),
('Project Management Professional (PMP)', 'PMI', '2011-07-22', 6),
('Certified Healthcare Financial Professional', 'HFMA', '2009-12-01', 7),
('MSc in Healthcare Administration', 'University of California', '2010-05-14', 8),
('BSc in Business Administration', 'New York University', '2006-09-25', 9),
('Certificate in Medical Coding', 'AHIMA', '2014-06-30', 10),
('MSc in Health Information Management', 'University of Pittsburgh', '2011-03-09', 11),
('PhD in Medical Science', 'ASQ', '2013-10-05', 12),
('Certified Professional in Healthcare Quality (CPHQ)', 'NAHQ', '2009-02-27', 13),
('Certificate in Healthcare Operations', 'Cornell University', '2012-12-15', 14),
('MSc in Public Health', 'University of Michigan', '2013-04-11', 15),
('Certificate in Healthcare Risk Management', 'ASHRM', '2014-07-19', 16),
('Certified Revenue Cycle Representative', 'HFMA', '2010-08-22', 17),
('BSc in Healthcare Informatics', 'University of Washington', '2011-01-16', 18),
('Certified Hospital Administrator', 'ACHE', '2008-06-09', 19),
('Master of Health Administration (MHA)', 'University of North Carolina', '2007-09-24', 20),
('Certified Medical Office Manager', 'PAHCOM', '2012-11-04', 21),
('Graduate Diploma in Hospital Management', 'London School of Economics', '2006-03-18', 22),
('Certified Healthcare Compliance Professional', 'HCCA', '2011-02-28', 23),
('PhD in Healthcare Economics', 'University of Chicago', '2005-11-19', 24),
('MSc in Health Services Research', 'University of Toronto', '2013-08-20', 25),
('Certificate in Patient Safety', 'Institute for Healthcare Improvement', '2014-05-12', 26),
('MSc in Organizational Leadership', 'Northeastern University', '2010-09-13', 27),
('Graduate Diploma in Medical Education', 'University of Dundee', '2008-10-31', 28),
('Certified Health Practitioner', 'AHIMA', '2012-07-06', 29),
('Diploma in Nursing', 'Imperial College London', '2013-02-18', 30),
('MSc in Health Policy', 'Columbia University', '2009-12-03', 31),
('Certificate in Healthcare Analytics', 'MIT', '2014-03-27', 32),
('PhD in Health Systems Management', 'Virginia Tech', '2007-11-11', 33),
('Certified Coding Specialist', 'AHIMA', '2013-06-05', 34),
('MBA in Strategic Healthcare Leadership', 'Duke University', '2006-04-20', 35),
('MSc in Health Economics', 'University of Melbourne', '2011-08-14', 36),
('PhD in Biomedical Informatics', 'Vanderbilt University', '2009-01-30', 37),
('Certificate in Healthcare Innovation', 'Stanford University', '2012-09-10', 38),
('MSc in Clinical Leadership', 'George Washington University', '2013-12-22', 39),
('Certified Healthcare Data Analyst', 'AAPC', '2023-02-14', 40),
('MSc in Health Informatics', 'University of Illinois', '2020-06-30', 41);

INSERT INTO Patient_Allergy (patient_id, allergy_id, severity) VALUES
(1, 1, 'MILD'),
(1, 5, 'CRITICAL'),
(2, 6, 'MILD'),
(2, 8, 'MILD'),
(3, 10, 'MILD'),
(3, 11, 'CRITICAL'),
(4, 7, 'CRITICAL'),
(4, 8, 'MILD'),
(4, 13, 'MILD'),
(4, 15, 'MILD'),
(5, 14, 'CRITICAL'),
(6, 18, 'MILD'),
(7, 20, 'CRITICAL'),
(8, 22, 'MILD'),
(9, 23, 'CRITICAL'),
(10, 25, 'MILD'),
(11, 27, 'MILD'),
(12, 30, 'CRITICAL'),
(13, 32, 'MILD'),
(14, 34, 'CRITICAL'),
(15, 36, 'MILD'),
(16, 38, 'MILD'),
(17, 40, 'CRITICAL'),
(18, 33, 'MILD'),
(19, 35, 'CRITICAL'),
(20, 37, 'MILD'),
(18, 42, 'MILD'),
(19, 45, 'CRITICAL'),
(20, 48, 'MILD'); 

INSERT INTO EmploymentHistory (previous_department_id, current_department_id, previous_salary, current_salary, previous_job_title, current_job_title, applied_date, staff_id) VALUES
(1, 1, 250000, 500000, 'Doctor', 'Administrative Personnel', '2017-08-03', 1),
(11, 1, 120000, 120000, 'Doctor', 'Doctor', '2019-09-02', 4),
(1, 1, 100000.00, 115000.00, 'Doctor', 'Doctor', '2021-08-04', 6),
(12, 12, 56000, 67000, 'Nurse', 'Doctor', '2023-03-08', 27),
(4, 4, 44000.00, 62000.00, 'Nurse', 'Nurse', '2022-02-14', 31),
(2, 4, 84500, 84500, 'Doctor', 'Doctor', '2024-08-05', 19),
(11, 11, 75000.00, 81000.00, 'Nurse', 'Nurse', '2024-08-07', 40),
(6, 9, 89000, 89000, 'Nurse', 'Nurse', '2024-08-08', 38),
(10, 10, 42000, 65000, 'Nurse', 'Doctor', '2024-08-09', 25),
(1, 1, 71000.00, 88000.00, 'Doctor', 'Doctor', '2024-08-10', 16);


INSERT INTO TreatmentHistory(type, disease, visited_date, patient_id) VALUES
('OUTPATIENT', 'Migrane, Hypertension, Dizziness', '2020-01-15', 1),
('INPATIENT', 'Heartattack, Nausea', '2020-01-15', 2),
('OUTPATIENT', 'HP Virus, Digestive Disorder', '2020-01-16', 3);

INSERT INTO Billing (amount, billing_date, due_date, payment_status, patientId, treatment_history_id) VALUES
(720, '2020-01-15', '2020-02-13', 'PAID', 1, 1),
(4000, '2020-01-15', '2020-02-13', 'PAID', 2, 2),
(480, '2020-01-16', '2020-02-14', 'PAID', 3, 3);

-- Checkups: 100/Prescription: Med*Quant/Operations: 3000/Ultrasound: 400/Image scans+Lab: 80
INSERT INTO Procedure (category, price, staff_id, patient_id, medicineId, medicine_quantity, performed_date, treatment_history_id) VALUES
('Checkups', 100.00, 9, 1, NULL, NULL, '2020-01-15 10:29:58', 1),
('Prescription', 60.00, 21, 1, 16, 3, '2020-01-15 10:45:32', 1),
('Ultrasound', 400.00, 12, 1, NULL, NULL, '2020-01-15 11:11:11', 1),
('Lab', 80.00, 19, 1, NULL, NULL, '2020-01-15 13:00:25', 1),
('Image scans', 80.00, 7, 1, NULL, NULL, '2020-01-15 13:37:56', 1),
('Checkups', 100.00, 28, 2, NULL, NULL, '2020-01-15 18:05:04', 2),
('Operations', 3100.00, 6, 2, 4, 1, '2020-01-15 18:20:00', 2),
('Ultrasound', 400.00, 13, 3, NULL, NULL, '2020-01-16 16:11:11', 3),
('Lab', 80.00, 7, 3, NULL, NULL, '2020-01-16 17:02:19', 3);

INSERT INTO Admission(status, admitted_date, discharged_date, room_type, price, treatment_history_id) VALUES
('DISCHARGED', '2020-01-15', '2020-01-19', 'PREMIUM', 800.00, 2);

INSERT INTO Appointment(start_time, end_time, purpose, status, patient_id, staff_id) VALUES
('2024-08-27 15:00:00', '2024-08-27 17:00:00', 'Appendix Removal Consultation', 'COMPLETED', 20, 10),
('2024-08-29 10:00:00', '2024-08-28 12:00:00', 'Checkup', 'CANCELLED', 19, 15),
('2024-08-31 14:15:00', '2024-08-29 16:15:00', 'Consultation', 'BOOKED', 18, 21);
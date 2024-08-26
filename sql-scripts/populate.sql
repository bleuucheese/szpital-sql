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


INSERT INTO Shift (day_of_week, start_hour, end_hour) VALUES
('MON', '06:00:00', '14:00:00'),
('MON', '14:00:00', '22:00:00'),
('MON', '22:00:00', '06:00:00'),
('TUE', '06:00:00', '14:00:00'),
('TUE', '14:00:00', '22:00:00'),
('TUE', '22:00:00', '06:00:00'),
('WED', '06:00:00', '14:00:00'),
('WED', '14:00:00', '22:00:00'),
('WED', '22:00:00', '06:00:00'),
('THU', '06:00:00', '14:00:00'),
('THU', '14:00:00', '22:00:00'),
('THU', '22:00:00', '06:00:00'),
('FRI', '06:00:00', '14:00:00'),
('FRI', '14:00:00', '22:00:00'),
('FRI', '22:00:00', '06:00:00'),
('SAT', '06:00:00', '14:00:00'),
('SAT', '14:00:00', '22:00:00'),
('SAT', '22:00:00', '06:00:00'),
('SUN', '06:00:00', '14:00:00'),
('SUN', '14:00:00', '22:00:00'),
('SUN', '22:00:00', '06:00:00');


INSERT INTO Medicine (name, effect, side_effect, quantity, price) VALUES
-- Emergency
('Epinephrine', 'Treatment of severe allergic reactions, cardiac arrest', 'Palpitations, anxiety', 50, 25.00),
('Atropine', 'Treatment of bradycardia, poisoning', 'Dry mouth, blurred vision', 75, 15.00),
('Naloxone', 'Reverses opioid overdose', 'Rapid heart rate, sweating', 60, 18.00),
-- Anaesthetics
('Propofol', 'Induces and maintains anesthesia', 'Low blood pressure, respiratory depression', 40, 50.00),
('Lidocaine', 'Local anesthetic', 'Dizziness, numbness', 80, 12.00),
('Fentanyl', 'Pain relief, anesthetic adjunct', 'Nausea, respiratory depression', 45, 75.00),
-- Surgery
('Cefazolin', 'Prevents infection during surgery', 'Allergic reactions, diarrhea', 90, 20.00),
('Heparin', 'Prevents blood clots during surgery', 'Bleeding, thrombocytopenia', 70, 30.00),
('Ketamine', 'Induction of anesthesia, pain relief', 'Hallucinations, hypertension', 30, 40.00),
-- Laboratory
('Glucose', 'Blood sugar regulation', 'Hyperglycemia in high doses', 100, 5.00),
('Saline', 'Fluid replacement', 'Overhydration', 200, 2.50),
('Potassium chloride', 'Electrolyte replenishment', 'Hyperkalemia', 85, 10.00),
-- Pediatrics
('Amoxicillin', 'Treats bacterial infections', 'Rash, diarrhea', 120, 8.00),
('Ibuprofen (Pediatric)', 'Pain relief, fever reducer', 'Stomach upset, kidney damage', 110, 6.00),
('Diphenhydramine', 'Allergy relief, sleep aid', 'Drowsiness, dry mouth', 130, 7.50),
-- Neurology
('Diazepam', 'Anxiety relief, muscle relaxation', 'Drowsiness, dizziness', 95, 20.00),
('Carbamazepine', 'Treats seizures, neuropathic pain', 'Dizziness, nausea', 75, 22.00),
('Levetiracetam', 'Seizure prevention', 'Fatigue, mood changes', 65, 25.00),
-- Ophthalmology
('Timolol', 'Reduces intraocular pressure', 'Burning sensation, blurred vision', 50, 15.00),
('Atropine (Ophthalmic)', 'Dilates pupils', 'Dry mouth, blurred vision', 70, 12.00),
('Prednisolone acetate', 'Reduces eye inflammation', 'Increased eye pressure', 45, 18.00),
-- Otorhinolaryngology
('Fluticasone nasal spray', 'Reduces nasal inflammation', 'Nosebleeds, throat irritation', 100, 10.00),
('Cetirizine', 'Allergy relief', 'Drowsiness, dry mouth', 90, 8.00),
('Amoxicillin-clavulanate', 'Treats ENT infections', 'Diarrhea, rash', 110, 14.00),
-- Cardiology
('Atenolol', 'Reduces blood pressure, treats angina', 'Bradycardia, fatigue', 80, 20.00),
('Lisinopril', 'Lowers blood pressure, treats heart failure', 'Cough, hyperkalemia', 70, 18.00),
('Clopidogrel', 'Prevents blood clots', 'Bleeding, rash', 65, 25.00),
-- Gastroenterology
('Omeprazole', 'Reduces stomach acid', 'Headache, diarrhea', 150, 12.00),
('Metoclopramide', 'Treats nausea, GERD', 'Drowsiness, restlessness', 100, 10.00),
('Lactulose', 'Treats constipation, hepatic encephalopathy', 'Bloating, diarrhea', 90, 15.00),
-- Gynaecology
('Estradiol', 'Hormone replacement therapy', 'Breast tenderness, nausea', 85, 25.00),
('Medroxyprogesterone', 'Prevents endometrial hyperplasia', 'Weight gain, mood changes', 75, 20.00),
('Clomiphene', 'Treats infertility', 'Hot flashes, ovarian enlargement', 60, 30.00),
-- Orthopedics
('Methocarbamol', 'Muscle relaxation', 'Drowsiness, dizziness', 100, 18.00),
('Alendronate', 'Treats osteoporosis', 'Esophageal irritation, muscle pain', 70, 25.00),
('Naproxen', 'Pain relief, anti-inflammatory', 'Stomach ulcers, kidney damage', 120, 12.00),
-- Additional Medicines
('Aspirin', 'Pain relief, anti-inflammatory, fever reducer', 'Gastric irritation, bleeding', 100, 5.00),
('Paracetamol', 'Pain relief, fever reducer', 'Liver damage in high doses', 200, 3.50),
('Ibuprofen', 'Pain relief, anti-inflammatory, fever reducer', 'Stomach ulcers, kidney damage', 150, 4.20),
('Hydrocortisone', 'Reduces inflammation', 'Weight gain, mood changes', 50, 10.00),
('Warfarin', 'Prevents blood clots', 'Bleeding, bruising', 80, 22.00),
('Clindamycin', 'Treats bacterial infections', 'Diarrhea, nausea', 90, 15.00),
('Dexamethasone', 'Reduces inflammation', 'Increased appetite, weight gain', 60, 18.00),
('Gentamicin', 'Treats serious bacterial infections', 'Kidney damage, hearing loss', 50, 30.00),
('Tetracycline', 'Treats bacterial infections', 'Photosensitivity, nausea', 100, 12.00),
('Morphine', 'Pain relief', 'Respiratory depression, nausea', 30, 35.00),
('Furosemide', 'Diuretic, reduces fluid buildup', 'Dehydration, electrolyte imbalance', 120, 8.00),
('Verapamil', 'Treats high blood pressure, angina', 'Constipation, dizziness', 75, 22.00),
('Losartan', 'Lowers blood pressure', 'Dizziness, increased potassium levels', 80, 20.00),
('Spironolactone', 'Diuretic, treats heart failure', 'Hyperkalemia, breast tenderness', 70, 25.00),
('Digoxin', 'Treats heart failure, arrhythmias', 'Nausea, dizziness', 60, 28.00),
('Nitroglycerin', 'Treats angina', 'Headache, dizziness', 50, 18.00),
('Ceftriaxone', 'Treats bacterial infections', 'Diarrhea, rash', 80, 20.00),
('Hydrochlorothiazide', 'Diuretic, treats high blood pressure', 'Low potassium, dizziness', 90, 10.00),
('Simvastatin', 'Lowers cholesterol', 'Muscle pain, liver damage', 85, 15.00),
('Metformin', 'Treats type 2 diabetes', 'Nausea, diarrhea', 120, 12.00),
('Insulin', 'Lowers blood sugar levels', 'Hypoglycemia, weight gain', 60, 35.00),
('Salbutamol', 'Bronchodilator, treats asthma', 'Tremor, palpitations', 100, 10.00),
('Montelukast', 'Treats asthma, allergies', 'Headache, abdominal pain', 90, 15.00),
('Ranitidine', 'Reduces stomach acid', 'Headache, dizziness', 75, 10.00),
('Azithromycin', 'Treats bacterial infections', 'Diarrhea, nausea', 110, 20.00),
('Clotrimazole', 'Treats fungal infections', 'Skin irritation, rash', 100, 8.00);


INSERT INTO Insurance (code, end_date) VALUES
('XK92JF7B2A', '2025-12-31'),
('DL84YH3K9P', '2025-11-30'),
('QA19ZR5T4M', '2026-01-15'),
('WT65XC8V1L', '2025-09-20'),
('PM93ND2G7O', '2026-02-10'),
('FV27TH9Q6B', '2025-08-05'),
('YN38UI4M5A', '2026-03-25'),
('MK65RX2F9C', '2025-07-14'),
('BC21VJ7P8K', '2026-04-18'),
('TR89ZP3M4D', '2025-10-22'),
('NJ47GL2Q5E', '2026-05-30'),
('QW93FX6T1Y', '2025-06-17'),
('LH83PT9R4U', '2026-08-01'),
('EU62DN5V7B', '2025-03-12'),
('OI74SK1G9F', '2026-09-27'),
('PB67ZC3R2M', '2025-04-15'),
('CK45XJ8Q1A', '2026-10-11'),
('HY92DF3P7N', '2025-01-30'),
('ZM74XR6T5L', '2026-11-08'),
('VW28KM9Q2B', '2025-02-23');


INSERT INTO Address (street, ward, district, city) VALUES
('22 Le Loi', 'Ward 1', 'District 1', 'Ho Chi Minh City'),
('36 Quoc Huong', 'Thao Dien Ward', 'District 2', 'Ho Chi Minh City'),
('1 Vo Van Tan', 'Vo Thi Sau Ward', 'District 3', 'Ho Chi Minh City'),
('101 Cong Hoa', 'Ward 8', 'District 4', 'Ho Chi Minh City'),
('235 Nguyen Van Cu', 'Ward 4', 'District 5', 'Ho Chi Minh City'),
('303 Hai Ba Trung', 'Ward 6', 'District 6', 'Ho Chi Minh City'),
('701 Nguyen Van Linh', 'Tan Phong Ward', 'District 7', 'Ho Chi Minh City'),
('505 Nguyen Thi Minh Khai', 'Ward 8', 'District 8', 'Ho Chi Minh City'),
('12 Le Duan', 'Ward 9', 'District 9', 'Ho Chi Minh City'),
('69 Ba Hat', 'Ward 10', 'District 10', 'Ho Chi Minh City'),
('520 Vo Thi Sau', 'Ward 11', 'District 11', 'Ho Chi Minh City'),
('99 Cong Quynh', 'Ward 12', 'District 12', 'Ho Chi Minh City'),
('327 No Trang Long', 'Ward 13', 'Binh Thanh District', 'Ho Chi Minh City'),
('83 Nguyen Van Troi', 'Ward 14', 'Go Vap District', 'Ho Chi Minh City'),
('28 Truong Chinh', 'Ward 1', 'Tan Binh District', 'Ho Chi Minh City'),
('132 Cong Hoa', 'Ward 16', 'Tan Phu District', 'Ho Chi Minh City'),
('33 Phan Van Tri', 'Ward 17', 'Binh Tan District', 'Ho Chi Minh City'),
('402 Phan Xich Long', 'Ward 2', 'Phu Nhuan District', 'Ho Chi Minh City'),
('1616 Hiep Binh', 'Ward 4', 'Thu Duc District', 'Ho Chi Minh City'),
('49 Phan Van Bay', 'Ward 2', 'Nha Be District', 'Ho Chi Minh City');


INSERT INTO Patient (cid, fname, lname, dob, gender, blood_type, insurance, address) VALUES
('1A2B3C4D5E6F7G8', 'Kevin', 'Darroyo', '1993-04-12', 'Male', 'O+', 'XK92JF7B2A', 1),
('2B3C4D5E6F7G8H9', 'Elise', 'Jasinki', '2014-06-22', 'Female', 'A-', 'DL84YH3K9P', 2),
('3C4D5E6F7G8H9I0', 'Jakub', 'Nowak', '2009-11-13', 'Male', 'B+', 'QA19ZR5T4M', 3),
('4D5E6F7G8H9I0J1', 'Lochlan', 'Noble', '1981-02-08', 'Female', 'AB+', 'WT65XC8V1L', 4),
('5E6F7G8H9I0J1K2', 'Kacper', 'Blaszczyk', '1934-09-19', 'Male', 'O-', 'PM93ND2G7O', 5),
('6F7G8H9I0J1K2L3', 'Karin', 'Oktawian', '1987-01-15', 'Female', 'A+', 'FV27TH9Q6B', 6),
('7G8H9I0J1K2L3M4', 'Olaf', 'Grodzki', '1995-03-23', 'Male', 'B-', 'YN38UI4M5A', 7),
('8H9I0J1K2L3M4N5', 'Julia', 'Wajda', '1975-07-30', 'Female', 'AB-', 'MK65RX2F9C', 8),
('9I0J1K2L3M4N5O6', 'Antek', 'Rachwal', '1969-05-25', 'Male', 'O+', 'BC21VJ7P8K', 9),
('0J1K2L3M4N5O6P7', 'Dominika', 'Mycio', '1982-10-09', 'Female', 'A-', 'TR89ZP3M4D', 10),
('1K2L3M4N5O6P7Q8', 'Lukasz', 'Zuchniewicz', '2003-08-17', 'Male', 'B+', 'NJ47GL2Q5E', 11),
('2L3M4N5O6P7Q8R9', 'Amine', 'Harizi', '2001-02-11', 'Female', 'AB+', 'QW93FX6T1Y', 12),
('3M4N5O6P7Q8R9S0', 'Milosz', 'Rogala', '1981-05-21', 'Male', 'O-', 'LH83PT9R4U', 13),
('4N5O6P7Q8R9S0T1', 'Niko', 'Rakus', '2000-09-07', 'Male', 'A+', 'EU62DN5V7B', 14),
('5O6P7Q8R9S0T1U2', 'Attila', 'Szlancsik', '1992-09-13', 'Male', 'B-', 'OI74SK1G9F', 15),
('6P7Q8R9S0T1U2V3', 'Pawel', 'Biernat', '1969-12-11', 'Female', 'AB-', 'PB67ZC3R2M', 16),
('7Q8R9S0T1U2V3W4', 'Magdalena', 'Bulgakov', '1955-02-05', 'Female', 'O+', 'CK45XJ8Q1A', 17),
('8R9S0T1U2V3W4X5', 'Andrius', 'Baltutis', '1994-01-05', 'Male', 'A-', 'HY92DF3P7N', 18),
('9S0T1U2V3W4X5Y6', 'Ivan', 'Filipenko', '1995-04-17', 'Male', 'B+', 'ZM74XR6T5L', 19),
('0T1U2V3W4X5Y6Z7', 'Wiktoria', 'Sekrit', '1972-06-01', 'Female', 'AB+', 'VW28KM9Q2B', 20);

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


INSERT INTO Staff (fname, lname, dob, job_type, salary, employed_date, department, director) VALUES
-- Administrative Personnel
('Meredith', 'Grey', '1955-07-22', 'Administrative Personnel', 500000.00, '2017-01-01', NULL, NULL), -- president
('Shaun', 'Murphy', '1962-11-05', 'Administrative Personnel', 450000.00, '2017-03-15', NULL, 1), -- vice president
('Derek', 'Shepherd', '1960-02-15', 'Administrative Personnel', 380000.00, '2017-06-23', NULL, 1), -- director
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

INSERT INTO Qualification (name, provider, issued_date, holder) VALUES
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


UPDATE Department SET manager = 4 WHERE name = 'Emergency';
UPDATE Department SET manager = 5 WHERE name = 'Anaesthetics';
UPDATE Department SET manager = 6 WHERE name = 'Surgery';
UPDATE Department SET manager = 7 WHERE name = 'Laboratory';
UPDATE Department SET manager = 8 WHERE name = 'Pediatrics';
UPDATE Department SET manager = 9 WHERE name = 'Neurology';
UPDATE Department SET manager = 10 WHERE name = 'Ophthalmology';
UPDATE Department SET manager = 11 WHERE name = 'Otorhinolaryngology';
UPDATE Department SET manager = 12 WHERE name = 'Cardiology';
UPDATE Department SET manager = 13 WHERE name = 'Gastroenterology';
UPDATE Department SET manager = 14 WHERE name = 'Gynaecology';
UPDATE Department SET manager = 15 WHERE name = 'Orthopedics';


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


INSERT INTO Staff_Shift (staff_id, shift_id) VALUES
-- Staff 1
(1, 1), (1, 4), (1, 7), (1, 10), (1, 12), (1, 15), (1, 17), (1, 21),
-- Staff 2
(2, 2), (2, 3), (2, 6), (2, 8), (2, 11), (2, 13), (2, 16), (2, 19),
-- Staff 3
(3, 4), (3, 5), (3, 7), (3, 9), (3, 12), (3, 14), (3, 17), (3, 20),
-- Staff 4
(4, 1), (4, 3), (4, 8), (4, 10), (4, 11), (4, 13), (4, 16), (4, 18),
-- Staff 5
(5, 2), (5, 6), (5, 9), (5, 12), (5, 14), (5, 15), (5, 19), (5, 20),
-- Staff 6
(6, 1), (6, 2), (6, 3), (6, 6), (6, 7), (6, 8), (6, 11), (6, 13), (6, 16),
-- Staff 7
(7, 2), (7, 4), (7, 5), (7, 7), (7, 8), (7, 10), (7, 12), (7, 14), (7, 18),
-- Staff 8
(8, 3), (8, 5), (8, 6), (8, 8), (8, 9), (8, 11), (8, 13), (8, 16), (8, 19),
-- Staff 9
(9, 4), (9, 6), (9, 7), (9, 9), (9, 10), (9, 12), (9, 14), (9, 15), (9, 20),
-- Staff 10
(10, 5), (10, 7), (10, 8), (10, 10), (10, 11), (10, 13), (10, 15), (10, 17), (10, 19),
-- Staff 11
(11, 1), (11, 3), (11, 4), (11, 5), (11, 6), (11, 8), (11, 9), (11, 11), (11, 14), (11, 16),
-- Staff 12
(12, 2), (12, 4), (12, 6), (12, 7), (12, 8), (12, 10), (12, 12), (12, 13), (12, 15), (12, 19),
-- Staff 13
(13, 3), (13, 5), (13, 6), (13, 8), (13, 10), (13, 11), (13, 12), (13, 14), (13, 16), (13, 18),
-- Staff 14
(14, 1), (14, 2), (14, 4), (14, 7), (14, 8), (14, 9), (14, 11), (14, 13), (14, 15), (14, 17),
-- Staff 15
(15, 2), (15, 4), (15, 6), (15, 7), (15, 8), (15, 10), (15, 12), (15, 14), (15, 16), (15, 19),
-- Staff 16
(16, 1), (16, 3), (16, 6), (16, 8), (16, 12),
-- Staff 17
(17, 2), (17, 5), (17, 7), (17, 10), (17, 14),
-- Staff 18
(18, 3), (18, 6), (18, 9), (18, 11), (18, 16),
-- Staff 19
(19, 4), (19, 7), (19, 10), (19, 12), (19, 18),
-- Staff 20
(20, 2), (20, 4), (20, 8), (20, 11), (20, 15),
-- Staff 21
(21, 5), (21, 9), (21, 13), (21, 17),
-- Staff 22
(22, 6), (22, 10), (22, 14), (22, 19),
-- Staff 23
(23, 7), (23, 12), (23, 16), (23, 18),
-- Staff 24
(24, 8), (24, 11), (24, 15), (24, 20),
-- Staff 25
(25, 2), (25, 6), (25, 12), (25, 14),
-- Staff 26
(26, 1), (26, 5), (26, 10),
-- Staff 27
(27, 2), (27, 6), (27, 14),
-- Staff 28
(28, 4), (28, 9), (28, 16),
-- Staff 29
(29, 3), (29, 8), (29, 13),
-- Staff 30
(30, 7), (30, 12), (30, 18),
-- Staff 31
(31, 2), (31, 5), (31, 7), (31, 8), (31, 10), (31, 14), (31, 18),
-- Staff 32
(32, 1), (32, 4), (32, 6), (32, 9), (32, 11), (32, 13), (32, 16),
-- Staff 33
(33, 3), (33, 6), (33, 8), (33, 11), (33, 14), (33, 17), (33, 19),
-- Staff 34
(34, 2), (34, 7), (34, 9), (34, 10), (34, 13), (34, 15), (34, 20),
-- Staff 35
(35, 4), (35, 5), (35, 8), (35, 12), (35, 14), (35, 16), (35, 19),
-- Staff 36
(36, 3), (36, 5), (36, 7), (36, 9), (36, 12), (36, 15),
-- Staff 37
(37, 2), (37, 4), (37, 8), (37, 10), (37, 13), (37, 17),
-- Staff 38
(38, 1), (38, 6), (38, 8), (38, 11), (38, 14), (38, 20),
-- Staff 39
(39, 4), (39, 7), (39, 9), (39, 12), (39, 15), (39, 18),
-- Staff 40
(40, 3), (40, 5), (40, 10), (40, 13), (40, 16), (40, 19),
-- Staff 41
(41, 2), (41, 6), (41, 8), (41, 11), (41, 14), (41, 17);


INSERT INTO EmploymentHistory (change_type, prev_dept, new_dept, prev_salary, new_salary, prev_title, new_title, applied_date, staff) VALUES
('Title Change', NULL, NULL, NULL, NULL, 'Doctor', 'Administrative Personnel', '2017-08-03', 1),
('Department Transfer', 11, 1, NULL, NULL, NULL, NULL, '2019-09-02', 4),
('Salary Change', NULL, NULL, 100000.00, 115000.00, NULL, NULL, '2021-08-04', 6),
('Title Change', NULL, NULL, NULL, NULL, 'Nurse', 'Doctor', '2023-03-08', 27),
('Salary Change', NULL, NULL, 44000.00, 62000.00, NULL, NULL, '2022-02-14', 31),
('Department Transfer', 2, 4, NULL, NULL, NULL, NULL, '2024-08-05', 19),
('Salary Change', NULL, NULL, 75000.00, 81000.00, NULL, NULL, '2024-08-07', 40),
('Department Transfer', 6, 12, NULL, NULL, NULL, NULL, '2024-08-08', 38),
('Title Change', NULL, NULL, NULL, NULL, 'Nurse', 'Doctor', '2024-08-09', 25),
('Salary Change', NULL, NULL, 71000.00, 88000.00, NULL, NULL, '2024-08-10', 16);

INSERT INTO TreatmentHistory(type, diseases, patient) VALUES
('INPATIENT', 'Migrane, Hypertension', 1),
('OUTPATIENT', 'Heartattack', 2);

-- * Checkups/Prescription/Operation/Ultrasound/Image scans/Lab
INSERT INTO Procedures (category, price, performer, patient, medicine, med_quantity, history) VALUES
('Checkups', 69, 5, 1, NULL, NULL),
('Prescription', 60, 5, 1, 2, 4),
('Ultrasound', 300, 5, 1, NULL, NULL),
('Lab', 99, 5, 1, NULL, NULL),
('Image scans', 112, 5, 1, NULL, NULL),
('Operations', 3000, 12, 2, NULL, NULL);
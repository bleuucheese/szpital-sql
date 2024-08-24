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
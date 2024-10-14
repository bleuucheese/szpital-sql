type Address = {
  id: number;
  address_line: string;
  ward: string;
  district: string;
  city: string;
  patient_id: number;
};

type AllergyPatient = {
  id: number;
  allergen: string;
  symptoms: string;
  category: string;
  severity: string;
};
type Appointment = {
  id: number;
  purpose: string;
  status: string;
  start_time: Date;
  end_time: Date;
  patient: Patient
}
type Department = {
  id: number;
  name: string;
}
type Procedure = {
  id: number;
  price: number;
  category: string;
  medicine_quantity: number | null;
  performed_date: Date;
  staff_id: number;
  treatment_history_id: number;
  patient: Patient;
  medicine_id: number | null;
  medicine?: Medicine | null; // Optional, will be included if medicine_id is present
  staff: Staff | null; // Optional, will be included if staff_id is present
};

type Medicine = {
  id: number;
  name: string;
  price: number;
  effect: string;
  side_effect: string;
};

type TreatmentHistory = {
  id: number;
  type: string;
  disease: string;
  visited_date: Date;
  patient_id: number;
  procedures: Procedure[];
  billing: Billing;
};
type Treatment = {
  id: number;
  type: string;
  disease: string;
  visited_date: Date;
  patient: {
    id: number, first_name: string, last_name: string
  }
}
type Billing = {
  id: number;
  amount: number;
  billing_date: Date;
  due_date: Date;
  payment_status: string;
  treatment_history_id: number;
  patient_id: number;
};
type Staff = {
  id: number;
  first_name: string;
  last_name: string;
  dob: Date;
  job_type: string;
  salary: number;
  hired_date: Date;
  manager_id: number;
  department_id: number;
  department_name: string;
  department: Department
  procedures: Procedure[];
  appointments: Appointment[];
  shifts: Shift[];
}
type Shift = {
  id: number;
  day_of_week: string;
  start_hour: string;
  end_hour: string;
  day: string;
  staff_id: number;
}
type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: string;
  blood_type: string;
  cid: string;
  address: Address | null;
  allergies: AllergyPatient[];
  treatmentHistories: TreatmentHistory[];

};

type Allergy = {
  id: number,
  allergen: string,
  symptoms: string,
  category: string
}

type Staff = {
  id: number,
  first_name: string,
  last_name: string,
  dob: Date,
  job_type: string,
  salary: number,
  hired_date: Date,
  manager_id: number,
  department_id: number
}

type AppointmentWithAll = {
  id: number;
  purpose: string;
  status: string;
  start_time: string;  // You could also use Date type if you handle Date objects
  end_time: string;    // Same as above, string is used for simplicity
  staff: {
    id: number;
    first_name: string;
    last_name: string;
  };
  patient: {
    id: number;
    first_name: string;
    last_name: string;
  };
}

type Certificate = {
  _id: string,
  staff_id: number,
  certificate_type: string,
  certificate_url: string,
  issue_date: Date,
  expiry_date: Date,
  __v: 0
}
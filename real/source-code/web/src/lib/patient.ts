import instance from "./axios";

// Function to get all patients
export const getAllPatients = async (page: number = 1, count: number = 5, query: string = '') => {
  const result = await instance.get("patient", {
    params: {
      page,
      count, query
    },
  });
  const patients: Patient[] = result.data.patients;
  const totalPages: number = result.data.totalPages;
  const currentPage = result.data.currentPage;
  return { patients, totalPages, currentPage };
};
export const getAllPatientsForAppointment = async () => {
  const result = await instance.get("patient/appointment/all-patients");
  const patients: Patient[] = result.data;
  return patients;
}
// Function to get a specific patient by ID
export const getPatientById = async (id: number) => {
  const result = await instance.get(`patient/${id}`);
  const patient: Patient = result.data;
  return patient;
};

// Function to delete a patient
export const deletePatientById = async (id: number) => {
  const res = await instance.delete(`patient/${id}`);
  return res
};

// Function to update a patient
export const updatePatientById = async (
  id: number,
  data: {
    first_name: string;
    last_name: string;
    dob: Date;
    gender: string;
    blood_type: string;
    cid: string;
  }
) => {
  const res = await instance.patch(`patient/${id}`, data);
  return res;
};

// Function to create a patient
export const createPatient = async (
  data: {
    first_name: string;
    last_name: string;
    dob: Date;
    gender: string;
    blood_type: string;
    cid: string;
  }
) => {
  const res = await instance.post(`patient`, data);
  return res
}
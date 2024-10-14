import instance from "./axios";

export const getAllStaff = async (page: number = 1, count: number = 5, query: string = '', department: string = '', sort: string = 'FA') => {
  const result = await instance.get("staff", {
    params: {
      page,
      count, query, department, sort
    },
  });
  const staffs: Staff[] = result.data.staffs;
  const totalPages: number = result.data.totalPages;
  const currentPage: number = result.data.currentPage;
  return {
    staffs,
    totalPages,
    currentPage
  };
}
export const getAllStaffs = async () => {
  const result = await instance.get("staff/appointment/all-staff");
  const staffs: Staff[] = result.data;
  return staffs;
}
export const createStaff = async (data: {
  first_name: string;
  last_name: string;
  dob: Date;
  job_type: string;
  salary: number;
  hired_date: Date;
  department_id: number;
}) => {
  const result = await instance.post("staff", data)
  return result
}

export const deleteStaffById = async (id: number) => {
  const res = await instance.delete(`staff/${id}`);
  return res
}

export const getStaffById = async (id: number) => {
  const result = await instance.get(`staff/${id}`);
  const staff = result.data
  return staff
}

export const updateStaffById = async (
  id: number,
  data: {
    first_name: string;
    last_name: string;
    dob: Date;
    job_type: string;
    salary: number;
    hired_date: Date;
    department_id: number;
  }
) => {
  const res = await instance.patch(`staff/${id}`, data);
  return res;
}

export const getStaffWithSchedule = async (page: number = 1, count: number = 5, query: string = '') => {
  const result = await instance.get("staff/shift/all", {
    params: {
      page,
      count, searchQuery: query
    },
  });
  // console.log(result.data);
  const staffs: Staff[] = result.data.paginatedStaff;
  const totalPages: number = result.data.totalPages;
  const currentPage: number = result.data.currentPage;
  return {
    staffs,
    totalPages,
    currentPage
  };
}
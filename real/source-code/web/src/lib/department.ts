import instance from "./axios";

export const getAllDepartments = async () => {
    const res = await instance.get('department')
    const departments: Department[] = res.data
    return departments
}
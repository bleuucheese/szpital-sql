import instance from "./axios";

// Function to update address
export const updateAddress = async (id: number, data: {
    city: string;
    district: string;
    ward: string;
    address_line: string;
}) => {
    const res = await instance.patch(`address/${id}`, data)
    return res
}

// Function to create address
export const createAddress = async (data: {
    city: string;
    district: string;
    ward: string;
    address_line: string;
    patient_id: number
}) => {
    const res = await instance.post(`address`, data)
    return res
}
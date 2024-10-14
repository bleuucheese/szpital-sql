import instance from "./axios";

export const createCerti = async (data: {
    staff_id: number;
    certificate_type: string
    certificate_url: string
    issue_date: Date
    expiry_date: Date
}) => {
    const res = await instance.post(`unstructure/certificate`, data)
    return res
}

export const getCerti = async (staff_id: number) => {
    const res = await instance.get(`unstructure/certificate/${staff_id}`)
    const certi: Certificate[] = res.data
    return certi
}
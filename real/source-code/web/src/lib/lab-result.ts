import instance from "./axios";

export const createLabResult = async (data: {
    procedure_id: number,
    lab_type: string,
    description: string,
    date: Date,
}) => {
    const res = await instance.post('unstructure/lab-result', data)
    return res
}

export const getAllLabResultsByProcedureId = async (procedure_id: number) => {
    const res = await instance.get(`unstructure/lab-result/${procedure_id}`)
    
    return res
}
import instance from "./axios";

export const createDoctorNote = async (data: {
    procedure_id: number,
    content: string,
    date: Date,
}) => {
    const res = await instance.post('unstructure/doctor-note', data)
    return res
}

export const getAllDoctorNotesByProcedureId = async (procedure_id: number) => {
    const res = await instance.get(`unstructure/doctor-note/${procedure_id}`)
    
    return res
}
import instance from "./axios";

export const createDiagnostic = async (data: {
    procedure_id: number;
    image_type: string;
    image_url: string;
    date_taken: Date;
}) => {
    const res = await instance.post("unstructure/diagnostic", data);
    return res
}

export const getAllDiagnosticsByProcedureId = async (procedure_id: number) => {
    const res = await instance.get(`unstructure/diagnostic/${procedure_id}`);
    return res
}
import instance from "./axios";

export const getAllTreatmentHistories = async () => {
    const res = await instance.get('treatment-history')
    const treatmentHistories:Treatment[] = res.data
    return treatmentHistories
}
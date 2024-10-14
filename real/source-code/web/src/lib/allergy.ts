import instance from "./axios";

export const getAllergies = async () => {
    const res = await instance.get('allergy')
    const allergies: Allergy[] = res.data
    return allergies
}

export const addAllergyToPatient = async (data: {
    patient_id: number;
    allergy_id: number;
    severity: string;
}) => {
    const res = await instance.post('patient-allergy', data)
    return res
}

export const deleteAllergyFromPatient = async (patient_id: number, allergy_id: number) => {
    const res = await instance.delete('patient-allergy', {
        params: {
            patient_id,
            allergy_id
        }
    })
    return res
}
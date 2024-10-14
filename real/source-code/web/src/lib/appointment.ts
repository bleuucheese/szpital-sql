import instance from "./axios";
export const checkAppointmentAvailability = async (data: {
    date: string,
    start_time: string,
    end_time: string,
    staff_id: number,
}) => {
    const [isShiftAvailable, isAppointmentAvailable] = await Promise.all([
        instance.post('appointment/check-shifts', data),
        instance.post('appointment/check-appointments', data)
    ])
    const shiftRes = isShiftAvailable.data
    const appointmentRes = isAppointmentAvailable.data
    console.log(shiftRes, appointmentRes)
    return shiftRes && appointmentRes
}
export const createAppointment = async (data: {
    purpose: string,
    status: string,
    start_time: string,
    end_time: string,
    date: string,
    patient_id: number,
    staff_id: number,
}) => {
    const res = await instance.post('appointment', data)
    return res
}

export const getAllAppointment = async (page: number = 1, count: number = 5, query: string = '') => {
    const res = await instance.get(`appointment`, {
        params: {
            page,
            count,
            query
        }
    })
    const appointments: AppointmentWithAll[] = res.data.appointments
    const totalPages: number = res.data.totalPages
    return { appointments, totalPages }
}

export const cancelAppointment = async (id: number) => {
    const res = await instance.patch(`appointment/${id}`)
    return res
}
import { PatientAllergy } from "src/entities/patient-allergy.entity";
import { TreatmentHistory } from "src/entities/treatment-history.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Billing } from "./billing.entity";
import { Appointment } from "./appointment.entity";

@Entity('patient')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    first_name: string;

    @Column({ type: 'varchar', length: 255 })
    last_name: string;

    @Column({ type: 'date' })
    dob: Date;

    @Column({ type: 'varchar', length: 255 })
    gender: string;

    @Column({ type: 'varchar', length: 255 })
    blood_type: string;

    @Column({ type: 'varchar', length: 255 })
    cid: string;

    @OneToMany(() => TreatmentHistory, (treatment_history) => treatment_history.patient)
    treatment_histories: TreatmentHistory[];

    @OneToMany(() => Billing, (billing) => billing.patient)
    billings: Billing[];

    @OneToMany(() => PatientAllergy, (patient_allergy) => patient_allergy.patient)
    patient_allergy: PatientAllergy[];

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment[];

    constructor(patient: Partial<Patient>) {
        Object.assign(this, patient);
    }
}

import { Patient } from "src/entities/patient.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Allergy } from "./allergy.entity";

@Entity('patient_allergy')
export class PatientAllergy {
    @ManyToOne(() => Patient, patient => patient.patient_allergy, { onDelete: "CASCADE" })
    @JoinColumn({ name: "patient_id" })
    patient: Patient;

    @PrimaryColumn({ name: 'patient_id' })
    patient_id: number;

    @ManyToOne(() => Allergy, allergy => allergy.patient_allergy, { onDelete: "CASCADE" })
    @JoinColumn({ name: "allergy_id" })
    allergy: Allergy;

    @PrimaryColumn({ name: 'allergy_id' })
    allergy_id: number;

    @Column()
    severity: string;

    constructor(patientAllergy: Partial<PatientAllergy>) {
        Object.assign(this, patientAllergy);
    }
}

import { Patient } from "src/entities/patient.entity";
import { Procedure } from "src/entities/procedure.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admission } from "./admission.entity";

@Entity('treatment_history')
export class TreatmentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    type: string;

    @Column({ type: 'varchar', length: 255 })
    disease: string;

    @Column({ type: 'date' })
    visited_date: Date;

    @OneToMany(() => Admission, (admission) => admission.treatment_history)
    admissions: Admission[];

    @ManyToOne(() => Patient, (patient) => patient.treatment_histories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @OneToMany(() => Procedure, (procedure) => procedure.treatment_history)
    procedures: Procedure[];

    constructor(treatment_history: Partial<TreatmentHistory>) {
        Object.assign(this, treatment_history);
    }
}

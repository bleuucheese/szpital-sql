import { Patient } from "src/entities/patient.entity";
import { TreatmentHistory } from "src/entities/treatment-history.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('billing')
export class Billing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'float' })
    amount: number;

    @Column({ type: 'date' })
    billing_date: Date;

    @Column({ type: 'date' })
    due_date: Date;

    @Column({ type: 'varchar', length: 255 })
    payment_status: string;

    @OneToOne(() => TreatmentHistory, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'treatment_history_id' })
    treatment_history: TreatmentHistory;

    @ManyToOne(() => Patient, (patient) => patient.billings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;
    constructor(billing: Partial<Billing>) {
        Object.assign(this, billing);
    }
}

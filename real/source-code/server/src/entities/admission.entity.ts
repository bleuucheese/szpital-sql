import { TreatmentHistory } from "src/entities/treatment-history.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('admission')
export class Admission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    status: string;

    @Column({ type: 'date' })
    admitted_date: Date;

    @Column({ type: 'date' })
    discharged_date: Date;

    @Column({ type: 'varchar', length: 255 })
    room_type: string;

    @Column({ type: 'float' })
    price: number;

    @ManyToOne(() => TreatmentHistory, (treatment_history) => treatment_history.admissions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'treatment_history_id' })
    treatment_history: TreatmentHistory;

    constructor(admission: Partial<Admission>) {
        Object.assign(this, admission);
    }
}

import { Staff } from "src/entities/staff.entity";
import { TreatmentHistory } from "src/entities/treatment-history.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Medicine } from "./medicine.entity";

@Entity('procedure')
export class Procedure {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'varchar', length: 255 })
    category: string;

    @Column({ type: 'int', nullable: true })
    medicine_quantity: number;

    @Column({ type: 'timestamp' })
    performed_date: Date;

    @ManyToOne(() => Medicine, medicine => medicine.procedures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "medicine_id" })

    medicine: Medicine;

    @ManyToOne(() => Staff, staff => staff.procedures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "staff_id" })
    staff: Staff;


    @ManyToOne(() => TreatmentHistory, treatment_history => treatment_history.procedures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "treatment_history_id" })
    treatment_history: TreatmentHistory

    constructor(procedure: Partial<Procedure>) {
        Object.assign(this, procedure);
    }
}

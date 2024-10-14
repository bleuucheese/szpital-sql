import { Staff } from "src/entities/staff.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('qualification')
export class Qualification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    provider: string;

    @Column({ type: 'date' })
    issue_date: Date;

    @ManyToOne(() => Staff, staff => staff.qualifications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'staff_id' })
    staff: Staff;

    constructor(qualification: Partial<Qualification>) {
        Object.assign(this, qualification);
    }
}

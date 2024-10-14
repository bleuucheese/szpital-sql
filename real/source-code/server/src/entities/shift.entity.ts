import { Staff } from "src/entities/staff.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('shift')
export class Shift {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    day_of_week: string;

    @Column({ type: 'time' })
    start_hour: Date;

    @Column({ type: 'time' })
    end_hour: Date;

    @ManyToMany(() => Staff, staff => staff.shifts)
    staff: Staff[];

    constructor(shift: Partial<Shift>) {
        Object.assign(this, shift);
    }
}

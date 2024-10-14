import { Patient } from "src/entities/patient.entity";
import { Staff } from "src/entities/staff.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointment')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    purpose: string;

    @Column({ type: 'varchar', length: 255 })
    status: string;

    @Column({ type: 'timestamp' })
    start_time: Date;

    @Column({ type: 'timestamp' })
    end_time: Date;

    @ManyToOne(() => Patient, (patient) => patient.appointments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @ManyToOne(() => Staff, (staff) => staff.appointments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'staff_id' })
    staff: Staff;

    constructor(appointment: Partial<Appointment>) {
        Object.assign(this, appointment);
    }
}

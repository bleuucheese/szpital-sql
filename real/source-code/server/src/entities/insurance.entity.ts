import { Patient } from "src/entities/patient.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('insurance')
export class Insurance {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    code: string;

    @Column({ type: 'date' })
    expired_date: Date;

    @OneToOne(() => Patient, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    constructor(insurance: Partial<Insurance>) {
        Object.assign(this, insurance);
    }
}

import { Patient } from "src/entities/patient.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    address_line: string;

    @Column({ type: 'varchar', length: 255 })
    ward: string;

    @Column({ type: 'varchar', length: 255 })
    district: string;

    @Column({ type: 'varchar', length: 255 })
    city: string;

    @OneToOne(() => Patient, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    constructor(address: Partial<Address>) {
        Object.assign(this, address);
    }
}

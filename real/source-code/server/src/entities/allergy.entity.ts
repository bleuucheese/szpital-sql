import { PatientAllergy } from "src/entities/patient-allergy.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('allergy')
export class Allergy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    allergen: string;

    @Column({ type: 'varchar', length: 255 })
    symptoms: string;

    @Column({ type: 'varchar', length: 255 })
    category: string;

    @OneToMany(() => PatientAllergy, patient_allergy => patient_allergy.allergy)
    patient_allergy: PatientAllergy[];

    constructor(allergy: Partial<Allergy>) {
        Object.assign(this, allergy);
    }
}

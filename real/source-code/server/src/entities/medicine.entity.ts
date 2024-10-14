import { Procedure } from "src/entities/procedure.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('medicine')
export class Medicine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'varchar', length: 255 })
    effect: string;

    @Column({ type: 'varchar', length: 255 })
    side_effect: string;

    @OneToMany(() => Procedure, procedure => procedure.medicine)
    procedures: Procedure[];

    constructor(medicine: Partial<Medicine>) {
        Object.assign(this, medicine);
    }
}

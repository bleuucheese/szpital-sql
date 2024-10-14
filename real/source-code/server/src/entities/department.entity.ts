
import { Staff } from "src/entities/staff.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmploymentHistory } from "./employment-history.entity";

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    name: string
    @OneToMany(() => Staff, staff => staff.department)
    staffs: Staff[];

    @OneToOne(() => Staff, staff => staff.manage_department)
    @JoinColumn({ name: "manager_id" })
    manager: Staff;

    @Column({ unique: true, nullable: true })
    manager_id: number;

    @OneToMany(() => EmploymentHistory, history => history.previous_department)
    previous_employment_histories: EmploymentHistory[];

    @OneToMany(() => EmploymentHistory, history => history.current_department)
    current_employment_histories: EmploymentHistory[];
    constructor(department: Partial<Department>) {
        Object.assign(this, department);
    }
}

import { Staff } from "src/entities/staff.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department.entity";

@Entity('employment_history')
export class EmploymentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    applied_date: Date;

    @Column({ type: 'float' })
    previous_salary: number;

    @Column({ type: "float" })
    current_salary: number;

    @Column({ type: 'varchar', length: 255 })
    previous_job_title: string;

    @Column({ type: 'varchar', length: 255 })
    current_job_title: string;

    @ManyToOne(() => Department)
    @JoinColumn({ name: "previous_department_id" })
    previous_department: Department;


    @ManyToOne(() => Department)
    @JoinColumn({ name: "current_department_id" })
    current_department: Department;


    @ManyToOne(() => Staff, staff => staff.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "staff_id" })
    staff: Staff;

    constructor(employmentHistory: Partial<EmploymentHistory>) {
        Object.assign(this, employmentHistory);
    }
}

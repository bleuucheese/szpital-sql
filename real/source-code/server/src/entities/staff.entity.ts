import { Procedure } from "src/entities/procedure.entity";
import { Qualification } from "src/entities/qualification.entity";
import { Shift } from "src/entities/shift.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department.entity";
import { Appointment } from "./appointment.entity";

@Entity('staff')
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    first_name: string;

    @Column({ type: 'varchar', length: 255 })
    last_name: string;

    @Column({ type: 'date' })
    dob: Date;

    @Column({ type: 'varchar', length: 255 })
    job_type: string;

    @Column({ type: 'float' })
    salary: number;

    @Column({ type: 'date' })
    hired_date: Date;

    @ManyToOne(() => Staff, staff => staff.employees,)
    @JoinColumn({ name: "manager_id" })
    manager: Staff;

    @Column({ type: 'int', nullable: true })
    manager_id: number;

    @OneToMany(() => Staff, staff => staff.manager)
    employees: Staff[];

    @OneToMany(() => Qualification, qualification => qualification.staff)
    qualifications: Qualification[];

    @ManyToMany(() => Shift, shift => shift.staff)
    @JoinTable({
        name: 'shift_staff', // Specify the name of the join table
        joinColumn: {
            name: 'staff_id', // Name of the column in the join table that refers to the Staff entity primary key
            referencedColumnName: 'id' // Name of the column in the Staff entity that is referred to
        },
        inverseJoinColumn: {
            name: 'shift_id',
            referencedColumnName: 'id'
        }
    })
    shifts: Shift[];
    @ManyToOne(() => Department, department => department.staffs)
    @JoinColumn({ name: "department_id" })
    department: Department;

    @Column({ nullable: true })
    department_id: number;

    @OneToOne(() => Department, department => department.manager)
    manage_department: Department;

    @OneToMany(() => Procedure, procedure => procedure.staff)
    procedures: Procedure[];

    @OneToMany(() => Appointment, appointment => appointment.staff)
    appointments: Appointment[];
    constructor(staff: Partial<Staff>) {
        Object.assign(this, staff);
    }
}

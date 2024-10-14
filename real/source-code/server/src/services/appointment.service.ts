import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateAppointmentDto } from 'src/dtos/appointment/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/dtos/appointment/update-appointment.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) { }
  formatTime(date: Date): string {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate()
    );
  }
  formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear(); // Gets the year (4 digits)
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Gets month (0-11) so add 1 to adjust to human readable format
    const day = date.getDate().toString().padStart(2, '0'); // Gets day of the month (1-31)

    return `${year}-${month}-${day}`;
  }
  combineDateAndTime(dateStr, timeStr) {
    const date = new Date(dateStr); // Create a Date object from the date string
    const timeParts = timeStr.split(':'); // Split the time string into its components

    // Set the hours and minutes of the date object based on the time string
    date.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), parseInt(timeParts[2], 10));

    return date;
  }
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { purpose, status, start_time, end_time, patient_id, staff_id, date } =
      createAppointmentDto;
    const query = `
      INSERT INTO appointment (purpose, status, start_time, end_time, patient_id, staff_id)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const formattedDate = this.formatDate(date)
    const appointmentData = {
      ...createAppointmentDto,
      start_time: this.combineDateAndTime(date, start_time).toISOString(),
      end_time: this.combineDateAndTime(date, end_time).toISOString(),
    };
    // Convert start_time and end_time from string to Date objects
    const startDateTime = new Date(appointmentData.start_time);
    const endDateTime = new Date(appointmentData.end_time);
    console.log(appointmentData)

    // Format the times as hh:mm:ss
    const startHour = this.formatTime(startDateTime);
    const endHour = this.formatTime(endDateTime)
    const formattedStartHour = `${formattedDate} ${startHour}`
    const formattedEndHour = `${formattedDate} ${startHour}`
    // Perform both availability checks in parallel
    const [isShiftAvailable, isAppointmentAvailable] = await Promise.all([
      this.checkAvailabilityOfShift({
        staff_id,
        date: startDateTime, // Use startDateTime for both date and time
        start_time: startHour,
        end_time: endHour
      }),
      this.checkAvailabilityOfAppointment({
        staff_id,
        date: startDateTime, // Use startDateTime for both date and time
        start_time: startHour,
        end_time: endHour
      })
    ]);
    if (!isShiftAvailable || !isAppointmentAvailable) {
      throw new Error('The selected appointment time is not available.');
    }
    if (!isShiftAvailable || !isAppointmentAvailable) {
      throw new Error('The selected appointment time is not available.');
    }
    // If both checks pass, create the appointment
    await this.entityManager.query(query, [
      purpose,
      status,
      formattedStartHour,
      formattedEndHour,
      patient_id,
      staff_id,
    ]);

    // Retrieve the ID of the newly created appointment
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [insertResult] = await this.entityManager.query(lastInsertIdQuery);

    // Return the newly created appointment
    return this.findOne(insertResult.id);
  }

  async findAll(page: number, count: number, queryString: string) {
    const offset = (page - 1) * count;
    let whereClause = `a.status = ?`;

    // Initialize parameters array with the status
    const queryParams = ['BOOKED', count, offset];

    // Modify query to include a search condition if queryString is not empty
    if (queryString) {
      whereClause += ` AND (s.first_name LIKE ? OR s.last_name LIKE ?)`;
      // Prepend '%' for a partial match before and after the queryString
      queryParams.splice(1, 0, `%${queryString}%`, `%${queryString}%`); // Insert before 'count' and 'offset'
    }

    const query = `
        SELECT a.*, s.id as staff_id, s.first_name as staff_first_name, s.last_name as staff_last_name,
               p.id as patient_id, p.first_name as patient_first_name, p.last_name as patient_last_name
        FROM appointment a
        JOIN staff s ON a.staff_id = s.id
        JOIN patient p ON a.patient_id = p.id
        WHERE ${whereClause}
        LIMIT ? OFFSET ?;
    `;
    const countQuery = `
    SELECT COUNT(*) as total
    FROM appointment a
    JOIN staff s ON a.staff_id = s.id
    JOIN patient p ON a.patient_id = p.id
    WHERE ${whereClause};
`;
    const totalResult = await this.entityManager.query(countQuery, queryParams);
    const totalRecords = totalResult[0].total;
    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / count);

    const res = await this.entityManager.query(query, queryParams);
    const appointments = res.map(row => ({
      id: row.id,
      purpose: row.purpose,
      status: row.status,
      start_time: row.start_time,
      end_time: row.end_time,
      staff: {
        id: row.staff_id,
        first_name: row.staff_first_name,
        last_name: row.staff_last_name,
      },
      patient: {
        id: row.patient_id,
        first_name: row.patient_first_name,
        last_name: row.patient_last_name,
      }
    }));
    return {
      totalPages, currentPage: page, appointments
    };
  }



  async findOne(id: number) {
    const query = `SELECT * FROM appointment WHERE id = ?;`;
    return await this.entityManager.query(query, [id]);
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const { purpose, status, start_time, end_time, patient_id, staff_id } =
      updateAppointmentDto;
    const query = `
      UPDATE appointment
      SET purpose = ?, status = ?, start_time = ?, end_time = ?, patient_id = ?, staff_id = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [
      purpose,
      status,
      start_time,
      end_time,
      patient_id,
      staff_id,
      id,
    ]);
    return this.findOne(id);
  }
  async cancel(id: number) {
    const query = `
      UPDATE appointment
      SET status = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [
      'CANCELLED',
      id,
    ]);
    return this.findOne(id);
  }
  async remove(id: number) {
    const deleteQuery = `DELETE FROM appointment WHERE id = ?;`;
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Appointment deleted successfully', id };
  }
  async findByPatientName(name: string) {
    const query = `
    SELECT * FROM patient 
    WHERE first_name LIKE ? OR last_name LIKE ?;
  `;

    const result = await this.entityManager.query(query, [`%${name}%`, `%${name}%`]);
    return result;
  }

  async checkAvailabilityOfAppointment(data: {
    staff_id: number;
    date: Date;
    start_time: string;
    end_time: string;
  }) {
    const { staff_id, date, start_time, end_time } = data;
    // Combine the date with the start and end times
    const startDateTime = new Date(date);
    const endDateTime = new Date(date);

    const [startHourInt, startMinute, startSecond] = start_time.split(':').map(Number);
    const [endHourInt, endMinute, endSecond] = end_time.split(':').map(Number);

    // Set the hours, minutes, and seconds
    startDateTime.setHours(startHourInt, startMinute, startSecond);
    endDateTime.setHours(endHourInt, endMinute, endSecond);

    const query = `
        SELECT * FROM appointment
        WHERE staff_id = ?
        AND (
            (start_time < ? AND end_time > ?) OR
            (start_time < ? AND end_time > ?)
        );
    `;

    // Execute the query with the adjusted date and time
    const conflictingAppointments = await this.entityManager.query(query, [
      staff_id,
      endDateTime.toISOString(),
      startDateTime.toISOString(),
      startDateTime.toISOString(),
      endDateTime.toISOString()
    ]);

    // Return whether there are conflicts
    return conflictingAppointments.length === 0;
  }
  // Helper method to get the day of the week from a Date object
  getDayOfWeek(currentDate: Date): string {
    // Convert the date string to a Date object
    const date = new Date(currentDate);

    // Array of days
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    // Get the index of the day of the week (0-6)
    const dayIndex = date.getUTCDay(); // Use getDay() if the date is in local time

    // Get the day of the week from the array
    const dayOfWeek = days[dayIndex];

    return dayOfWeek
  }

  async checkAvailabilityOfShift(data: {
    staff_id: number;
    date: Date;
    start_time: string;
    end_time: string;
  }) {
    const { staff_id, date, start_time, end_time } = data;
    const currentDay = this.getDayOfWeek(date);
    // Query to fetch shifts for the given staff on the specified day of the week
    const query = `
        SELECT sh.id AS shift_id, sh.day_of_week, sh.start_hour, sh.end_hour
        FROM shift sh
        JOIN shift_staff ss ON sh.id = ss.shift_id
        WHERE ss.staff_id = ?
        AND sh.day_of_week = ?;
    `;

    // Execute the query
    const shifts = await this.entityManager.query(query, [staff_id, currentDay]);
    // Convert appointment times to Date objects
    const appointmentStart = new Date(date);
    const appointmentEnd = new Date(date);

    const [startHourInt, startMinute, startSecond] = start_time.split(':').map(Number);
    const [endHourInt, endMinute, endSecond] = end_time.split(':').map(Number);

    appointmentStart.setHours(startHourInt, startMinute, startSecond);
    appointmentEnd.setHours(endHourInt, endMinute, endSecond);
    // Check for conflicts with the shifts
    const isAvailable = shifts.every(shift => {
      const shiftStart = new Date(date);
      const shiftEnd = new Date(date);

      const [shiftStartHourInt, shiftStartMinute, shiftStartSecond] = shift.start_hour.split(':').map(Number);
      const [shiftEndHourInt, shiftEndMinute, shiftEndSecond] = shift.end_hour.split(':').map(Number);

      shiftStart.setHours(shiftStartHourInt, shiftStartMinute, shiftStartSecond);
      shiftEnd.setHours(shiftEndHourInt, shiftEndMinute, shiftEndSecond);

      // Check if the appointment overlaps with the shift
      return (
        (appointmentEnd <= shiftStart || appointmentStart >= shiftEnd)
      );
    });

    // Return whether the appointment can be scheduled without overlapping with the shifts
    return isAvailable;
  }
}

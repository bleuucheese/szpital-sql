import { PrismaClient } from "@prisma/client";
import { allergies } from "../data/allergies";
import { departments } from "../data/department";
import { adminStaffs, staffs } from "../data/staff";
const prisma = new PrismaClient();
const reset = async () => {
  console.log("Start resetting db");
  await Promise.all([
    // Delete departments first since they reference staff as managers
    await prisma.department.deleteMany(),
    // Delete all records in the correct order based on foreign key dependencies
    prisma.shift.deleteMany(),
    prisma.staff.deleteMany(),
    prisma.allergy.deleteMany(),
    prisma.patient.deleteMany(),
    prisma.$executeRaw`ALTER TABLE Allergy AUTO_INCREMENT = 1`,
  ]);
  console.log("Finish resetting db");
};
const ensureEnoughDoctors = async (requiredDoctors: number) => {
  let doctorsCount = 0;

  while (doctorsCount < requiredDoctors) {
    // Generate and insert new staff data
    await prisma.staff.deleteMany(); // Clear existing staff data
    await prisma.staff.createMany({
      data: staffs,
    });

    // Count the number of doctors
    doctorsCount = await prisma.staff.count({
      where: {
        job_type: "doctor",
      },
    });

    console.log(`Generated staff, found ${doctorsCount} doctors.`);
  }

  console.log("Sufficient number of doctors available.");
};
const main = async () => {
  await reset();
  // Create allergies
  console.log("Start creating allergies");
  await prisma.staff.createMany({
    data: adminStaffs,
  });
  await prisma.allergy.createMany({
    data: allergies,
  });
  console.log("Finish creating allergies");
  // Create Staff
  console.log("Start creating staff");
  await prisma.staff.createMany({
    data: staffs,
  });
  console.log("Finish creating staff");

  // Create department
  console.log("Start creating department");
  await ensureEnoughDoctors(departments.length);
  const managers = await prisma.staff.findMany({
    take: 5,
    where: {
      job_type: "doctor", // Ensure you're selecting only staff eligible to be managers
    },
  });
  if (managers.length < departments.length) {
    await prisma.staff.deleteMany().then(async () => {
      await prisma.staff.createMany({
        data: staffs,
      });
    });
  }
  await Promise.all(
    departments.map((dept, index) => {
      return prisma.department.create({
        data: {
          name: dept.name,
          manager: {
            connect: { id: managers[index].id },
          },
        },
      });
    })
  );
  console.log("Finish creating department");
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

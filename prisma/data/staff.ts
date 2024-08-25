import { faker } from "@faker-js/faker";
const JOB_DIC = {
  1: "doctor",
  2: "nurse",
};
const generateStaff = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    dob: faker.date.birthdate(),
    job_type:
      JOB_DIC[
        faker.number.int({
          min: 1,
          max: 2,
        }) as keyof typeof JOB_DIC
      ],
    salary: faker.number.float({
      min: 1000,
      max: 10000,
      multipleOf: 0.01,
    }),
  };
};

export const staffs = faker.helpers.multiple(generateStaff, {
  count: 20,
});

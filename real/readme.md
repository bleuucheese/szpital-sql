# Project Name

This is a full-stack JavaScript application with a NestJS backend and a Next.js frontend.

# Video Demonstration Link

https://rmiteduau.sharepoint.com/:v:/s/DBApplications2024B-Group7/EeAMSYDwgplHm7yXXO2xZAwB_qx4HKwY8LQRQquRyNKEgw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=WbFwLY

# Group 7 Contribution Details

Chau Chan Bang (s3975015)
Role: Backend Developer
Contribution score: 22% - 5.5pts

Trinh Nguyen Ha (s3981134)
Role: Raw SQL Script Developer and Technical Writer
Contribution score: 22% - 5.5pts

Hoang Nghia Tri Hung (s3930336)
Role: Technical Writer
Contribution score: 12% - 3pts

Lai Dong Khoa
(s3926689)
Role: UI/UX Designer
Contribution score: 22% - 5.5pts

Chau Chan Thien (s3975010)
Role: Technical Leader and Front-End Developer
Contribution score: 22% - 5.5pts

# Raw SQL scripts

For testing purposes, the files init.sql, populate.sql, role.sql, utils.sql, and queries.sql can be used.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/).

### Installing Node.js and npm

To install Node.js and npm, follow these steps:

#### For Windows and Mac:

1. Visit the [Node.js website](https://nodejs.org/).
2. Download the installer for your operating system.
3. Run the installer (this installs both Node.js and npm).
4. After installation, open a terminal and run `node -v` and `npm -v` to ensure they are correctly installed.

#### For Linux:

1. You can install Node.js and npm using a package manager. For example, on Ubuntu:
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```
2. Verify the installation by running `node -v` and `npm -v`.

## Installation

Follow these steps to set up and run the project:

### Backend Setup (`server` directory)

1. Change to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and populate it with the necessary environment variables:
   ```plaintext
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USERNAME=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   DATABASE_SYNCHRONIZE= <boolean>
   JWT_SECRET_KEY= <for jwt, can be random string>
   JWT_REFRESH_TOKEN_KEY= <for jwt, can be random string>
   MONGODB_URI=""
   BASE_URL= <should be your backend link, for example: http://localhost:4000/api>
   ```

### Frontend Setup (`web` directory)

1. Change to the `web` directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `web` directory and populate it with the necessary environment variables:
   ```plaintext
   NEXT_PUBLIC_API_URL=<should be your backend link, for example: http://localhost:4000/api>
   ```

## Running the Application

To run the application:

- If you want to seed data into your database. Run the first 2 lines in seed.sql file in `seed` directory:

  ```bash
  DROP DATABASE IF EXISTS Hospital;
  CREATE DATABASE IF NOT EXISTS Hospital;
  ```

- For the backend:

  ```bash
  cd server
  npm run dev
  ```

- Then run the remain sql query in the seed.sql file.

- For the frontend:
  ```bash
  cd web
  npm run dev
  ```

## Contributing

Contributions are welcome. Please follow the standard fork-and-pull request workflow on GitHub.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/thien06012001/hospital-manage-system](https://github.com/thien06012001/hospital-manage-system)

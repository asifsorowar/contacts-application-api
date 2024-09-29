# Contacts Application API

## Tech Stacks

- Node
- Express
- Prisma
- Typescript
- Postgresql

## API Documentation

https://documenter.getpostman.com/view/10155418/2sAXqzVdFB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/asifsorowar/contacts-application-api

   cd contacts-application-api
   ```

2. Installing Dependencies

   ```bash
   npm install
   ```

## on development

3. Adding the environment variables

   ```bash
   create a .env.development file, add the variables following the .env.example
   ```

4. Run migrations:

   ```bash
   npm run dev:db:migrate
   ```

5. Run the server:

   ```bash
   npm run dev
   ```

6. Run the test:

   ```bash
   npm run test
   ```

7. For running the test coverage:

   ```bash
   npm run test:coverage

   A coverage report will be generated. Locate the index.html file inside the
   coverage -> lcov-report folder.

   Open the index.html file to view the test coverage report in a browser.
   ```

## On production

3. Adding the environment variables:

   ```bash
   create a .env.production file
   ```

4. Run the server:

   ```bash
   npm run start
   ```

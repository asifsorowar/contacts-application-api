import { UserService } from "@modules/user/service";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const userService = new UserService();

async function main() {
  const password = await userService.encryptPassword("12345");

  // creating users
  await prisma.users.createMany({
    data: [
      {
        email: "test@test.com",
        name: "Test user 1",
        password,
      },
      {
        email: "test@gmail.com",
        name: "Test user 2",
        password,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient, Role } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as argon from 'argon2';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  try {
    const password = await argon.hash(process.env.ADMIN_PASSWORD);
    await prisma.user.create({
      data: {
        role: Role.ADMIN,
        username: process.env.ADMIN_USERNAME,
        password,
      },
    });
  } catch (e) {
    console.log('Something went wrong, or this user already exist');
  }
}
main().finally(async () => {
  await prisma.$disconnect();
});

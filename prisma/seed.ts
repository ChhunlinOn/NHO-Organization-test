import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = "nhch@12345"; // your default admin password
  const hashed = await bcrypt.hash(password, 10);

  // Upsert ensures admin exists
  await prisma.user.upsert({
    where: { email: "admin@nhch.com" },
    update: {
      password: hashed, // if admin exists, update password
    },
    create: {
      name: "NHCH Admin",
      email: "admin@nhch.com",
      password: hashed,
      role: "ADMIN", // important for permissions
      img: null,
    },
  });

  console.log("✅ Admin user is ready (email: admin@nhch.com, password: nhch@12345)");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

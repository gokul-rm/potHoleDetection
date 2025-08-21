import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const adminPass = await bcrypt.hash("Admin@123", 10);
  const officialPass = await bcrypt.hash("Official@123", 10);
  const publicPass = await bcrypt.hash("Public@123", 10);

  // Create areas
  const coimbatore = await prisma.area.upsert({
    where: { name: "Coimbatore" },
    update: {},
    create: { name: "Coimbatore" },
  });

  const chennai = await prisma.area.upsert({
    where: { name: "Chennai" },
    update: {},
    create: { name: "Chennai" },
  });

  // Create users
  await prisma.user.upsert({
    where: { email: "admin@corp.com" },
    update: {},
    create: {
      email: "admin@corp.com",
      password: adminPass,
      role: "CORPORATE",
    },
  });

  await prisma.user.upsert({
    where: { email: "official.coimbatore@gov.in" },
    update: {},
    create: {
      email: "official.coimbatore@gov.in",
      password: officialPass,
      role: "OFFICIAL",
      areaId: coimbatore.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "public@demo.com" },
    update: {},
    create: {
      email: "public@demo.com",
      password: publicPass,
      role: "PUBLIC",
    },
  });

  // Example potholes
  await prisma.pothole.create({
    data: {
      latitude: 11.0168,
      longitude: 76.9558,
      severity: 3,
      areaId: coimbatore.id,
      reports: {
        create: {
          reporter: "AI",
          message: "Detected by AI model",
        },
      },
    },
  });

  await prisma.pothole.create({
    data: {
      latitude: 13.0827,
      longitude: 80.2707,
      severity: 5,
      areaId: chennai.id,
      reports: {
        create: {
          reporter: "AI",
          message: "Severe pothole detected",
        },
      },
    },
  });

  console.log("✅ Seed data inserted!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all potholes
router.get("/", async (req, res) => {
  try {
    const potholes = await prisma.pothole.findMany({
      include: { area: true },
    });
    res.json(potholes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch potholes" });
  }
});

// Create a new pothole
router.post("/", async (req, res) => {
  try {
    const { latitude, longitude, areaId } = req.body;
    const pothole = await prisma.pothole.create({
      data: { latitude, longitude, areaId },
    });
    res.json(pothole);
  } catch (err) {
    res.status(500).json({ error: "Failed to create pothole" });
  }
});

export default router;

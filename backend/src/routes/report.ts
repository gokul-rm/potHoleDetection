import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      include: { pothole: true, user: true },
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Create a new report
router.post("/", async (req, res) => {
  try {
    const { description, userId, potholeId } = req.body;
    const report = await prisma.report.create({
      data: { description, userId, potholeId },
    });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Failed to create report" });
  }
});

export default router;

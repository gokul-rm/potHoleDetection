import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.js";
import potholeRoutes from "./routes/pothole.js";
import reportRoutes from "./routes/report.js";


const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/potholes", potholeRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

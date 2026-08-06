import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";

import aiRoutes from "./routes/aiRoutes";


const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TestCase AI Agent API Running"
    });
});

// Routes
app.use("/api", aiRoutes);

export default app;
import dotenv from "dotenv";

dotenv.config();

import express, { Application } from "express";
import cors from "cors";

import aiRoutes from "./routes/aiRoutes";
import resumeRoutes from "./routes/resumeRoutes";
import jobRoutes from "./routes/jobRoutes";


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

app.use("/api/resume", resumeRoutes);

app.use("/api/jobs", jobRoutes);


export default app;
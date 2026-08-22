import { Request, Response } from "express";
import { analyzeResume, matchResumeToRequirements } from "../services/resumeService";
import { extractTextFromPDF } from "../utils/resumeParser";
import { createJob, runJob, toPublicJob } from "../services/jobStore";
import fs from "fs";

export const analyze = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required."
            });
        }

        const extractedText = await extractTextFromPDF(req.file.path);

        if (!extractedText) {
            return res.status(400).json({
                success: false,
                message: "Could not extract text from resume."
            });
        }

        const job = createJob("resume", {
            fileName: req.file.originalname,
            resumeText: extractedText
        });

        runJob(job.id, () => analyzeResume(extractedText));

        return res.status(202).json({
            success: true,
            message: "Resume analysis job started",
            jobId: job.id,
            data: toPublicJob(job)
        });
    } catch (error: any) {
        console.error("========== RESUME ANALYSIS ERROR ==========");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
    }
};

export const matchResume = async (req: Request, res: Response) => {
    try {
        const requirements = String(req.body?.requirements || "").trim();

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF resume is required."
            });
        }

        if (!requirements) {
            return res.status(400).json({
                success: false,
                message: "Job requirements / job description is required."
            });
        }

        const extractedText = await extractTextFromPDF(req.file.path);

        if (!extractedText) {
            return res.status(400).json({
                success: false,
                message: "Could not extract text from resume."
            });
        }

        const job = createJob("hr", {
            fileName: req.file.originalname,
            requirements,
            resumeText: extractedText
        });

        runJob(job.id, () => matchResumeToRequirements(extractedText, requirements));

        return res.status(202).json({
            success: true,
            message: "HR match job started",
            jobId: job.id,
            data: toPublicJob(job)
        });
    } catch (error: any) {
        console.error("========== HR RESUME MATCH ERROR ==========");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
    }
};

export const extractResume = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required."
            });
        }

        const extractedText = await extractTextFromPDF(req.file.path);

        return res.status(200).json({
            success: true,
            message: "Resume text extracted successfully",
            data: {
                text: extractedText
            }
        });
    } catch (error: any) {
        console.error("========== PDF EXTRACTION ERROR ==========");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
    }
};

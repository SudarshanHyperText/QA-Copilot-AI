import { Request, Response } from "express";
import { analyzeResume } from "../services/resumeService";
import { extractTextFromPDF } from "../utils/resumeParser";
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

        const response = await analyzeResume(extractedText);

        return res.status(200).json({
            success: true,
            message: "Resume analyzed successfully",
            data: response
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
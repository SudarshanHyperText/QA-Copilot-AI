import { Request, Response } from "express";
import { generateTestCases } from "../services/geminiService";
export const generate = async (req: Request, res: Response) => {

    try {

        const { requirement } = req.body;

        if (!requirement) {
            return res.status(400).json({
                success: false,
                message: "Requirement is required."
            });
        }

        const response = await generateTestCases(requirement);

        return res.status(200).json({
            success: true,
            message: "Test Cases Generated Successfully",
            data: response
        });

    } catch (error: any) {

    console.error("========== ERROR ==========");
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message,
        stack: error.stack
    });

}

};
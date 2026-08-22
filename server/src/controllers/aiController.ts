import { Request, Response } from "express";
import { generateTestCases } from "../services/geminiService";
import { createJob, runJob, toPublicJob } from "../services/jobStore";

export const generate = async (req: Request, res: Response) => {
    try {
        const { requirement } = req.body;

        if (!requirement) {
            return res.status(400).json({
                success: false,
                message: "Requirement is required."
            });
        }

        const job = createJob("testcase", { requirement });

        runJob(job.id, () => generateTestCases(requirement));

        return res.status(202).json({
            success: true,
            message: "Test case job started",
            jobId: job.id,
            data: toPublicJob(job)
        });
    } catch (error: any) {
        console.error("========== ERROR ==========");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

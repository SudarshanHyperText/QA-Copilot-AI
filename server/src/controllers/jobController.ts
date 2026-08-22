import { Request, Response } from "express";
import { getJob, toPublicJob } from "../services/jobStore";

export const getJobById = (req: Request, res: Response) => {
    const job = getJob(String(req.params.id || ""));

    if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found. It may have expired."
        });
    }

    return res.status(200).json({
        success: true,
        data: toPublicJob(job)
    });
};

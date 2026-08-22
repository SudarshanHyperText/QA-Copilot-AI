import { Router } from "express";

import multer from "multer";

import {
    analyze,
    extractResume,
    matchResume
} from "../controllers/resumeController";

import { aiLimiter } from "../middleware/rateLimiter";

const router = Router();

const upload = multer({
    dest: "uploads/"
});


router.post(
    "/analyze",
    aiLimiter,
    upload.single("resume"),
    analyze
);


router.post(
    "/match",
    aiLimiter,
    upload.single("resume"),
    matchResume
);


router.post(
    "/extract",
    upload.single("resume"),
    extractResume
);


export default router;
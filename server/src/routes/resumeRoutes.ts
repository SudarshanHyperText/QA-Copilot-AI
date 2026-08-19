import { Router } from "express";
import multer from "multer";
import { analyze, extractResume } from "../controllers/resumeController";

const router = Router();

const upload = multer({
    dest: "uploads/"
});

router.post("/analyze", upload.single("resume"), analyze);

router.post("/extract", upload.single("resume"), extractResume);

export default router;
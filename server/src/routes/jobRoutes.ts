import { Router } from "express";
import { getJobById } from "../controllers/jobController";

const router = Router();

router.get("/:id", getJobById);

export default router;

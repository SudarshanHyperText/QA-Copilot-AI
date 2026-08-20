import { Router } from "express";

import { generate } from "../controllers/aiController";
import { aiLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post(
    "/generate",
    aiLimiter,
    generate
);

export default router;
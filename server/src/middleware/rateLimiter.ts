import rateLimit from "express-rate-limit";

export const aiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,

    limit: 3,

    message: {
        success: false,
        message: "You have exceeded the maximum limits. Please try again later."
    }
});
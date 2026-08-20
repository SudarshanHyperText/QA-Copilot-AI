import rateLimit from "express-rate-limit";

export const aiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,

    limit: 5,

    message: {
        success: false,
        message: "You have exceeded the maximum limits. Please try again later."
    }
});
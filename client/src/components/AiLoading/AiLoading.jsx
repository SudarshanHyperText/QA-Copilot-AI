import { useEffect, useState } from "react";
import "./AiLoading.css";

export default function AiLoading({ type }) {

    const [visibleSteps, setVisibleSteps] = useState(1);

    const resumeSteps = [
        "Reading resume content...",
        "Analyzing experience and skills...",
        "Evaluating profile strength...",
        "Checking ATS compatibility...",
        "Generating improvement suggestions..."
    ];

    const testCaseSteps = [
        "Understanding the requirement...",
        "Identifying test scenarios...",
        "Generating test cases...",
        "Preparing API and edge cases...",
        "Generating Playwright automation..."
    ];

    const steps = type === "resume"
        ? resumeSteps
        : testCaseSteps;

    useEffect(() => {

        setVisibleSteps(1);

        const interval = setInterval(() => {

            setVisibleSteps(prev => {

                if (prev >= steps.length) {
                    clearInterval(interval);
                    return prev;
                }

                return prev + 1;
            });

        }, 5000);

        return () => clearInterval(interval);

    }, [type, steps.length]);

    return (
        <div className="ai-loading">

            <div className="ai-spinner"></div>

            <h3>
                {type === "resume"
                    ? "AI is analyzing your resume"
                    : "AI is generating your test cases"}
            </h3>

            <div className="ai-steps">

                {steps.slice(0, visibleSteps).map((step, index) => (
                    <div className="ai-step" key={index}>
                        <span className="step-dot"></span>
                        {step}
                    </div>
                ))}

            </div>

        </div>
    );
}
import { useState } from "react";
import { startTestCaseJob } from "../../services/api";
import "./RequirementForm.css";
import AiLoading from "../AiLoading/AiLoading";
import JobChip from "../JobChip/JobChip";
import useJobPoll from "../../hooks/useJobPoll";
import { isJobLoading } from "../../utils/workspace";

export default function RequirementForm({ requirement, setRequirement, job, setJob }) {

    const [submitting, setSubmitting] = useState(false);
    const loading = submitting || isJobLoading(job);

    useJobPoll(job.jobId, job.status, (next) => {
        setJob({
            jobId: next.id,
            status: next.status,
            error: next.error || "",
            ...(next.status === "completed" ? { response: next.result } : {})
        });
    });

    const handleGenerate = async () => {
        if (requirement.trim() === "") {
            alert("Please enter requirement.");
            return;
        }

        try {
            setSubmitting(true);
            setJob({ error: "" });
            const response = await startTestCaseJob(requirement);
            const started = response.data;

            if (started.jobId) {
                setJob({
                    jobId: started.jobId,
                    status: started.data?.status || "running",
                    error: "",
                    response: null
                });
                return;
            }

            if (started.data?.manualTestCases) {
                setJob({
                    status: "completed",
                    response: started.data,
                    error: ""
                });
                return;
            }

            throw new Error(started.message || "Could not start job.");
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong.";
            setJob({ status: "failed", error: message });
            alert(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <label className="field-label" htmlFor="requirement-input">Requirement</label>
            <textarea
                id="requirement-input"
                placeholder="Paste a user story, acceptance criteria, or feature description..."
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
            />

            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Job running..." : "Generate test suite"}
            </button>

            <JobChip jobId={job.jobId} status={job.status} />

            {job.error && <p className="resume-error">{job.error}</p>}

            {loading && <AiLoading type="testcase" />}

            <div className="note-box">
                The first request may take up to 60 seconds after inactivity. Following requests will take only 30 seconds.
            </div>
        </div>
    );
}

import { useState } from "react";
import "../ResumeAnalyzer/ResumeAnalyzer.css";
import "./HrResumeMatch.css";
import AiLoading from "../AiLoading/AiLoading";
import JobChip from "../JobChip/JobChip";
import useJobPoll from "../../hooks/useJobPoll";
import { apiBase, isJobLoading } from "../../utils/workspace";

function HrResumeMatch({ job, setJob }) {

    const [submitting, setSubmitting] = useState(false);
    const loading = submitting || isJobLoading(job);

    useJobPoll(job.jobId, job.status, (next) => {
        setJob({
            jobId: next.id,
            status: next.status,
            error: next.error || "",
            fileName: next.input?.fileName || job.fileName,
            requirements: job.requirements || next.input?.requirements || "",
            ...(next.status === "completed" ? { response: next.result } : {})
        });
    });

    const scoreClass = job.response?.matchScore >= 80
        ? "score-strong"
        : job.response?.matchScore >= 60
            ? "score-partial"
            : job.response?.matchScore >= 40
                ? "score-weak"
                : "score-poor";

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) {
            return;
        }
        if (selectedFile.type !== "application/pdf") {
            setJob({ error: "Please upload a PDF resume." });
            return;
        }
        setJob({
            file: selectedFile,
            fileName: selectedFile.name,
            error: ""
        });
    };

    const handleMatch = async () => {
        if (!job.file) {
            setJob({
                error: job.fileName
                    ? "Re-select the PDF to start a new match. Previous results are still saved."
                    : "Please select a resume first."
            });
            return;
        }
        if (!job.requirements?.trim()) {
            setJob({ error: "Please paste the job requirements or job description." });
            return;
        }

        setSubmitting(true);
        setJob({ error: "" });

        try {
            const formData = new FormData();
            formData.append("resume", job.file);
            formData.append("requirements", job.requirements.trim());

            const res = await fetch(`${apiBase()}/api/resume/match`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Resume matching failed.");
            }

            if (data.jobId) {
                setJob({
                    jobId: data.jobId,
                    status: data.data?.status || "running",
                    error: ""
                });
                return;
            }

            if (data.data?.matchScore != null) {
                setJob({
                    status: "completed",
                    response: data.data,
                    error: ""
                });
                return;
            }

            throw new Error("Could not start job.");
        } catch (error) {
            setJob({ status: "failed", error: error.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="resume-analyzer">
            <div className="hr-input-grid">
                <div className="upload-box">
                    <h3 className="hr-box-title">Candidate resume</h3>
                    <input
                        id="hr-resume-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="hr-resume-upload" className="upload-label">
                        Choose PDF
                    </label>
                    {job.fileName && (
                        <p className="selected-file">{job.fileName}</p>
                    )}
                </div>

                <div className="hr-requirement-box">
                    <h3 className="hr-box-title">Job requirements</h3>
                    <textarea
                        placeholder="Paste the job description, required skills, experience, and tools..."
                        value={job.requirements || ""}
                        onChange={(e) => setJob({ requirements: e.target.value })}
                    />
                </div>
            </div>

            {job.error && <p className="resume-error">{job.error}</p>}

            <button
                className="analyze-button"
                onClick={handleMatch}
                disabled={loading}
            >
                {loading ? "Job running..." : "Check match %"}
            </button>

            <JobChip jobId={job.jobId} status={job.status} />

            {loading && <AiLoading type="hr" />}

            <div className="note-box">
                The first request may take up to 60 seconds after inactivity. Following requests will take only 30 seconds.
            </div>

            {job.response && (
                <div className="resume-result">
                    <div className="score-card">
                        <div className={`score-circle ${scoreClass}`}>
                            <span>{job.response.matchScore}</span>
                            <small>%</small>
                        </div>
                        <div className="score-info">
                            <h3>{job.response.verdict || "Match Result"}</h3>
                            <p className="hr-recommendation">
                                Recommendation: {job.response.recommendation || "Review"}
                            </p>
                            <p>{job.response.summary}</p>
                        </div>
                    </div>

                    <div className="analysis-grid">
                        <div className="analysis-card">
                            <h3>Matched skills</h3>
                            <ul>
                                {job.response.matchedSkills?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="analysis-card">
                            <h3>Missing skills</h3>
                            <ul>
                                {job.response.missingSkills?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="analysis-card">
                            <h3>Requirements met</h3>
                            <ul>
                                {job.response.matchedRequirements?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="analysis-card">
                            <h3>Gaps vs JD</h3>
                            <ul>
                                {job.response.gaps?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="keywords-card">
                        <h3>HR screening notes</h3>
                        <ul>
                            {job.response.hrNotes?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HrResumeMatch;

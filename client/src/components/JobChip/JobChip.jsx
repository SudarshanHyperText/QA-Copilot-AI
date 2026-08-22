import "./JobChip.css";

export default function JobChip({ jobId, status }) {
    if (!jobId) {
        return null;
    }

    return (
        <div className={`job-chip job-${status || "idle"}`}>
            <span className="job-dot"></span>
            <span className="job-id">{jobId}</span>
            {status && <span className="job-status">{status}</span>}
        </div>
    );
}

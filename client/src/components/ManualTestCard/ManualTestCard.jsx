import { useState } from "react";
import "./ManualTestCard.css";

function getSteps(steps) {
    if (Array.isArray(steps)) {
        return steps.filter(Boolean);
    }

    if (typeof steps === "string") {
        return steps.split("\n").map((s) => s.trim()).filter(Boolean);
    }

    return [];
}

export default function ManualTestCard({ tc }) {

    const [showDetails, setShowDetails] = useState(false);
    const priority = (tc.priority || "medium").toLowerCase();
    const typeClass = (tc.type || "positive").toLowerCase();

    return (

        <div className="manual-card">

            <div className="manual-top">

                <div>

                    <div className="manual-meta">
                        <span className="case-id">{tc.id}</span>
                        {tc.module && <span className="meta-chip">{tc.module}</span>}
                        {tc.type && <span className={`meta-chip type-${typeClass}`}>{tc.type}</span>}
                    </div>

                    <h2>{tc.title}</h2>

                </div>

                <div className="badge-stack">
                    {tc.severity && (
                        <span className={`severity ${(tc.severity || "").toLowerCase()}`}>
                            {tc.severity}
                        </span>
                    )}
                    <span className={`priority ${priority}`}>
                        {tc.priority}
                    </span>
                </div>

            </div>

            <div className="manual-grid">
                <div>
                    <strong>Preconditions</strong>
                    <p>{tc.preconditions || "None specified"}</p>
                </div>
                <div>
                    <strong>Test Data</strong>
                    <p>{tc.testData || "None specified"}</p>
                </div>
            </div>

            <div className="expected">
                <strong>Expected Result</strong>
                <p>{tc.expectedResult}</p>
            </div>

            <button
                className="view-btn"
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ? "Hide Steps ▲" : "View Steps ▼"}
            </button>

            {showDetails && (

                <ol className="steps">
                    {getSteps(tc.steps).map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>

            )}

        </div>

    );

}

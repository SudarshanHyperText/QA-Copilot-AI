import { useState } from "react";
import "./ManualTestCard.css";

export default function ManualTestCard({ tc }) {

    const [showSteps, setShowSteps] = useState(false);

    return (

        <div className="manual-card">

            <div className="manual-top">

                <div>

                    <h3>{tc.id}</h3>

                    <h2>{tc.title}</h2>

                </div>

                <span className={`priority ${tc.priority.toLowerCase()}`}>
                    {tc.priority}
                </span>

            </div>

            <div className="expected">

                <strong>Expected Result</strong>

                <p>{tc.expectedResult}</p>

            </div>

            <button
                className="view-btn"
                onClick={() => setShowSteps(!showSteps)}
            >
                {showSteps ? "Hide Steps ▲" : "View Steps ▼"}
            </button>

            {
                showSteps &&

                <div className="steps">

                    {tc.steps
                        .split("\n")
                        .map((step, index) => (

                            <p key={index}>
                                {step}
                            </p>

                        ))
                    }

                </div>

            }

        </div>

    );

}
import { useState } from "react";
import "./ApiTestCard.css";

function formatJson(value) {
    if (value == null || value === "") {
        return "{}";
    }

    if (typeof value === "string") {
        return value;
    }

    try {
        return JSON.stringify(value, null, 2);
    } catch {
        return String(value);
    }
}

export default function ApiTestCard({ api }) {

    const [open, setOpen] = useState(false);
    const method = (api.method || "GET").toUpperCase();

    return (

        <div className="api-card">

            <div className="api-header">

                <div>
                    <h3>{api.title}</h3>
                    <p className="api-endpoint">{api.endpoint || "Endpoint not specified"}</p>
                </div>

                <span className={`method-badge method-${method.toLowerCase()}`}>
                    {method}
                </span>

            </div>

            <div className="api-status-row">
                <span>Expected status</span>
                <strong>{api.expectedStatus}</strong>
            </div>

            {api.expectedResponse && (
                <p className="api-expected">{api.expectedResponse}</p>
            )}

            <button className="view-btn api-toggle" onClick={() => setOpen(!open)}>
                {open ? "Hide Request Details ▲" : "View Request Details ▼"}
            </button>

            {open && (

                <div className="api-details">

                    <div>
                        <strong>Headers</strong>
                        <pre>{formatJson(api.headers)}</pre>
                    </div>

                    <div>
                        <strong>Query Params</strong>
                        <pre>{formatJson(api.queryParams)}</pre>
                    </div>

                    <div>
                        <strong>Request Body</strong>
                        <pre>{formatJson(api.requestBody)}</pre>
                    </div>

                    {api.assertions?.length > 0 && (
                        <div>
                            <strong>Assertions</strong>
                            <ul>
                                {api.assertions.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>

            )}

        </div>

    );

}

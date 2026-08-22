function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

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

function getSteps(steps) {
    if (Array.isArray(steps)) {
        return steps.filter(Boolean);
    }

    if (typeof steps === "string") {
        return steps.split("\n").map((s) => s.trim()).filter(Boolean);
    }

    return [];
}

export function downloadTestReport(response, requirement = "") {
    const generatedAt = new Date().toLocaleString();
    const manual = response?.manualTestCases || [];
    const apis = response?.apiTestCases || [];
    const sqls = response?.sqlQueries || [];
    const edges = response?.edgeCases || [];

    const manualHtml = manual.map((tc) => `
        <article class="card">
            <div class="row">
                <strong>${escapeHtml(tc.id)}</strong>
                <span class="badge">${escapeHtml(tc.priority || "")}</span>
            </div>
            <h3>${escapeHtml(tc.title)}</h3>
            <p><b>Module:</b> ${escapeHtml(tc.module || "-")} | <b>Type:</b> ${escapeHtml(tc.type || "-")} | <b>Severity:</b> ${escapeHtml(tc.severity || "-")}</p>
            <p><b>Preconditions:</b> ${escapeHtml(tc.preconditions || "-")}</p>
            <p><b>Test Data:</b> ${escapeHtml(tc.testData || "-")}</p>
            <p><b>Steps:</b></p>
            <ol>${getSteps(tc.steps).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
            <p><b>Expected Result:</b> ${escapeHtml(tc.expectedResult || "-")}</p>
        </article>
    `).join("");

    const apiHtml = apis.map((api) => `
        <article class="card">
            <div class="row">
                <h3>${escapeHtml(api.title)}</h3>
                <span class="badge method">${escapeHtml(api.method)}</span>
            </div>
            <p><b>Endpoint:</b> ${escapeHtml(api.endpoint || "-")}</p>
            <p><b>Expected Status:</b> ${escapeHtml(api.expectedStatus)}</p>
            <p><b>Headers:</b></p>
            <pre>${escapeHtml(formatJson(api.headers))}</pre>
            <p><b>Query Params:</b></p>
            <pre>${escapeHtml(formatJson(api.queryParams))}</pre>
            <p><b>Request Body:</b></p>
            <pre>${escapeHtml(formatJson(api.requestBody))}</pre>
            <p><b>Expected Response:</b> ${escapeHtml(api.expectedResponse || "-")}</p>
            <p><b>Assertions:</b></p>
            <ul>${(api.assertions || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
    `).join("");

    const sqlHtml = sqls.map((sql) => `
        <article class="card">
            <h3>${escapeHtml(sql.purpose)}</h3>
            <pre>${escapeHtml(sql.query)}</pre>
        </article>
    `).join("");

    const edgeHtml = edges.map((edge) => `<li>${escapeHtml(edge)}</li>`).join("");

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>QA Copilot Test Report</title>
    <style>
        body { font-family: Segoe UI, sans-serif; background: #f4f7fc; color: #111827; margin: 0; padding: 32px; }
        h1 { color: #1d4ed8; }
        h2 { margin-top: 36px; color: #1e3a8a; border-bottom: 2px solid #dbeafe; padding-bottom: 8px; }
        .meta { color: #4b5563; margin-bottom: 24px; }
        .card { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px 18px; margin: 12px 0; }
        .row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .badge { background: #1d4ed8; color: white; padding: 4px 10px; border-radius: 999px; font-size: 12px; }
        pre { background: #111827; color: #86efac; padding: 12px; border-radius: 8px; overflow: auto; }
        ol, ul { margin: 8px 0 0 18px; }
        .req { white-space: pre-wrap; background: #fff; border-left: 4px solid #2563eb; padding: 12px 16px; }
    </style>
</head>
<body>
    <h1>QA Copilot Test Report</h1>
    <p class="meta">Generated ${escapeHtml(generatedAt)}</p>
    <h2>Requirement</h2>
    <div class="req">${escapeHtml(requirement || "Not provided")}</div>
    <h2>Manual Test Cases (${manual.length})</h2>
    ${manualHtml || "<p>None</p>"}
    <h2>API Test Cases (${apis.length})</h2>
    ${apiHtml || "<p>None</p>"}
    <h2>SQL Queries (${sqls.length})</h2>
    ${sqlHtml || "<p>None</p>"}
    <h2>Edge Cases (${edges.length})</h2>
    <ul>${edgeHtml || "<li>None</li>"}</ul>
    <h2>Playwright Script</h2>
    <pre>${escapeHtml(response?.playwrightScript || "")}</pre>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `QA-Copilot-Test-Report-${date}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

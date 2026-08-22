export const buildPrompt = (requirement: string): string => {

    return `
You are a Senior QA Automation Architect.

Analyze the requirement below and generate a complete, practical test suite.

Requirement:

${requirement}

Return ONLY valid JSON.

Format:

{
    "manualTestCases": [
        {
            "id": "TC-01",
            "title": "",
            "module": "",
            "type": "Positive",
            "priority": "High",
            "severity": "Major",
            "preconditions": "",
            "testData": "",
            "steps": [
                "Step 1",
                "Step 2"
            ],
            "expectedResult": ""
        }
    ],

    "apiTestCases": [
        {
            "title": "",
            "method": "GET",
            "endpoint": "/api/example",
            "headers": {
                "Content-Type": "application/json"
            },
            "queryParams": {},
            "requestBody": {},
            "expectedStatus": 200,
            "expectedResponse": "",
            "assertions": [
                ""
            ]
        }
    ],

    "sqlQueries": [
        {
            "purpose": "",
            "query": ""
        }
    ],

    "edgeCases": [
        ""
    ],

    "playwrightScript": ""
}

Rules:

- Generate at least 6 high-quality manual test cases covering happy path, negative, validation, and edge scenarios.
- type must be one of: Positive, Negative, Regression, Smoke, Boundary.
- priority must be one of: High, Medium, Low.
- severity must be one of: Critical, Major, Minor.
- steps must be an array of clear numbered-style action strings.
- preconditions and testData must be specific, not generic.
- Generate at least 4 API test cases when the requirement involves APIs, auth, CRUD, or backend behavior. If no API is implied, still propose realistic APIs for the feature.
- method must be GET, POST, PUT, PATCH, or DELETE.
- endpoint must be a realistic path.
- headers, queryParams, and requestBody must be JSON objects. Use {} when not applicable.
- expectedStatus must be a number.
- assertions must list concrete checks (status, body fields, error message, etc).
- sqlQueries should be valid SQL with a clear purpose.
- playwrightScript must be a complete Playwright TypeScript test file using @playwright/test.
- Do not invent unrelated product features.
- Do not return markdown.
- Do not return triple backticks.
- Do not return explanations outside the JSON.
- Response must be directly parsable using JSON.parse().

Return JSON only.
`;

};

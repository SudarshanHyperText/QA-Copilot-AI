export const buildPrompt = (requirement: string): string => {

    return `
You are a Senior QA Automation Architect.

Analyze the requirement below.

Requirement:

${requirement}

Return ONLY valid JSON.

Format:

{
    "manualTestCases": [
        {
            "id":"",
            "title":"",
            "steps":"",
            "expectedResult":"",
            "priority":""
        }
    ],

    "apiTestCases":[
        {
            "title":"",
            "method":"",
            "expectedStatus":""
        }
    ],

    "sqlQueries":[
        {
            "purpose":"",
            "query":""
        }
    ],

    "edgeCases":[
        ""
    ],

    "playwrightScript":""
}

Do not return markdown.

Do not return explanation.

Return JSON only.
IMPORTANT

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT use triple backticks.

Do NOT explain anything.

Response must be directly parsable by JSON.parse().
`;

};
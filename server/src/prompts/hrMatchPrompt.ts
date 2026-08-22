export const buildHrMatchPrompt = (resumeText: string, requirements: string): string => {

    return `
You are an expert HR recruiter and hiring specialist.

Compare the candidate resume against the job requirements / job description provided by HR.

Do NOT score the resume in isolation.
Score ONLY how well the resume matches the given requirements.

Resume:

${resumeText}

Job Requirements / Job Description:

${requirements}

Evaluate:
1. Required skills present in the resume
2. Relevant experience for this role
3. Education / certifications if mentioned in the JD
4. Domain or industry fit
5. Seniority / years of experience vs the JD
6. Tools, technologies, and keywords from the JD
7. Gaps that would matter in screening

Scoring:
- matchScore must be a number between 0 and 100.
- 80-100: Strong match, recommend interview
- 60-79: Partial match, maybe interview
- 40-59: Weak match, hold / review carefully
- 0-39: Poor match, likely reject

Return ONLY valid JSON.

Format:

{
    "matchScore": 0,
    "verdict": "",
    "recommendation": "",
    "summary": "",
    "matchedSkills": [
        ""
    ],
    "missingSkills": [
        ""
    ],
    "matchedRequirements": [
        ""
    ],
    "gaps": [
        ""
    ],
    "hrNotes": [
        ""
    ]
}

Rules:
- matchScore must be a number between 0 and 100.
- verdict must be one of: "Strong Match", "Partial Match", "Weak Match", "Poor Match".
- recommendation must be one of: "Interview", "Maybe Interview", "Hold", "Reject".
- matchedSkills must list skills/tools from the JD that appear in the resume.
- missingSkills must list important JD skills that are not evidenced in the resume.
- matchedRequirements must list specific JD requirements the candidate appears to meet.
- gaps must list specific JD requirements the candidate does not clearly meet.
- hrNotes must be short, practical screening notes for HR (not generic advice to the candidate).
- Do not invent experience, skills, certifications, or education.
- If the resume is silent on a JD requirement, treat it as a gap, not as proven.
- Do not return markdown.
- Do not return triple backticks.
- Do not return explanations outside the JSON.
- Response must be directly parsable using JSON.parse().

Return JSON only.
`;
};

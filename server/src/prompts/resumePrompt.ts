export const buildResumePrompt = (resumeText: string): string => {

    return `
You are an expert Resume Reviewer and Technical Hiring Specialist.

Analyze the resume provided below.

Your goal is to evaluate the resume for a software engineering / QA / SDET job market.

Resume:

${resumeText}

Evaluate the resume using these criteria:

1. Experience and career progression
2. Technical skills
3. Automation and testing expertise
4. Projects and practical experience
5. Resume clarity and structure
6. Achievement and impact
7. ATS keyword optimization

Scoring:

- Experience and career progression: 20 points
- Technical skills: 20 points
- Automation/testing expertise: 20 points
- Projects and practical experience: 10 points
- Resume clarity and structure: 10 points
- Achievements and measurable impact: 10 points
- ATS optimization: 10 points

Total score must be between 0 and 100.

Return ONLY valid JSON.

Format:

{
    "overallScore": 0,
    "summary": "",
    "strengths": [
        ""
    ],
    "weaknesses": [
        ""
    ],
    "suggestions": [
        ""
    ],
    "missingSkills": [
        ""
    ],
    "atsKeywords": [
        ""
    ]
}

Rules:

- overallScore must be a number between 0 and 100.
- strengths must contain specific strengths found in the resume.
- weaknesses must identify actual areas that can be improved.
- suggestions must be practical and actionable.
- missingSkills should contain relevant skills that would strengthen the candidate's profile.
- atsKeywords should contain relevant keywords that can improve ATS matching.
- Do not invent experience, skills, certifications, or achievements that are not present in the resume.
- Do not give generic suggestions when a specific improvement can be identified.
- Do not return markdown.
- Do not return triple backticks.
- Do not return explanations outside the JSON.
- Response must be directly parsable using JSON.parse().

Return JSON only.
`;
};
export interface ResumeAnalysis {

    overallScore: number;

    summary: string;

    strengths: string[];

    weaknesses: string[];

    suggestions: string[];

    missingSkills: string[];

    atsKeywords: string[];

}

export interface HrResumeMatch {

    matchScore: number;

    verdict: string;

    recommendation: string;

    summary: string;

    matchedSkills: string[];

    missingSkills: string[];

    matchedRequirements: string[];

    gaps: string[];

    hrNotes: string[];

}
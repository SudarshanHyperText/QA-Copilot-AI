import "./Header.css";

const PAGE_COPY = {
    testcase: {
        kicker: "QA workspace",
        title: "Test Case Generator",
        description: "Turn a requirement into manual cases, API tests, SQL checks, edge cases, and a Playwright script."
    },
    resume: {
        kicker: "Resume workspace",
        title: "Resume",
        description: "Score a candidate profile, or match a resume against a job description."
    },
    analyzer: {
        kicker: "Resume workspace",
        title: "Resume Analyzer",
        description: "Upload a PDF resume to score profile strength, gaps, and ATS keywords."
    },
    hr: {
        kicker: "Resume workspace",
        title: "HR Resume Match",
        description: "Compare a candidate resume against a job description and see the match percentage."
    }
};

export default function Header({ activePage = "testcase", resumeTab = "analyzer", onOpenHub }) {
    const copy = activePage === "resume"
        ? PAGE_COPY[resumeTab] || PAGE_COPY.resume
        : PAGE_COPY[activePage] || PAGE_COPY.testcase;

    return (
        <header className="header" key={`${activePage}-${resumeTab}`}>
            <div className="header-copy">
                <div className="header-kicker">{copy.kicker}</div>
                <h1>{copy.title}</h1>
                <p>{copy.description}</p>
            </div>
            {onOpenHub && (
                <button className="hub-back" type="button" onClick={onOpenHub}>
                    ← Back
                </button>
            )}
        </header>
    );
}

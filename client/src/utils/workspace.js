const STORAGE_KEY = "qa-copilot-workspace-v2";

export const defaultWorkspace = {
    activePage: "testcase",
    resumeTab: "analyzer",
    inHub: true,
    testcase: {
        requirement: "",
        response: null,
        jobId: "",
        status: "",
        error: ""
    },
    resume: {
        fileName: "",
        response: null,
        jobId: "",
        status: "",
        error: ""
    },
    hr: {
        fileName: "",
        requirements: "",
        response: null,
        jobId: "",
        status: "",
        error: ""
    }
};

export function isJobLoading(job) {
    return Boolean(job?.jobId) && (job.status === "running" || job.status === "queued");
}

function sanitizeAgent(agent = {}) {
    const next = { ...agent, file: undefined };
    if ((next.status === "queued" || next.status === "running") && !next.jobId) {
        next.status = "";
        next.error = "";
    }
    return next;
}

export function loadWorkspace() {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (!parsed) {
            return {
                ...defaultWorkspace,
                testcase: { ...defaultWorkspace.testcase },
                resume: { ...defaultWorkspace.resume },
                hr: { ...defaultWorkspace.hr }
            };
        }
        const activePage = parsed.activePage === "hr" ? "resume" : (parsed.activePage || "testcase");
        const resumeTab = parsed.activePage === "hr"
            ? "hr"
            : (parsed.resumeTab === "hr" ? "hr" : "analyzer");
        return {
            ...defaultWorkspace,
            ...parsed,
            activePage,
            resumeTab,
            testcase: sanitizeAgent({ ...defaultWorkspace.testcase, ...parsed.testcase }),
            resume: sanitizeAgent({ ...defaultWorkspace.resume, ...parsed.resume }),
            hr: sanitizeAgent({ ...defaultWorkspace.hr, ...parsed.hr })
        };
    } catch {
        return {
            ...defaultWorkspace,
            testcase: { ...defaultWorkspace.testcase },
            resume: { ...defaultWorkspace.resume },
            hr: { ...defaultWorkspace.hr }
        };
    }
}

export function saveWorkspace(workspace) {
    const safe = {
        ...workspace,
        resume: { ...workspace.resume, file: undefined },
        hr: { ...workspace.hr, file: undefined }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
}

export function apiBase() {
    return process.env.REACT_APP_API_RESUME_URL || "http://localhost:5000";
}

export async function fetchJob(jobId) {
    const res = await fetch(`${apiBase()}/api/jobs/${jobId}`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data?.message || "Could not load job.");
    }
    return data.data;
}

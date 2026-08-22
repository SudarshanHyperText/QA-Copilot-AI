import { useState } from "react";
import "./Home.css";
import Header from "../components/Header/Header";
import RequirementForm from "../components/RequirementForm/RequirementForm";
import ResultSection from "../components/ResultSection/ResultSection";
import ResumeAnalyzer from "../components/ResumeAnalyzer/ResumeAnalyzer";
import HrResumeMatch from "../components/HrResumeMatch/HrResumeMatch";
import AgentHub from "../components/AgentHub/AgentHub";
import { isJobLoading, loadWorkspace, saveWorkspace } from "../utils/workspace";

export default function Home() {

    const [workspace, setWorkspace] = useState(() => loadWorkspace());

    const updateWorkspace = (updater) => {
        setWorkspace((prev) => {
            const next = typeof updater === "function" ? updater(prev) : updater;
            saveWorkspace(next);
            return next;
        });
    };

    const openHub = () => {
        updateWorkspace((prev) => ({ ...prev, inHub: true }));
    };

    const openAgent = (activePage) => {
        updateWorkspace((prev) => ({
            ...prev,
            activePage,
            inHub: false,
            resumeTab: activePage === "resume" ? prev.resumeTab || "analyzer" : prev.resumeTab
        }));
    };

    const setResumeTab = (resumeTab) => {
        updateWorkspace((prev) => ({ ...prev, activePage: "resume", resumeTab }));
    };

    const setTestcase = (patch) => {
        updateWorkspace((prev) => ({
            ...prev,
            testcase: { ...prev.testcase, ...patch }
        }));
    };

    const setResume = (patch) => {
        updateWorkspace((prev) => ({
            ...prev,
            resume: { ...prev.resume, ...patch }
        }));
    };

    const setHr = (patch) => {
        updateWorkspace((prev) => ({
            ...prev,
            hr: { ...prev.hr, ...patch }
        }));
    };

    const { activePage, resumeTab = "analyzer", inHub = true, testcase, resume, hr } = workspace;

    if (inHub) {
        return <AgentHub onSelect={openAgent} />;
    }

    return (
        <div className="app-layout">
            <main className="main-content">
                <div className="content-wrap">
                    <Header
                        activePage={activePage}
                        resumeTab={resumeTab}
                        onOpenHub={openHub}
                    />

                    {activePage !== "resume" && (
                    <div className="agent-panel">
                        <RequirementForm
                            requirement={testcase.requirement}
                            setRequirement={(requirement) => setTestcase({ requirement })}
                            job={testcase}
                            setJob={setTestcase}
                        />
                        {testcase.response && (
                            <ResultSection
                                response={testcase.response}
                                requirement={testcase.requirement}
                                jobId={testcase.jobId}
                            />
                        )}
                    </div>
                    )}

                    {activePage === "resume" && (
                    <div className="agent-panel">
                        <div className="section-tabs">
                            <button
                                className={resumeTab === "analyzer" ? "section-tab active" : "section-tab"}
                                onClick={() => setResumeTab("analyzer")}
                            >
                                Resume
                                {isJobLoading(resume) && <span className="tab-dot"></span>}
                            </button>
                            <button
                                className={resumeTab === "hr" ? "section-tab active" : "section-tab"}
                                onClick={() => setResumeTab("hr")}
                            >
                                HR Resume Match
                                {isJobLoading(hr) && <span className="tab-dot"></span>}
                            </button>
                        </div>

                        <div className={resumeTab === "analyzer" ? "" : "hidden"}>
                            <ResumeAnalyzer
                                job={resume}
                                setJob={setResume}
                            />
                        </div>
                        <div className={resumeTab === "hr" ? "" : "hidden"}>
                            <HrResumeMatch
                                job={hr}
                                setJob={setHr}
                            />
                        </div>
                    </div>
                    )}
                </div>
            </main>
        </div>
    );
}

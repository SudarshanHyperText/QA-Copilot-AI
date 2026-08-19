import { useState } from "react";

import "./Home.css";

import Header from "../components/Header/Header";
import RequirementForm from "../components/RequirementForm/RequirementForm";
import ResultSection from "../components/ResultSection/ResultSection";
import ResumeAnalyzer from "../components/ResumeAnalyzer/ResumeAnalyzer";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {

    const [response, setResponse] = useState(null);

    const [activePage, setActivePage] = useState("testcase");

    return (

        <div className="app-layout">

            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <main className="main-content">

                <Header />

                {/* Mobile Navigation */}

                <div className="mobile-navigation">

                    <button
                        className={activePage === "testcase" ? "mobile-nav-item active" : "mobile-nav-item"}
                        onClick={() => setActivePage("testcase")}
                    >
                        🧪
                        <span>Test Cases</span>
                    </button>

                    <button
                        className={activePage === "resume" ? "mobile-nav-item active" : "mobile-nav-item"}
                        onClick={() => setActivePage("resume")}
                    >
                        📄
                        <span>Resume</span>
                    </button>

                </div>


                {activePage === "testcase" && (

                    <>
                        <RequirementForm
                            setResponse={setResponse}
                        />

                        {
                            response &&
                            <ResultSection
                                response={response}
                            />
                        }
                    </>

                )}


                {activePage === "resume" && (

                    <ResumeAnalyzer />

                )}

            </main>

        </div>
    );
}
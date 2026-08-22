import { downloadTestReport } from "../../utils/downloadReport";
import "./ResultSection.css";
import ManualTestCard from "../ManualTestCard/ManualTestCard";
import ApiTestCard from "../ApiTestCard/ApiTestCard";
import SqlQueryCard from "../SqlQueryCard/SqlQueryCard";
import EdgeCaseCard from "../EdgeCaseCard/EdgeCaseCard";
import PlaywrightCard from "../PlaywrightScriptCard/PlaywrightCard";

export default function ResultSection({ response, requirement, jobId }) {

    const manualCount = response?.manualTestCases?.length || 0;
    const apiCount = response?.apiTestCases?.length || 0;
    const sqlCount = response?.sqlQueries?.length || 0;
    const edgeCount = response?.edgeCases?.length || 0;

    return (

        <div className="result-container">

            <div className="result-toolbar">

                <div className="result-toolbar-copy">
                    <h2>Generated Test Suite</h2>
                    <p>
                        {manualCount} manual · {apiCount} API · {sqlCount} SQL · {edgeCount} edge cases
                        {jobId ? ` · ${jobId}` : ""}
                    </p>
                </div>

                <button
                    className="download-btn"
                    onClick={() => downloadTestReport(response, requirement)}
                >
                    Download Report
                </button>

            </div>


            <div className="result-card">

                <h2>Manual Test Cases</h2>

                {response.manualTestCases?.map((tc) => (
                    <ManualTestCard
                        key={tc.id}
                        tc={tc}
                    />
                ))}

            </div>


            <div className="result-card">

                <h2>API Test Cases</h2>

                {response.apiTestCases?.map((api, index) => (
                    <ApiTestCard key={index} api={api} />
                ))}

            </div>


            <div className="result-card">

                <h2>SQL Queries</h2>

                {response.sqlQueries?.map((sql, index) => (
                    <SqlQueryCard key={index} sql={sql} />
                ))}

            </div>


            <div className="result-card">

                <h2>Edge Cases</h2>

                {response.edgeCases?.map((edge, index) => (
                    <EdgeCaseCard key={index} edge={edge} />
                ))}

            </div>


            <div className="result-card">

                <h2>Playwright Script</h2>

                <PlaywrightCard
                    code={response.playwrightScript}
                />

            </div>

        </div>

    );

}

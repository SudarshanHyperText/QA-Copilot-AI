import { useState } from "react";
import "./ResumeAnalyzer.css";

function ResumeAnalyzer() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {

        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }

        if (selectedFile.type !== "application/pdf") {
            setError("Please upload a PDF resume.");
            setFile(null);
            return;
        }

        setFile(selectedFile);
        setError("");
        setResponse(null);
    };

    const handleAnalyze = async () => {

        if (!file) {
            setError("Please select your resume first.");
            return;
        }

        setLoading(true);
        setError("");
        setResponse(null);

        try {

            const formData = new FormData();

            formData.append("resume", file);

            const res = await fetch(
                `${process.env.REACT_APP_API_RESUME_URL}/api/resume/analyze`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Resume analysis failed.");
            }

            setResponse(data.data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="resume-analyzer">

            <div className="resume-header">

                <h2>Resume Analyzer</h2>

                <p>
                    Upload your resume and discover how strong your profile is.
                </p>

            </div>

            <div className="upload-box">

                <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                />

                <label htmlFor="resume-upload" className="upload-label">
                    📄 Choose your Resume
                </label>

                {file && (
                    <p className="selected-file">
                        📎 {file.name}
                    </p>
                )}

            </div>

            {error && (
                <p className="resume-error">
                    {error}
                </p>
            )}

            <button
                className="analyze-button"
                onClick={handleAnalyze}
                disabled={loading}
            >
                {loading ? "Analyzing Resume... please wait 30 seconds" : "Analyze Resume"}
            </button>
            <div className="note-box">
                The first request may take up to 60 seconds after inactivity. Once the service is active, responses are much faster.
            </div>

            {response && (

                <div className="resume-result">

                    <div className="score-card">

                        <div className="score-circle">
                            <span>{response.overallScore}</span>
                            <small>/100</small>
                        </div>

                        <div className="score-info">

                            <h3>Resume Score</h3>

                            <p>
                                {response.summary}
                            </p>

                        </div>

                    </div>


                    <div className="analysis-grid">

                        <div className="analysis-card">

                            <h3>💪 Strengths</h3>

                            <ul>
                                {response.strengths?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                        </div>


                        <div className="analysis-card">

                            <h3>⚠️ Areas to Improve</h3>

                            <ul>
                                {response.weaknesses?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                        </div>


                        <div className="analysis-card">

                            <h3>💡 Suggestions</h3>

                            <ul>
                                {response.suggestions?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                        </div>


                        <div className="analysis-card">

                            <h3>🧩 Missing Skills</h3>

                            <ul>
                                {response.missingSkills?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                        </div>

                    </div>


                    <div className="keywords-card">

                        <h3>🔑 ATS Keywords</h3>

                        <div className="keywords">

                            {response.atsKeywords?.map((keyword, index) => (
                                <span key={index}>
                                    {keyword}
                                </span>
                            ))}

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}

export default ResumeAnalyzer;
import "./Sidebar.css";

export default function Sidebar({ activePage, setActivePage, onOpenHub, running = {} }) {

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-icon">🤖</div>
                <div>
                    <h2>QA Copilot</h2>
                    <span>AI Testing Platform</span>
                </div>
            </div>

            <div className="sidebar-divider"></div>
            <div className="sidebar-label">Modules</div>

            <nav className="sidebar-menu">
                <button className="sidebar-item" onClick={onOpenHub}>
                    <span className="sidebar-icon">✦</span>
                    <span className="sidebar-text">Agent Hub</span>
                </button>
                <button
                    className={`sidebar-item ${activePage === "testcase" ? "active" : ""}`}
                    onClick={() => setActivePage("testcase")}
                >
                    <span className="sidebar-icon">🧪</span>
                    <span className="sidebar-text">Test Case Generator</span>
                    {running.testcase && <span className="run-dot" title="Job running"></span>}
                </button>

                <button
                    className={`sidebar-item ${activePage === "resume" ? "active" : ""}`}
                    onClick={() => setActivePage("resume")}
                >
                    <span className="sidebar-icon">📄</span>
                    <span className="sidebar-text">Resume</span>
                    {running.resume && <span className="run-dot" title="Job running"></span>}
                </button>
            </nav>

            <div className="sidebar-bottom">
                <div className="sidebar-divider"></div>
                <div className="sidebar-footer">
                    <span>Built with ❤️</span>
                    <small>by Sudarshan Shinde</small>
                </div>
            </div>
        </aside>
    );
}

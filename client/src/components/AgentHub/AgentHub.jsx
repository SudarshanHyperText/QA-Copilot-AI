import { useState } from "react";
import "./AgentHub.css";

const AGENTS = [
    {
        id: "testcase",
        title: "Test Case Generator",
        subtitle: "Manual, API, SQL, Playwright",
        icon: "🧪",
        tone: "indigo"
    },
    {
        id: "resume",
        title: "Resume",
        subtitle: "Analyzer + HR match",
        icon: "📄",
        tone: "teal"
    }
];

export default function AgentHub({ onSelect }) {
    const [selected, setSelected] = useState("");
    const [phase, setPhase] = useState("idle");

    const handleSelect = (id) => {
        if (phase !== "idle") {
            return;
        }
        setSelected(id);
        setPhase("launch");
        window.setTimeout(() => setPhase("blast"), 420);
        window.setTimeout(() => onSelect(id), 1100);
    };

    return (
        <div className={`agent-hub phase-${phase}`}>
            <div className="hub-sky"></div>
            <div className="hub-glow"></div>

            <div className="hub-inner">
            <div className="hub-copy">
                <p>SudarshanBuilds</p>
                <h1>Choose an AI agent</h1>
                <span>Tap a crate to open that workspace.</span>
            </div>

            <div className="hub-stage">
                <div className="glass-panel"></div>

                <div className="crate-row">
                    {AGENTS.map((agent) => (
                        <button
                            key={agent.id}
                            className={[
                                "crate",
                                `crate-${agent.tone}`,
                                selected === agent.id ? `is-${phase}` : "",
                                selected && selected !== agent.id ? "is-dim" : ""
                            ].join(" ")}
                            onClick={() => handleSelect(agent.id)}
                            disabled={phase !== "idle"}
                        >
                            <div className="cube">
                                <div className="face front"><span>{agent.icon}</span></div>
                                <div className="face back"></div>
                                <div className="face right"></div>
                                <div className="face left"></div>
                                <div className="face top"></div>
                                <div className="face bottom"></div>
                            </div>
                            <strong>{agent.title}</strong>
                            <small>{agent.subtitle}</small>
                        </button>
                    ))}
                </div>

                {phase !== "idle" && (
                    <div className="blast-layer">
                        <div className="shockwave"></div>
                        {Array.from({ length: 18 }).map((_, index) => (
                            <span className={`spark spark-${index}`} key={index}></span>
                        ))}
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}

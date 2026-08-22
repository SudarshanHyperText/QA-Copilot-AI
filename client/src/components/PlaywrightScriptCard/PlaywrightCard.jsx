import { useState } from "react";
import "./PlaywrightCard.css";

export default function PlaywrightCard({ code }) {

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code || "");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (

        <div className="playwright-card">

            <div className="code-header">

                <h3>Playwright</h3>

                <button type="button" onClick={handleCopy}>
                    {copied ? "Copied" : "Copy script"}
                </button>

            </div>

            <pre>
                {code}
            </pre>

        </div>

    );

}

import "./PlaywrightCard.css";

export default function PlaywrightCard({ code }){

    return(

        <div className="playwright-card">

            <div className="code-header">

                <h2>

                    🎭 Playwright Script

                </h2>

            </div>

            <pre>

                {code}

            </pre>

        </div>

    )

}
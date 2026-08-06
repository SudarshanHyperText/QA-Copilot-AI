import "./ApiTestCard.css";

export default function ApiTestCard({ api }) {

    return (

        <div className="api-card">

            <div className="api-header">

                <h3>{api.title}</h3>

                <span>{api.method}</span>

            </div>

            <div className="status">

                {api.expectedStatus}

            </div>

        </div>

    );

}
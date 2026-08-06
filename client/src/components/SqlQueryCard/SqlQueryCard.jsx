import "./SqlQueryCard.css";

export default function SqlQueryCard({ sql }){

    return(

        <div className="sql-card">

            <h3>

                {sql.purpose}

            </h3>

            <pre>

                {sql.query}

            </pre>

        </div>

    )

}
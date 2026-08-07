import { useState } from "react";
import "./RequirementForm.css";
import { generateTestCases } from "../../services/api";

export default function RequirementForm({ setResponse }) {

    const [requirement, setRequirement] = useState("");

    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {

        if(requirement.trim()===""){

            alert("Please enter requirement.");

            return;

        }

        try{

            setLoading(true);

            const response = await generateTestCases(requirement);

            setResponse(response.data.data);

        }

        catch(error){

            alert("Something went wrong.");

            console.log(error);

        }

        finally{

            setLoading(false);

        }

    }

    return (

        <div className="form-container">

            <textarea

                placeholder="Describe your requirement..."

                value={requirement}

                onChange={(e)=>setRequirement(e.target.value)}

            />

            <button

                onClick={handleGenerate}

                disabled={loading}

            >

                {

                    loading

                    ?

                    "Generating... please wait 30 seconds"

                    :

                    "⚡ Generate Test Cases"

                }

            </button>
            <div className="note-box">
                The first request may take up to 60 seconds after inactivity. Once the service is active, responses are much faster.
            </div>

        </div>

    );

}
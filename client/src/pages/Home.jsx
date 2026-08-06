import { useState } from "react";

import "./Home.css";

import Header from "../components/Header/Header";

import RequirementForm from "../components/RequirementForm/RequirementForm";

import ResultSection from "../components/ResultSection/ResultSection";

export default function Home(){

    const [response,setResponse]=useState(null);

    return(

        <div className="home">

            <Header/>

            <RequirementForm

                setResponse={setResponse}

            />

            {

                response &&

                <ResultSection

                    response={response}

                />

            }

        </div>

    )

}
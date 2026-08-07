import axios from "axios";

const api = axios.create({

    baseURL: "https://qa-copilot-ai.onrender.com/api"

});

export const generateTestCases = (requirement) => {

    return api.post("/generate", {

        requirement

    });

};
import axios from "axios";

const api = axios.create({

    baseURL: `${process.env.REACT_APP_API_RESUME_URL}/api`

});

export const generateTestCases = (requirement) => {

    return api.post("/generate", {

        requirement

    });

};
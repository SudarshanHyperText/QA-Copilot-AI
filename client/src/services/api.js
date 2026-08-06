import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:5000/api"

});

export const generateTestCases = (requirement) => {

    return api.post("/generate", {

        requirement

    });

};